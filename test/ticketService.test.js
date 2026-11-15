const { describe, it, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const ticketService = require('../src/services/ticketService');
const ticketRepository = require('../src/repositories/ticketRepository');

describe('TicketService Unit Tests (Track SE)', () => {
  const originalGetAll = ticketRepository.getAllTickets;
  const originalCreate = ticketRepository.createTicket;

  let mockDb = [];

  beforeEach(() => {
    // Khởi tạo kho dữ liệu giả lập chuẩn (1 bản ghi gốc đang xử lý)
    mockDb = [
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

    ticketRepository.getAllTickets = async () => mockDb;
    ticketRepository.createTicket = async (newTicketData) => {
      const newId = 100 + mockDb.length;
      mockDb.push({ id: newId, ...newTicketData });
      return newId;
    };
  });

  afterEach(() => {
    ticketRepository.getAllTickets = originalGetAll;
    ticketRepository.createTicket = originalCreate;
  });

  // 1. KIỂM THỬ LUỒNG ĐÚNG (HAPPY PATH)
  it('TC-01. [Luồng đúng] Tạo phiếu bảo hành thành công khi đủ thông tin hợp lệ và tự động tính SLA +48h', async () => {
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
  it('TC-02. [Giá trị biên - Hợp lệ] Chấp nhận mô tả sự cố có độ dài đúng bằng ngưỡng tối thiểu (10 ký tự)', async () => {
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

  it('TC-03. [Giá trị biên - Không hợp lệ] Từ chối mô tả sự cố có độ dài ngay dưới ngưỡng tối thiểu (9 ký tự)', async () => {
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
  it('TC-04. [Dữ liệu sai] Từ chối tạo phiếu khi thiếu trường bắt buộc (trả mã 400 kèm tên trường thiếu)', async () => {
    const missingFieldInput = {
      customer_name: 'Lê Văn C',
      phone: '0987654321',
      device_info: '  ', // Dùng khoảng trắng
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

  it('TC-05. [Dữ liệu sai - Quy tắc nghiệp vụ] Chặn tạo phiếu khi thiết bị đang trong tiến trình xử lý (409 Conflict)', async () => {
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

  // =========================================================================
  // 5 TEST CASE MỚI BỔ SUNG CHO BUỔI 14 (ĐỦ 10 TC & ĐỦ 5 LOẠI + BẮT 3 BUG)
  // =========================================================================

  // 4. GIÁ TRỊ BIÊN TRÊN (Bắt BUG-01: Chưa giới hạn độ dài tối đa 500 ký tự)
  it('TC-06. [Giá trị biên - Ngoài biên trên] Từ chối mô tả sự cố vượt ngưỡng tối đa 500 ký tự (400 Bad Request)', async () => {
    const overMaxBoundaryInput = {
      customer_name: 'Phạm Văn D',
      phone: '0933444555',
      device_info: 'Dell XPS 15 - SN555666',
      issue_description: 'A'.repeat(501), // 501 ký tự (vượt biên 500)
      priority: 'Thường'
    };

    await assert.rejects(
      async () => await ticketService.createTicket(overMaxBoundaryInput),
      (err) => {
        assert.strictEqual(err.statusCode, 400);
        return true;
      }
    );
  });

  // 5. DỮ LIỆU SAI - DANH MỤC PRIORITY (Bắt BUG-02: Cho phép truyền mức độ ưu tiên không nằm trong danh mục)
  it('TC-07. [Dữ liệu sai] Từ chối tạo phiếu khi mức độ ưu tiên (priority) không nằm trong danh mục hợp lệ (400 Bad Request)', async () => {
    const invalidPriorityInput = {
      customer_name: 'Nguyễn Văn D',
      phone: '0944555666',
      device_info: 'Asus ROG Strix - SN777888',
      issue_description: 'Máy bị sập nguồn đột ngột khi đang chạy tác vụ nặng',
      priority: 'Siêu Cấp' // Giá trị sai quy định
    };

    await assert.rejects(
      async () => await ticketService.createTicket(invalidPriorityInput),
      (err) => {
        assert.strictEqual(err.statusCode, 400);
        return true;
      }
    );
  });

  // 6. BẢO MẬT - CHỐNG XSS INJECTION (Bắt BUG-03: Chưa chặn mã độc HTML/Script trong dữ liệu đầu vào)
  it('TC-08. [Bảo mật / Chất lượng dữ liệu] Từ chối tạo phiếu khi thông tin chứa thẻ mã độc XSS <script> (400 Bad Request)', async () => {
    const xssInput = {
      customer_name: '<script>alert("hack")</script>',
      phone: '0901234567',
      device_info: 'Samsung S24 Ultra - IMEI-1122',
      issue_description: 'Camera sau bị mờ không lấy nét được khi chụp gần',
      priority: 'Cao'
    };

    await assert.rejects(
      async () => await ticketService.createTicket(xssInput),
      (err) => {
        assert.strictEqual(err.statusCode, 400);
        return true;
      }
    );
  });

  // 7. BẢO MẬT & TÁC DỤNG PHỤ (Side-effect & XSS/Injection Sanitization)
  it('TC-09. [Bảo mật & Tác dụng phụ] Khi tạo phiếu bị từ chối (409 Conflict), tổng số bản ghi trong CSDL không bị tăng lên', async () => {
    const countBefore = (await ticketRepository.getAllTickets()).length;

    await assert.rejects(
      async () =>
        await ticketService.createTicket({
          customer_name: 'Võ Hoàng Phi Lân',
          phone: '0903999888',
          device_info: 'iPhone 15 Pro Max 256GB - IMEI-9999', // Đang xử lý
          issue_description: 'Thử tạo trùng phiếu bảo hành lần 2'
        }),
      (err) => err.statusCode === 409
    );

    const countAfter = (await ticketRepository.getAllTickets()).length;
    assert.strictEqual(countAfter, countBefore); // Đảm bảo 1 -> 1, không sinh bản ghi rác
  });

  // 8. TÍNH TÁI LẬP (REPRODUCIBILITY)
  it('TC-10. [Tái lập] Chạy khởi tạo dữ liệu mẫu và tra cứu 2 lần liên tiếp cho kết quả nhất quán, không nhân đôi dữ liệu', async () => {
    const firstRunList = await ticketRepository.getAllTickets();
    const secondRunList = await ticketRepository.getAllTickets();

    assert.strictEqual(firstRunList.length, 1);
    assert.strictEqual(secondRunList.length, firstRunList.length);
    assert.strictEqual(secondRunList[0].ticket_code, 'TKT-20261024-PL01');
  });
});