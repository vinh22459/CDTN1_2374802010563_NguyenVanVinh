const express = require('express');
const router = express.Router();
const ticketService = require('../services/ticketService');

// 1. Tính năng: Tổng quan (Dashboard Overview)
router.get('/dashboard', async (req, res) => {
  try {
    const data = await ticketService.getDashboardData();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Tính năng: Tiếp nhận yêu cầu (Tạo phiếu mới)
router.post('/', async (req, res) => {
  try {
    const { customer_name, device_info, issue_type, priority, sla_deadline } = req.body;
    
    if (!customer_name || !device_info || !issue_type) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tên khách hàng, thông tin thiết bị và nhóm sự cố là bắt buộc.' 
      });
    }

    const createdTicket = await ticketService.createTicket({
      customer_name,
      device_info,
      issue_type,
      priority,
      sla_deadline
    });

    res.status(201).json({ success: true, data: createdTicket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;