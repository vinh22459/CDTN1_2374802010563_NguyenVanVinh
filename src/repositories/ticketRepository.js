const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../config/tickets_data.json');

const SEED_TICKETS = [
  {
    id: 1,
    ticket_code: 'TKT-20261024-PL01',
    customer_name: 'Võ Hoàng Phi Lân',
    phone: '0903999888',
    device_info: 'iPhone 15 Pro Max 256GB - Natural Titanium',
    issue_type: 'Lỗi phần cứng',
    description: 'Máy bị vỡ mặt kính lưng sau, cụm camera sau bị mờ khi zoom',
    priority: 'Cao',
    status: 'Đang xử lý',
    sla_deadline: '18:00 25/10/2026',
    created_at: '2026-10-24 08:15'
  },
  {
    id: 2,
    ticket_code: 'TKT-20261024-LT02',
    customer_name: 'Lê Văn Thuận',
    phone: '0909123456',
    device_info: 'MacBook Pro M2 14 inch 2023 - Gray',
    issue_type: 'Lỗi phần cứng',
    description: 'Bàn phím bị kẹt phím Space, màn hình chớp tắt chập chờn',
    priority: 'Cao',
    status: 'Mới tiếp nhận',
    sla_deadline: '17:30 25/10/2026',
    created_at: '2026-10-24 09:30'
  },
  {
    id: 3,
    ticket_code: 'TKT-20261024-HT03',
    customer_name: 'Huỳnh Minh Trí',
    phone: '0987654321',
    device_info: 'Samsung Galaxy Z Fold 5 512GB',
    issue_type: 'Lỗi phần cứng',
    description: 'Màn hình gập bên trong xuất hiện sọc đen dọc nếp gấp',
    priority: 'Cao',
    status: 'Mới tiếp nhận',
    sla_deadline: '12:00 26/10/2026',
    created_at: '2026-10-24 10:45'
  },
  {
    id: 4,
    ticket_code: 'TKT-20261024-NH04',
    customer_name: 'Nguyễn Thái Hoành',
    phone: '0918273645',
    device_info: 'iPad Pro 11 inch M1 - WiFi 128GB',
    issue_type: 'Lỗi phần mềm',
    description: 'Treo Táo khi cập nhật hệ điều hành iPadOS',
    priority: 'Thường',
    status: 'Đang xử lý',
    sla_deadline: '15:00 26/10/2026',
    created_at: '2026-10-24 11:20'
  },
  {
    id: 5,
    ticket_code: 'TKT-20261023-PL05',
    customer_name: 'Võ Hoàng Phi Lân',
    phone: '0903999888',
    device_info: 'Apple Watch Series 9 45mm GPS',
    issue_type: 'Bảo hành định kỳ',
    description: 'Thay pin mới chính hãng và kiểm tra khả năng kháng nước',
    priority: 'Thường',
    status: 'Hoàn thành',
    sla_deadline: '16:00 24/10/2026',
    created_at: '2026-10-23 14:00'
  }
];

class TicketRepository {
  _readData() {
    try {
      if (!fs.existsSync(DATA_FILE)) {
        fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
        fs.writeFileSync(DATA_FILE, JSON.stringify(SEED_TICKETS, null, 2), 'utf8');
        return [...SEED_TICKETS];
      }
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(raw);
    } catch (err) {
      return [...SEED_TICKETS];
    }
  }

  _writeData(tickets) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(tickets, null, 2), 'utf8');
  }

  async getDashboardStats() {
    const tickets = this._readData();
    return {
      total: tickets.length,
      new: tickets.filter(t => t.status === 'Mới tiếp nhận').length,
      in_progress: tickets.filter(t => t.status === 'Đang xử lý').length,
      high_priority: tickets.filter(t => t.priority === 'Cao').length
    };
  }

  async getRecentTickets(limit = 50) {
    const tickets = this._readData();
    return tickets.slice(0, limit);
  }

  async getAllTickets(filters = {}) {
    let tickets = this._readData();
    if (filters.status) {
      tickets = tickets.filter(t => t.status === filters.status);
    }
    if (filters.priority) {
      tickets = tickets.filter(t => t.priority === filters.priority);
    }
    return tickets;
  }

  async createTicket(ticketData) {
    const tickets = this._readData();
    const newId = tickets.length > 0 ? Math.max(...tickets.map(t => Number(t.id) || 0)) + 1 : 1;
    const record = {
      id: newId,
      ...ticketData,
      created_at: ticketData.created_at || new Date().toLocaleString('vi-VN')
    };
    tickets.unshift(record);
    this._writeData(tickets);
    return newId;
  }

  async updateStatus(id, status) {
    const tickets = this._readData();
    const idx = tickets.findIndex(t => Number(t.id) === Number(id));
    if (idx === -1) return null;
    tickets[idx].status = status;
    this._writeData(tickets);
    return tickets[idx];
  }
}

module.exports = new TicketRepository();