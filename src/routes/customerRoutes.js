const express = require('express');
const router = express.Router();
const customers = require('../models/customerModel');

// Lấy danh sách khách hàng
router.get('/customers', (req, res) => {
  res.json(customers);
});

// Thêm khách hàng mới
router.post('/customers', (req, res) => {
  const { name, phone, email } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Tên và số điện thoại là bắt buộc' });
  }
  const newCustomer = { id: customers.length + 1, name, phone, email: email || '' };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

module.exports = router;