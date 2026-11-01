const { describe, it, test, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const ticketService = require('../src/services/ticketService');
const ticketRepository = require('../src/repositories/ticketRepository');

describe('TicketService Unit Tests (Track SE)', () => {
  const originalGetAll = ticketRepository.getAllTickets;
  const originalCreate = ticketRepository.createTicket;

  beforeEach(() => {
    // Giả lập dữ liệu độc lập (Mock), không phụ thuộc CSDL cục bộ
    ticketRepository.getAllTickets = async () => [
      {
        id: 1,
        ticket_code: 'TKT-20261024-PL01',
        customer_name: 'Võ Hoàng Phi Lân',
        phone: '0903999888',
        device_info: 'iPhone 15 Pro Max 256GB - IMEI-9999',
        status: 'Đang xử lý',
        priority: 'Cao'
      }
    ];
    ticketRepository.createTicket = async () => 101;
  });

  afterEach(() => {
    ticketRepository.getAllTickets = originalGetAll;
    ticketRepository.createTicket = originalCreate;
  });

  // 1. KIỂM THỬ LUỒNG ĐÚNG (HAPPY PATH)
  it('1. [Luồng đúng] Tạo phiếu bảo hành thành công khi đủ thông tin hợp lệ và tự động tính SLA +48h', async () => {
    const validInput = {
      customer_name: 'Nguyễn Văn A',
      phone: '0901234567',
      device_info: 'MacBook Air M2 2023 - SN123456',
      issue_description: 'Bàn phím bị liệt phím Space và cụm đèn nền chập chờn',
      category: 'Lỗi phần cứng',
      priority: 'Thường'
    };

    const result = await ticketService.createTicket(validInput);

    assert.strictEqual(result.id, 101);
    assert.ok(result.ticket_code.startsWith('TKT-'));
    assert.strictEqual(result.status, 'Mới tiếp nhận');
    assert.ok(result.sla_due_date);
  });

  // 2. KIỂM THỬ GIÁ TRỊ BIÊN (BOUNDARY VALUE)
  it('2a. [Giá trị biên - Hợp lệ] Chấp nhận mô tả sự cố có độ dài đúng bằng ngưỡng tối thiểu (10 ký tự)', async () => {
    const boundaryValidInput = {
      customer_name: 'Trần Thị B',
      phone: '0912345678',
      device_info: 'iPad Pro M1 - SN888888',
      issue_description: '1234567890', // Đúng 10 ký tự
      priority: 'Cao'
    };

    const result = await ticketService.createTicket(boundaryValidInput);
    assert.strictEqual(result.id, 101);
    assert.strictEqual(result.priority, 'Cao');
  });

  it('2b. [Giá trị biên - Không hợp lệ] Từ chối mô tả sự cố có độ dài ngay dưới ngưỡng tối thiểu (9 ký tự)', async () => {
    const boundaryInvalidInput = {
      customer_name: 'Trần Thị B',
      phone: '0912345678',
      device_info: 'iPad Pro M1 - SN888888',
      issue_description: '123456789', // 9 ký tự (dưới biên)
      priority: 'Thường'
    };

    await assert.rejects(
      async () => await ticketService.createTicket(boundaryInvalidInput),
      (err) => {
        assert.strictEqual(err.statusCode, 400);
        assert.ok(err.message.includes('tối thiểu 10 ký tự'));
        return true;
      }
    );
  });

  // 3. KIỂM THỬ DỮ LIỆU SAI (NEGATIVE / ERROR CASE)
  it('3a. [Dữ liệu sai] Từ chối tạo phiếu khi thiếu trường bắt buộc (trả mã 400 kèm tên trường thiếu)', async () => {
    const missingFieldInput = {
      customer_name: 'Lê Văn C',
      phone: '0987654321',
      device_info: '', // Bỏ trống thông tin thiết bị
      issue_description: 'Máy bị mất nguồn hoàn toàn không khởi động được'
    };

    await assert.rejects(
      async () => await ticketService.createTicket(missingFieldInput),
      (err) => {
        assert.strictEqual(err.statusCode, 400);
        assert.ok(err.message.includes('device_info'));
        return true;
      }
    );
  });

  it('3b. [Dữ liệu sai - Quy tắc nghiệp vụ] Chặn tạo phiếu khi thiết bị đang trong tiến trình xử lý (409 Conflict)', async () => {
    const duplicateDeviceInput = {
      customer_name: 'Võ Hoàng Phi Lân',
      phone: '0903999888',
      device_info: 'iPhone 15 Pro Max 256GB - IMEI-9999',
      issue_description: 'Màn hình bị sọc xanh sau khi rơi rớt'
    };

    await assert.rejects(
      async () => await ticketService.createTicket(duplicateDeviceInput),
      (err) => {
        assert.strictEqual(err.statusCode, 409);
        assert.ok(err.message.includes('đang trong tiến trình xử lý'));
        return true;
      }
    );
  });
});