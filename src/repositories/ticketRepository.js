const db = require('../config/db');

class TicketRepository {
  // Lấy số liệu thống kê cho màn hình Tổng quan
  async getDashboardStats() {
    const query = `
      SELECT 
        COUNT(*) AS total_tickets,
        COUNT(CASE WHEN status = 'NEW' THEN 1 END) AS new_tickets,
        COUNT(CASE WHEN status = 'IN_PROGRESS' THEN 1 END) AS in_progress_tickets,
        COUNT(CASE WHEN priority = 'HIGH' THEN 1 END) AS high_priority_tickets
      FROM tickets;
    `;
    const [rows] = await db.query(query);
    return rows[0];
  }

  // Lấy danh sách phiếu cập nhật gần đây cho màn hình Tổng quan
  async getRecentTickets(limit = 5) {
    const query = `
      SELECT id, ticket_code, customer_name, device_info, issue_type, priority, status, sla_deadline, updated_at
      FROM tickets
      ORDER BY updated_at DESC
      LIMIT ?;
    `;
    const [rows] = await db.query(query, [limit]);
    return rows;
  }

  // Lấy danh sách toàn bộ phiếu bảo hành (có phân trang & lọc)
  async getAllTickets({ status, priority, limit = 10, offset = 0 }) {
    let query = `SELECT * FROM tickets WHERE 1=1`;
    const params = [];

    if (status) {
      query += ` AND status = ?`;
      params.push(status);
    }
    if (priority) {
      query += ` AND priority = ?`;
      params.push(priority);
    }

    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    const [rows] = await db.query(query, params);
    return rows;
  }

  // Tiếp nhận yêu cầu / Tạo phiếu mới
  async createTicket(ticketData) {
    const { ticket_code, customer_name, device_info, issue_type, priority, status, sla_deadline } = ticketData;
    const query = `
      INSERT INTO tickets (ticket_code, customer_name, device_info, issue_type, priority, status, sla_deadline, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
    `;
    const [result] = await db.query(query, [
      ticket_code,
      customer_name,
      device_info,
      issue_type,
      priority || 'NORMAL',
      status || 'NEW',
      sla_deadline
    ]);
    return result.insertId;
  }
}

module.exports = new TicketRepository();