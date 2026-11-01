const ticketRepository = require('../repositories/ticketRepository');

class TicketService {
  // Logic lấy dữ liệu Tổng quan
  async getDashboardData() {
    const stats = await ticketRepository.getDashboardStats();
    const recentTickets = await ticketRepository.getRecentTickets(50);
    return { stats, recentTickets };
  }

  // Logic lấy danh sách phiếu bảo hành
  async getTickets(filters = {}) {
    return await ticketRepository.getAllTickets(filters);
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

  // Logic kiểm tra hợp lệ, thực thi nghiệp vụ và khởi tạo ticket
  async createTicket(data) {
    if (!data || typeof data !== 'object') {
      const err = new Error('Dữ liệu đầu vào không hợp lệ');
      err.statusCode = 400;
      throw err;
    }

    const customerName = (data.customer_name || data.customerName || '').trim();
    const phone = (data.phone || '').trim();
    const deviceInfo = (data.device_info || data.deviceName || data.serialNumber || '').trim();
    const issueType = (data.issue_type || data.category || 'Lỗi phần cứng').trim();
    const issueDesc = (data.issue_description || data.description || data.issueDescription || '').trim();

    if (!customerName || !phone || !deviceInfo) {
      const missing = [];
      if (!customerName) missing.push('customer_name');
      if (!phone) missing.push('phone');
      if (!deviceInfo) missing.push('device_info');
      const err = new Error(`Vui lòng điền đầy đủ các thông tin bắt buộc. Thiếu: ${missing.join(', ')}`);
      err.statusCode = 400;
      throw err;
    }

    // Kiểm tra định dạng số điện thoại 10 chữ số
    if (!/^\d{10}$/.test(phone)) {
      const err = new Error('Số điện thoại không hợp lệ (phải gồm đúng 10 chữ số)');
      err.statusCode = 400;
      throw err;
    }

    // Kiểm tra Giá trị biên: Mô tả lỗi tối thiểu 10 ký tự
    if (issueDesc.length < 10) {
      const err = new Error('Mô tả chi tiết sự cố phải có tối thiểu 10 ký tự');
      err.statusCode = 400;
      throw err;
    }

    // QUY TẮC NGHIỆP VỤ 2: Chặn trùng thiết bị đang trong tiến trình xử lý
    const existingTickets = await ticketRepository.getAllTickets({});
    if (Array.isArray(existingTickets)) {
      const activeDuplicate = existingTickets.find((t) => {
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
      sla_deadline: slaDeadlineDisplay
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