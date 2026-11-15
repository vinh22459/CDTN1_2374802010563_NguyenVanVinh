const express = require('express');
const router = express.Router();
const ticketService = require('../services/ticketService');

// 1. Tính năng: Tổng quan (Dashboard Overview)
router.get('/dashboard', async (req, res) => {
  try {
    const { stats, recentTickets } = await ticketService.getDashboardData();
    res.status(200).json({ success: true, stats, recentTickets, data: { stats, recentTickets } });
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
});

// 2. Tính năng: Phiếu bảo hành (Danh sách tất cả phiếu)
router.get('/', async (req, res) => {
  try {
    const { status, priority, limit, page } = req.query;
    const offset = page ? (page - 1) * (limit || 10) : 0;
    const tickets = await ticketService.getTickets({ status, priority, limit, offset });
    res.status(200).json({ success: true, data: tickets });
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, message: error.message });
  }
});
// Xóa phiếu bảo hành theo ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTicket = await ticketService.deleteTicket(req.params.id);
    res.status(200).json({ success: true, message: 'Đã xóa phiếu thành công', data: deletedTicket });
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message });
  }
});
// 3. Tính năng: Tiếp nhận yêu cầu (Tạo phiếu mới)
router.post('/', async (req, res) => {
  try {
    const createdTicket = await ticketService.createTicket(req.body);
    res.status(201).json({ success: true, data: createdTicket });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      success: false,
      message: error.message
    });
  }
});

// 4. Tính năng: Cập nhật trạng thái phiếu bảo hành
router.patch('/:id', async (req, res) => {
  try {
    const updated = await ticketService.updateTicketStatus(req.params.id, req.body.status);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      success: false,
      message: error.message
    });
  }
});
router.delete('/tickets/:id', async (req, res) => {
  try {
    const result = await ticketService.deleteTicket(req.params.id);
    res.json({ success: true, message: 'Đã xóa phiếu thành công', data: result });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});
module.exports = router;