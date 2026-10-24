const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Dữ liệu mẫu giả lập đã được đổi mã phiếu mới & thêm khách hàng Võ Hoàng Phi Lân
let tickets = [
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

// --- APIs ---

// API 1: Lấy số liệu cho Dashboard
app.get('/api/dashboard', (req, res) => {
  const stats = {
    total: tickets.length,
    new: tickets.filter(t => t.status === 'Mới tiếp nhận').length,
    in_progress: tickets.filter(t => t.status === 'Đang xử lý').length,
    high_priority: tickets.filter(t => t.priority === 'Cao').length
  };
  res.json({ success: true, stats, recentTickets: tickets });
});

// API 2: Lấy toàn bộ phiếu bảo hành
app.get('/api/tickets', (req, res) => {
  res.json({ success: true, data: tickets });
});

// API 3: Cập nhật trạng thái phiếu bảo hành
app.patch('/api/tickets/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const ticket = tickets.find(t => t.id == id);
  if (ticket) {
    ticket.status = status;
    return res.json({ success: true, data: ticket });
  }
  res.status(404).json({ success: false, message: 'Không tìm thấy phiếu' });
});

// API 4: Tạo phiếu mới
app.post('/api/tickets', (req, res) => {
  const { customer_name, phone, device_info, issue_type, description, priority } = req.body;
  
  if (!customer_name || !phone || !device_info || !issue_type) {
    return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ các thông tin bắt buộc!' });
  }

  const timestamp = Date.now().toString().slice(-4);
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  
  const newTicket = {
    id: tickets.length + 1,
    ticket_code: `TKT-${dateStr}-NEW${timestamp}`,
    customer_name,
    phone,
    device_info,
    issue_type,
    description: description || 'Không có ghi chú thêm',
    priority: priority || 'Thường',
    status: 'Mới tiếp nhận',
    sla_deadline: '18:00 26/10/2026',
    created_at: new Date().toLocaleString('vi-VN')
  };

  tickets.unshift(newTicket);
  res.status(201).json({ success: true, data: newTicket });
});

