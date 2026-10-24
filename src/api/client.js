// src/api/client.js
const BASE_URL = 'http://localhost:3000/api';

export const apiClient = {
  async getDashboard() {
    const res = await fetch(`${BASE_URL}/dashboard`);
    if (!res.ok) throw new Error('Không thể tải dữ liệu Tổng quan');
    return res.json();
  },
  
  async getTickets(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/tickets?${query}`);
    if (!res.ok) throw new Error('Không thể tải danh sách phiếu bảo hành');
    return res.json();
  },

  async getTicketById(id) {
    const res = await fetch(`${BASE_URL}/tickets/${id}`);
    if (!res.ok) throw new Error('Không thể tải chi tiết phiếu bảo hành');
    return res.json();
  },

  async createTicket(data) {
    const res = await fetch(`${BASE_URL}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Không thể tạo phiếu bảo hành mới');
    return res.json();
  }
};