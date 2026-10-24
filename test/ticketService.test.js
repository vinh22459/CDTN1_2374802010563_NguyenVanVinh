// tests/ticketService.test.js
const ticketService = require('../src/services/ticketService');

describe('TicketService Unit Tests', () => {
  
  // Test 1: Luồng bình thường - Tạo phiếu thành công
  test('PASS: Tạo phiếu bảo hành hợp lệ', async () => {
    const payload = {
      customer_name: 'Võ Hoàng Phi Lân',
      phone: '0903999888',
      device_info: 'iPhone 15 Pro Max',
      issue_type: 'Lỗi phần cứng'
    };
    const result = await ticketService.createTicket(payload);
    expect(result).toHaveProperty('ticket_code');
    expect(result.customer_name).toBe('Võ Hoàng Phi Lân');
  });

  // Test 2: Giá trị biên - Tên khách hàng ngắn nhất (1 ký tự)
  test('PASS: Tạo phiếu với tên khách hàng 1 ký tự (Giá trị biên)', async () => {
    const payload = { customer_name: 'A', phone: '0901234567', device_info: 'iPad', issue_type: 'Lỗi phần mềm' };
    const result = await ticketService.createTicket(payload);
    expect(result.customer_name).toBe('A');
  });

  // Test 3: Luồng ngoại lệ - Thiếu thông tin bắt buộc
  test('PASS (Ngoại lệ): Báo lỗi khi thiếu tên khách hàng', async () => {
    const payload = { phone: '0901234567', device_info: 'MacBook' };
    await expect(ticketService.createTicket(payload)).rejects.toThrow();
  });

  // Test 4: Luồng ngoại lệ - Số điện thoại không hợp lệ
  test('PASS (Ngoại lệ): Báo lỗi khi SĐT chứa chữ cái', async () => {
    const payload = { customer_name: 'Lê Văn Thuận', phone: 'ABC123456', device_info: 'MacBook', issue_type: 'Lỗi phần cứng' };
    await expect(ticketService.createTicket(payload)).rejects.toThrow();
  });

  // Test 5: Tính toán thống kê Dashboard
  test('PASS: Tính toán đúng số lượng thống kê theo trạng thái', async () => {
    const data = await ticketService.getDashboardData();
    expect(data.stats).toHaveProperty('total');
    expect(data.stats).toHaveProperty('new');
  });
});