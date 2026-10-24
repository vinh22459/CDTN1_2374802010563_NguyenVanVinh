const ticketRepository = require('../repositories/ticketRepository');

class TicketService {
  // Logic lấy dữ liệu Tổng quan
  async getDashboardData() {
    const stats = await ticketRepository.getDashboardStats();
    const recentTickets = await ticketRepository.getRecentTickets(5);
    return { stats, recentTickets };
  }

  // Logic lấy danh sách phiếu bảo hành
  async getTickets(filters) {
    return await ticketRepository.getAllTickets(filters);
  }

  // Logic tạo mã phiếu tự động và khởi tạo ticket
  async createTicket(data) {
    const timestamp = Date.now().toString().slice(-6);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const generatedCode = `TKT-${dateStr}-${timestamp}`;

    const newTicket = {
      ...data,
      ticket_code: generatedCode
    };

    const ticketId = await ticketRepository.createTicket(newTicket);
    return { id: ticketId, ticket_code: generatedCode, ...newTicket };
  }
}

module.exports = new TicketService();