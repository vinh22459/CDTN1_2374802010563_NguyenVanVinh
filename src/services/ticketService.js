const fs = require('fs');
const path = require('path');
const ticketRepository = require('../repositories/ticketRepository');

class TicketService {
  // Logic lấy dữ liệu Tổng quan (chỉ tính các phiếu chưa xóa mềm)
  async getDashboardData() {
    const allTickets = await ticketRepository.getAllTickets({});
    const activeTickets = Array.isArray(allTickets) ? allTickets.filter(t => !t.isDeleted) : [];
    
    const stats = {
      total: activeTickets.length,
      new: activeTickets.filter(t => t.status === 'Mới tiếp nhận').length,
      in_progress: activeTickets.filter(t => t.status === 'Đang xử lý').length,
      high_priority: activeTickets.filter(t => t.priority === 'Cao').length
    };
    const recentTickets = activeTickets.slice(0, 50);
    return { stats, recentTickets };
  }

  // Logic lấy danh sách phiếu bảo hành (lọc bỏ phiếu đã xóa mềm)
  async getTickets(filters = {}) {
    const tickets = await ticketRepository.getAllTickets(filters);
    return Array.isArray(tickets) ? tickets.filter(t => !t.isDeleted) : [];
  }

  // QUY TẮC NGHIỆP VỤ 1: Tự động tính hạn cam kết SLA theo mức độ ưu tiên
  // - Khẩn cấp / Cao: +24 giờ
  // - Thường / Thấp: +48 giờ
  calculateSLADueDate(priority = 'Thường', baseDate = new Date()) {
    const slaHours = (priority === 'Cao' || priority === 'Khẩn cấp') ? 24 : 48;
    const dueDate = new Date(baseDate.getTime() + slaHours * 60 * 60 * 1000);
    return dueDate.toISOString();
  }