// --- Giao diện Web (HTML / CSS / JS) ---
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>MEKONG MOBILE - SMART CRM</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background-color: #0b0f19; color: #e2e8f0; display: flex; height: 100vh; overflow: hidden; }
        
        /* Sidebar Navigation */
        .sidebar { width: 250px; background-color: #111827; border-right: 1px solid #1f2937; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
        .logo { color: #3b82f6; font-weight: bold; font-size: 16px; margin-bottom: 20px; text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
        .menu-category { font-size: 11px; color: #6b7280; font-weight: bold; text-transform: uppercase; margin: 10px 0 5px 10px; }
        .menu-item { color: #9ca3af; padding: 12px 14px; border-radius: 8px; cursor: pointer; text-decoration: none; font-size: 14px; display: flex; align-items: center; gap: 10px; transition: 0.2s; }
        .menu-item.active, .menu-item:hover { background-color: #1e293b; color: #ffffff; }

        /* Main Container */
        .main { flex: 1; padding: 30px; overflow-y: auto; }
        .page { display: none; }
        .page.active { display: block; }

        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .title { font-size: 24px; font-weight: bold; color: #ffffff; }
        .subtitle { font-size: 12px; color: #6b7280; }
        
        .btn-primary { background-color: #2563eb; color: #fff; border: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s; }
        .btn-primary:hover { background-color: #1d4ed8; }

        /* Stats Cards */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 30px; }
        .card { background-color: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 20px; position: relative; }
        .card-title { font-size: 13px; color: #9ca3af; margin-bottom: 10px; }
        .card-value { font-size: 28px; font-weight: bold; color: #ffffff; margin-bottom: 5px; }
        .card-sub { font-size: 12px; color: #6b7280; }
        .badge-live { position: absolute; top: 15px; right: 15px; font-size: 10px; color: #10b981; }

        /* Tables & Filters */
        .filter-bar { display: flex; gap: 12px; margin-bottom: 20px; }
        .filter-bar input, .filter-bar select {
          background-color: #111827; border: 1px solid #1f2937; color: #fff; padding: 10px 14px; border-radius: 6px; font-size: 13px; outline: none;
        }
        .filter-bar input { flex: 1; }

        .table-container { background-color: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 20px; }
        .table-title { font-size: 16px; font-weight: bold; margin-bottom: 15px; color: #f3f4f6; }
        table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
        th { color: #6b7280; padding: 12px; border-bottom: 1px solid #1f2937; font-weight: 600; text-transform: uppercase; font-size: 11px; }
        td { padding: 14px 12px; border-bottom: 1px solid #1f2937; color: #d1d5db; }
        
        .tag { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; display: inline-block; }
        .tag-high { background-color: #7f1d1d; color: #f87171; }
        .tag-normal { background-color: #1e293b; color: #9ca3af; }
        .tag-status-process { background-color: #78350f; color: #fbbf24; }
        .tag-status-new { background-color: #1e3a8a; color: #60a5fa; }
        .tag-status-done { background-color: #064e3b; color: #34d399; }

        .select-status { background: #1f2937; color: #fff; border: 1px solid #374151; border-radius: 4px; padding: 4px; font-size: 12px; }

        /* Form Tiếp nhận yêu cầu */
        .form-container { background-color: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 24px; max-width: 800px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group.full-width { grid-column: span 2; }
        .form-group label { font-size: 13px; color: #9ca3af; font-weight: 600; }
        .form-group input, .form-group select, .form-group textarea {
          background-color: #1f2937; border: 1px solid #374151; color: #ffffff; padding: 12px; border-radius: 6px; font-size: 14px; outline: none;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #2563eb; }
        .form-actions { display: flex; justify-content: flex-end; gap: 12px; }
        .btn-secondary { background: transparent; color: #9ca3af; border: 1px solid #374151; padding: 10px 18px; border-radius: 6px; cursor: pointer; }
      </style>
    </head>
    <body>

      <!-- Sidebar Left -->
      <div class="sidebar">
        <div class="logo">🛡️ Mekong Mobile</div>
        <div class="menu-category">Không gian làm việc</div>
        <a class="menu-item active" id="menu-overview" onclick="switchTab('overview')">📊 Tổng quan</a>
        <a class="menu-item" id="menu-tickets" onclick="switchTab('tickets')">🎫 Phiếu bảo hành</a>
        <a class="menu-item" id="menu-create" onclick="switchTab('create')">📝 Tiếp nhận yêu cầu</a>
      </div>

      <!-- Main Content -->
      <div class="main">
        
        <!-- PAGE 1: TỔNG QUAN -->
        <div id="page-overview" class="page active">
          <div class="header">
            <div>
              <p class="subtitle">TRUNG TÂM ĐIỀU HÀNH</p>
              <h1 class="title">Tổng quan</h1>
            </div>
            <button class="btn-primary" onclick="switchTab('create')">+ Tạo phiếu mới</button>
          </div>

          <div class="stats-grid">
            <div class="card">
              <span class="badge-live">● LIVE</span>
              <div class="card-title">Tổng phiếu</div>
              <div class="card-value" id="stat-total">0</div>
              <div class="card-sub">Tất cả phiếu bảo hành</div>
            </div>
            <div class="card">
              <span class="badge-live">● LIVE</span>
              <div class="card-title">Mới tiếp nhận</div>
              <div class="card-value" id="stat-new">0</div>
              <div class="card-sub">Chờ xử lý</div>
            </div>
            <div class="card">
              <span class="badge-live">● LIVE</span>
              <div class="card-title">Đang xử lý</div>
              <div class="card-value" id="stat-progress">0</div>
              <div class="card-sub">Đang thực hiện</div>
            </div>
            <div class="card">
              <span class="badge-live">● LIVE</span>
              <div class="card-title">Ưu tiên cao</div>
              <div class="card-value" id="stat-high">0</div>
              <div class="card-sub">Cần chú ý</div>
            </div>
          </div>

          <div class="table-container">
            <div class="table-title">Phiếu cập nhật gần đây</div>
            <table>
              <thead>
                <tr>
                  <th>MÃ PHIẾU</th>
                  <th>KHÁCH HÀNG / THIẾT BỊ</th>
                  <th>NHÓM SỰ CỐ</th>
                  <th>ƯU TIÊN</th>
                  <th>TRẠNG THÁI</th>
                  <th>HẠN SLA</th>
                </tr>
              </thead>
              <tbody id="ticket-table-body"></tbody>
            </table>
          </div>
        </div>

        <!-- PAGE 2: PHIẾU BẢO HÀNH (DANH SÁCH CHI TIẾT & BỘ LỌC) -->
        <div id="page-tickets" class="page">
          <div class="header">
            <div>
              <p class="subtitle">QUẢN LÝ TẬP TRUNG</p>
              <h1 class="title">Danh sách phiếu bảo hành</h1>
            </div>
            <button class="btn-primary" onclick="switchTab('create')">+ Tạo phiếu mới</button>
          </div>

          <!-- Bộ lọc & Tìm kiếm -->
          <div class="filter-bar">
            <input type="text" id="searchInput" placeholder="🔍 Tìm theo mã phiếu, tên khách hàng hoặc SĐT..." oninput="filterTickets()" />
            <select id="statusFilter" onchange="filterTickets()">
              <option value="">Tất cả trạng thái</option>
              <option value="Mới tiếp nhận">Mới tiếp nhận</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Hoàn thành">Hoàn thành</option>
            </select>
            <select id="priorityFilter" onchange="filterTickets()">
              <option value="">Tất cả ưu tiên</option>
              <option value="Cao">Ưu tiên: Cao</option>
              <option value="Thường">Ưu tiên: Thường</option>
            </select>
          </div>

          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>MÃ PHIẾU</th>
                  <th>KHÁCH HÀNG</th>
                  <th>SỐ ĐIỆN THOẠI</th>
                  <th>THIẾT BỊ</th>
                  <th>SỰ CỐ & MÔ TẢ</th>
                  <th>ƯU TIÊN</th>
                  <th>CẬP NHẬT TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody id="full-ticket-table-body"></tbody>
            </table>
          </div>
        </div>

        <!-- PAGE 3: TIẾP NHẬN YÊU CẦU -->
        <div id="page-create" class="page">
          <div class="header">
            <div>
              <p class="subtitle">TIẾP NHẬN BẢO HÀNH</p>
              <h1 class="title">Tạo phiếu mới</h1>
            </div>
          </div>

          <div class="form-container">
            <form id="ticketForm" onsubmit="handleFormSubmit(event)">
              <div class="form-grid">
                <div class="form-group">
                  <label>Tên khách hàng *</label>
                  <input type="text" id="custName" placeholder="Ví dụ: Võ Hoàng Phi Lân" required />
                </div>
                <div class="form-group">
                  <label>Số điện thoại *</label>
                  <input type="tel" id="custPhone" placeholder="Ví dụ: 0903999888" required />
                </div>
                <div class="form-group">
                  <label>Thông tin thiết bị (Model / IMEI) *</label>
                  <input type="text" id="devInfo" placeholder="Ví dụ: iPhone 15 Pro Max..." required />
                </div>
                <div class="form-group">
                  <label>Nhóm sự cố *</label>
                  <select id="issueType" required>
                    <option value="Lỗi phần cứng">Lỗi phần cứng (Màn hình, Pin, Loa...)</option>
                    <option value="Lỗi phần mềm">Lỗi phần mềm (Treo logo, Khóa iCloud...)</option>
                    <option value="Bảo hành định kỳ">Bảo hành / Vệ sinh định kỳ</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Mức độ ưu tiên</label>
                  <select id="priority">
                    <option value="Thường">Thường</option>
                    <option value="Cao">Cao (Khẩn cấp)</option>
                  </select>
                </div>
                <div class="form-group full-width">
                  <label>Mô tả chi tiết sự cố</label>
                  <textarea id="description" rows="4" placeholder="Mô tả tình trạng máy khi tiếp nhận..."></textarea>
                </div>
              </div>

              <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="switchTab('overview')">Hủy bỏ</button>
                <button type="submit" class="btn-primary">Lưu & Tiếp nhận phiếu</button>
              </div>
            </form>
          </div>
        </div>

      </div>

      <script>
        let allTicketsData = [];

        // Chuyển đổi giữa các Trang (Tabs)
        function switchTab(tabName) {
          document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
          document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));

          document.getElementById('page-' + tabName).classList.add('active');
          document.getElementById('menu-' + tabName).classList.add('active');

          if (tabName === 'overview' || tabName === 'tickets') {
            loadData();
          }
        }

        // Fetch dữ liệu từ Backend
        async function loadData() {
          const res = await fetch('/api/dashboard');
          const { stats, recentTickets } = await res.json();
          allTicketsData = recentTickets;

          // Cập nhật thống kê
          document.getElementById('stat-total').innerText = stats.total;
          document.getElementById('stat-new').innerText = stats.new;
          document.getElementById('stat-progress').innerText = stats.in_progress;
          document.getElementById('stat-high').innerText = stats.high_priority;

          // Render bảng Tổng quan
          const tbodyOverview = document.getElementById('ticket-table-body');
          tbodyOverview.innerHTML = recentTickets.slice(0, 5).map(t => \`
            <tr>
              <td><strong>\${t.ticket_code}</strong></td>
              <td>
                <div style="font-weight: bold; color: #fff;">\${t.customer_name}</div>
                <div style="font-size: 11px; color: #6b7280;">\${t.device_info}</div>
              </td>
              <td>\${t.issue_type}</td>
              <td><span class="tag \${t.priority === 'Cao' ? 'tag-high' : 'tag-normal'}">\${t.priority}</span></td>
              <td>
                <span class="tag \${getStatusTagClass(t.status)}">
                  \${t.status}
                </span>
              </td>
              <td style="color: #9ca3af;">\${t.sla_deadline}</td>
            </tr>
          \`).join('');

          filterTickets();
        }

        function getStatusTagClass(status) {
          if (status === 'Đang xử lý') return 'tag-status-process';
          if (status === 'Hoàn thành') return 'tag-status-done';
          return 'tag-status-new';
        }

        // Lọc và Tìm kiếm trên trang Phiếu bảo hành
        function filterTickets() {
          const keyword = document.getElementById('searchInput').value.toLowerCase();
          const statusVal = document.getElementById('statusFilter').value;
          const priorityVal = document.getElementById('priorityFilter').value;

          const filtered = allTicketsData.filter(t => {
            const matchKeyword = t.ticket_code.toLowerCase().includes(keyword) || 
                                 t.customer_name.toLowerCase().includes(keyword) || 
                                 (t.phone && t.phone.includes(keyword));
            const matchStatus = !statusVal || t.status === statusVal;
            const matchPriority = !priorityVal || t.priority === priorityVal;
            return matchKeyword && matchStatus && matchPriority;
          });

          const tbodyTickets = document.getElementById('full-ticket-table-body');
          tbodyTickets.innerHTML = filtered.map(t => \`
            <tr>
              <td><strong>\${t.ticket_code}</strong></td>
              <td style="color: #fff; font-weight: bold;">\${t.customer_name}</td>
              <td>\${t.phone || 'N/A'}</td>
              <td>\${t.device_info}</td>
              <td>
                <div style="font-weight: 600;">\${t.issue_type}</div>
                <div style="font-size: 11px; color: #6b7280;">\${t.description}</div>
              </td>
              <td><span class="tag \${t.priority === 'Cao' ? 'tag-high' : 'tag-normal'}">\${t.priority}</span></td>
              <td>
                <select class="select-status" onchange="updateTicketStatus(\${t.id}, this.value)">
                  <option value="Mới tiếp nhận" \${t.status === 'Mới tiếp nhận' ? 'selected' : ''}>Mới tiếp nhận</option>
                  <option value="Đang xử lý" \${t.status === 'Đang xử lý' ? 'selected' : ''}>Đang xử lý</option>
                  <option value="Hoàn thành" \${t.status === 'Hoàn thành' ? 'selected' : ''}>Hoàn thành</option>
                </select>
              </td>
            </tr>
          \`).join('');
        }

        // Cập nhật trạng thái trực tiếp trên trang Phiếu bảo hành
        async function updateTicketStatus(id, newStatus) {
          await fetch('/api/tickets/' + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
          });
          loadData();
        }

        // Xử lý gửi Form Tạo phiếu mới
        async function handleFormSubmit(event) {
          event.preventDefault();

          const payload = {
            customer_name: document.getElementById('custName').value,
            phone: document.getElementById('custPhone').value,
            device_info: document.getElementById('devInfo').value,
            issue_type: document.getElementById('issueType').value,
            priority: document.getElementById('priority').value,
            description: document.getElementById('description').value
          };

          const res = await fetch('/api/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (res.ok) {
            alert('Đã tiếp nhận và tạo phiếu bảo hành thành công!');
            document.getElementById('ticketForm').reset();
            switchTab('tickets');
          } else {
            alert('Lỗi: Không thể tạo phiếu!');
          }
        }

        // Khởi chạy mặc định
        loadData();
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server local đang chạy tại: http://localhost:${PORT}`);
});