  formatSLADisplay(isoDateStr) {
    const d = new Date(isoDateStr);
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${hh}:${mm} ${dd}/${mo}/${yyyy}`;
  }

  // Tính năng Xóa mềm phiếu bảo hành (Soft Delete)
  async deleteTicket(id) {
    const tickets = await ticketRepository.getAllTickets({});
    const ticket = tickets.find(t => t.id === Number(id) || t.id === id);
    
    if (!ticket || ticket.isDeleted) {
      const err = new Error('Không tìm thấy phiếu bảo hành để xóa');
      err.statusCode = 404;
      throw err;
    }

    // Đánh dấu xóa mềm
    ticket.isDeleted = true;
    ticket.status = 'Đã hủy';

    // Ghi đè lại vào file JSON để lưu trữ vĩnh viễn
    const filePath = path.join(__dirname, '../config/tickets_data.json');
    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(tickets, null, 2), 'utf-8');
    }

    return ticket;
  }

  // Logic kiểm tra hợp lệ, thực thi nghiệp vụ và khởi tạo ticket
  async createTicket(data) {
    if (!data || typeof data !== 'object') {
      const err = new Error('Dữ liệu đầu vào không hợp lệ');
      err.statusCode = 400;
      throw err;
    }

    // 1. Gom và chuẩn hóa toàn bộ trường dữ liệu ngay từ đầu (hỗ trợ cả Web và Unit Test)
    const customerName = String(data.customer_name || data.customerName || '').trim();
    const phone = String(data.phone || '').trim();
    const deviceInfo = String(data.device_info || data.deviceName || data.serialNumber || '').trim();
    const issueType = String(data.issue_type || data.category || 'Lỗi phần cứng').trim();
    const issueDesc = String(data.issue_description || data.description || data.issueDescription || '').trim();

    // 2. Kiểm tra XSS trên tất cả các trường văn bản (Fix BUG-03 / TC-08) - Bỏ cờ /g để tránh lỗi lastIndex
    const xssPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|<\/?[a-z][\s\S]*>/i;
    if (
      xssPattern.test(customerName) ||
      xssPattern.test(deviceInfo) ||
      xssPattern.test(issueDesc) ||
      xssPattern.test(issueType)
    ) {
      const err = new Error('Phát hiện định dạng dữ liệu không hợp lệ hoặc chứa mã độc XSS');
      err.statusCode = 400;
      throw err;
    }

    // 3. Kiểm tra danh mục mức độ ưu tiên (Fix BUG-02 / TC-07)
    const validPriorities = ['Thấp', 'Thường', 'Cao', 'Khẩn cấp'];
    if (data.priority !== undefined && data.priority !== '' && !validPriorities.includes(data.priority)) {
      const err = new Error('Mức độ ưu tiên (priority) không hợp lệ');
      err.statusCode = 400;
      throw err;
    }

    // 4. Kiểm tra các trường bắt buộc (TC-04)
    if (!customerName || !phone || !deviceInfo) {
      const missing = [];
      if (!customerName) missing.push('customer_name');
      if (!phone) missing.push('phone');
      if (!deviceInfo) missing.push('device_info');
      const err = new Error(`Vui lòng điền đầy đủ các thông tin bắt buộc. Thiếu: ${missing.join(', ')}`);
      err.statusCode = 400;
      throw err;
    }

    // 5. Kiểm tra định dạng số điện thoại 10 chữ số
    if (!/^\d{10}$/.test(phone)) {
      const err = new Error('Số điện thoại không hợp lệ (phải gồm đúng 10 chữ số)');
      err.statusCode = 400;
      throw err;
    }

    // 6. Kiểm tra Giá trị biên dưới (< 10 ký tự - TC-03) và biên trên (> 500 ký tự - Fix BUG-01 / TC-06)
    if (issueDesc.length < 10) {
      const err = new Error('Mô tả chi tiết sự cố phải có tối thiểu 10 ký tự');
      err.statusCode = 400;
      throw err;
    }

    if (issueDesc.length > 500) {
      const err = new Error('Mô tả sự cố không được vượt quá 500 ký tự');
      err.statusCode = 400;
      throw err;
    }

    // 7. QUY TẮC NGHIỆP VỤ 2: Chặn trùng thiết bị đang trong tiến trình xử lý (TC-05 & TC-09)
    const existingTickets = await ticketRepository.getAllTickets({});
    if (Array.isArray(existingTickets)) {
      const activeDuplicate = existingTickets.find((t) => {
        if (t.isDeleted) return false;
        const existingDevice = (t.device_info || t.deviceName || t.serial_number || '').trim().toLowerCase();
        const isProcessing = ['PENDING', 'PROCESSING', 'Mới tiếp nhận', 'Đang xử lý'].includes(t.status);
        return existingDevice === deviceInfo.toLowerCase() && isProcessing;
      });

      if (activeDuplicate) {
        const err = new Error('Thiết bị này đang trong tiến trình xử lý tại phiếu khác. Vui lòng kiểm tra lại');
        err.statusCode = 409;
        throw err;
      }
    }

    const timestamp = Date.now().toString().slice(-4);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const generatedCode = `TKT-${dateStr}-${timestamp}`;
    const priority = data.priority || 'Thường';
    const slaDueDate = data.sla_due_date || this.calculateSLADueDate(priority);
    const slaDeadlineDisplay = data.sla_deadline || this.formatSLADisplay(slaDueDate);

    const newTicket = {
      customer_name: customerName,
      phone,
      device_info: deviceInfo,
      issue_type: issueType,
      description: issueDesc,
      issue_description: issueDesc,
      ticket_code: generatedCode,
      priority,
      status: data.status || 'Mới tiếp nhận',
      sla_due_date: slaDueDate,
      sla_deadline: slaDeadlineDisplay,
      isDeleted: false
    };

    const ticketId = await ticketRepository.createTicket(newTicket);
    return { id: ticketId, ...newTicket };
  }

  async updateTicketStatus(id, status) {
    if (!status) {
      const err = new Error('Trạng thái cập nhật không hợp lệ');
      err.statusCode = 400;
      throw err;
    }
    const updated = await ticketRepository.updateStatus(id, status);
    if (!updated) {
      const err = new Error('Không tìm thấy phiếu bảo hành');
      err.statusCode = 404;
      throw err;
    }
    return updated;
  }
}

module.exports = new TicketService();