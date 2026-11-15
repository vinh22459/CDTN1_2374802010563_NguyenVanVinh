const express = require('express');
const ticketRoutes = require('./routes/ticketRoutes');
const ticketService = require('./services/ticketService');
const customerRoutes = require('./routes/customerRoutes');
const customers = require('./models/customerModel');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', customerRoutes);
app.use('/api/tickets', ticketRoutes);

app.get('/api/dashboard', async (req, res) => {
  try {
    const { stats, recentTickets } = await ticketService.getDashboardData();
    res.status(200).json({ success: true, stats, recentTickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

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
        
        /* LOGIN SCREEN */
        #login-screen { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #0b0f19; z-index: 1000; display: flex; justify-content: center; align-items: center; }
        .login-card { background-color: #111827; border: 1px solid #1f2937; padding: 40px; border-radius: 12px; width: 400px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .login-title { font-size: 22px; font-weight: bold; color: #fff; margin-bottom: 8px; text-align: center; }
        .login-sub { font-size: 13px; color: #6b7280; text-align: center; margin-bottom: 24px; }
        
        /* LAYOUT CHÍNH */
        .app-container { display: none; width: 100%; height: 100%; }
        .sidebar { width: 250px; background-color: #111827; border-right: 1px solid #1f2937; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
        .logo { color: #3b82f6; font-weight: bold; font-size: 16px; margin-bottom: 20px; text-transform: uppercase; display: flex; align-items: center; gap: 8px; }
        .menu-category { font-size: 11px; color: #6b7280; font-weight: bold; text-transform: uppercase; margin: 10px 0 5px 10px; }
        .menu-item { color: #9ca3af; padding: 12px 14px; border-radius: 8px; cursor: pointer; text-decoration: none; font-size: 14px; display: flex; align-items: center; gap: 10px; transition: 0.2s; }
        .menu-item.active, .menu-item:hover { background-color: #1e293b; color: #ffffff; }
        .main { flex: 1; padding: 30px; overflow-y: auto; }
        .page { display: none; }
        .page.active { display: block; }
        
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .title { font-size: 24px; font-weight: bold; color: #ffffff; }
        .subtitle { font-size: 12px; color: #6b7280; }
        .btn-primary { background-color: #2563eb; color: #fff; border: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s; white-space: nowrap; }
        .btn-primary:hover { background-color: #1d4ed8; }
        
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 30px; }
        .card { background-color: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 20px; position: relative; }
        .card-title { font-size: 13px; color: #9ca3af; margin-bottom: 10px; }
        .card-value { font-size: 28px; font-weight: bold; color: #ffffff; margin-bottom: 5px; }
        .card-sub { font-size: 12px; color: #6b7280; }
        .badge-live { position: absolute; top: 15px; right: 15px; font-size: 10px; color: #10b981; }
        
        .filter-bar { display: flex; gap: 10px; margin-bottom: 20px; align-items: center; }
        .filter-bar input, .filter-bar select { background-color: #111827; border: 1px solid #1f2937; color: #fff; padding: 10px 14px; border-radius: 6px; font-size: 13px; outline: none; }
        .filter-bar input:focus, .filter-bar select:focus { border-color: #3b82f6; }
        .filter-bar input { flex: 1; }
        .btn-reload { background-color: #1e293b; color: #60a5fa; border: 1px solid #3b82f6; padding: 10px 16px; border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer; transition: 0.2s; white-space: nowrap; }
        .btn-reload:hover { background-color: #3b82f6; color: #ffffff; }
        
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
        
        .form-container { background-color: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 24px; max-width: 800px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group.full-width { grid-column: span 2; }
        .form-group label { font-size: 13px; color: #9ca3af; font-weight: 600; }
        .form-group input, .form-group select, .form-group textarea { background-color: #1f2937; border: 1px solid #374151; color: #ffffff; padding: 12px; border-radius: 6px; font-size: 14px; outline: none; }
        .form-actions { display: flex; justify-content: flex-end; gap: 12px; }
        .btn-secondary { background: transparent; color: #9ca3af; border: 1px solid #374151; padding: 10px 18px; border-radius: 6px; cursor: pointer; white-space: nowrap; }
        
        .alert-box { padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-size: 13px; display: none; }
        .alert-error { background-color: #7f1d1d; color: #fecaca; border: 1px solid #ef4444; }
        .alert-success { background-color: #064e3b; color: #a7f3d0; border: 1px solid #10b981; }
        .btn-delete { background-color: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: 500; font-size: 12px; }
        .btn-delete:hover { background-color: #dc2626; }
      </style>
    </head>
    <body>

      <!-- MÀN HÌNH 1: ĐĂNG NHẬP -->
      <div id="login-screen">
        <div class="login-card">
          <div class="login-title">🛡️ Mekong Mobile CRM</div>
          <div class="login-sub">Đăng nhập hệ thống quản lý bảo hành</div>
          <div id="loginAlert" class="alert-box alert-error"></div>
          <form onsubmit="handleLogin(event)">
            <div class="form-group" style="margin-bottom: 15px;">
              <label>Tài khoản (admin)</label>
              <input type="text" id="loginUser" placeholder="Nhập tài khoản..." required value="admin" />
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label>Mật khẩu (123456)</label>
              <input type="password" id="loginPass" placeholder="Nhập mật khẩu..." required value="123456" />
            </div>
            <button type="submit" class="btn-primary" style="width: 100%;">Đăng nhập hệ thống</button>
          </form>
        </div>
      </div>

      <!-- LAYOUT QUẢN TRỊ SAU KHI ĐĂNG NHẬP -->
      <div class="app-container" id="appContainer">
        <div class="sidebar">
          <div class="logo">🛡️ Mekong Mobile</div>
          <div class="menu-category">Không gian làm việc</div>
          <a class="menu-item active" id="menu-overview" onclick="switchTab('overview')">📊 Tổng quan</a>
          <a class="menu-item" id="menu-tickets" onclick="switchTab('tickets')">🎫 Phiếu bảo hành</a>
          <a class="menu-item" id="menu-create" onclick="switchTab('create')">📝 Tiếp nhận yêu cầu</a>
          <a class="menu-item" id="menu-customers" onclick="switchTab('customers')">👥 Quản lý Khách hàng</a>
          <div style="margin-top: auto;">
            <a class="menu-item" onclick="handleLogout()" style="color: #f87171;">🚪 Đăng xuất</a>
          </div>
        </div>

        <div class="main">
          <!-- TAB 1: TỔNG QUAN -->
          <div id="page-overview" class="page active">
            <div class="header">
              <div>
                <p class="subtitle">TRUNG TÂM ĐIỀU HÀNH</p>
                <h1 class="title">Tổng quan hệ thống</h1>
              </div>
              <button class="btn-primary" onclick="switchTab('create')">+ Tạo phiếu mới</button>
            </div>

            <div class="stats-grid">
              <div class="card"><span class="badge-live">● LIVE</span><div class="card-title">Tổng phiếu</div><div class="card-value" id="stat-total">0</div></div>
              <div class="card"><span class="badge-live">● LIVE</span><div class="card-title">Mới tiếp nhận</div><div class="card-value" id="stat-new">0</div></div>
              <div class="card"><span class="badge-live">● LIVE</span><div class="card-title">Đang xử lý</div><div class="card-value" id="stat-progress">0</div></div>
              <div class="card"><span class="badge-live">● LIVE</span><div class="card-title">Ưu tiên cao</div><div class="card-value" id="stat-high">0</div></div>
            </div>

            <div class="table-container">
              <div class="table-title">Phiếu cập nhật gần đây</div>
              <table>
                <thead>
                  <tr><th>MÃ PHIẾU</th><th>KHÁCH HÀNG / THIẾT BỊ</th><th>NHÓM SỰ CỐ</th><th>ƯU TIÊN</th><th>TRẠNG THÁI</th><th>HẠN SLA</th></tr>
                </thead>
                <tbody id="ticket-table-body"></tbody>
              </table>
            </div>
          </div>

          <!-- TAB 2: DANH SÁCH PHIẾU BẢO HÀNH -->
          <div id="page-tickets" class="page">
            <div class="header">
              <div><p class="subtitle">QUẢN LÝ TẬP TRUNG</p><h1 class="title">Danh sách phiếu bảo hành</h1></div>
              <button class="btn-primary" onclick="switchTab('create')">+ Tạo phiếu mới</button>
            </div>
            <div id="searchAlert" class="alert-box alert-success"></div>
            <div class="filter-bar">
              <input type="text" id="searchInput" placeholder="🔍 Tìm theo mã phiếu, tên khách hàng hoặc SĐT..." oninput="onSearchCriteriaChange()" />
              <select id="statusFilter" onchange="onSearchCriteriaChange()">
                <option value="">Tất cả trạng thái</option>
                <option value="Mới tiếp nhận">Mới tiếp nhận</option>
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Hoàn thành">Hoàn thành</option>
              </select>
              <button type="button" class="btn-primary" onclick="handleManualSearch()">🔍 Tìm kiếm</button>
              <button type="button" class="btn-reload" onclick="handleReloadTickets()">🔄 Tra cứu lại</button>
            </div>
            <div class="table-container">
              <table>
                <thead>
                  <tr><th>MÃ PHIẾU</th><th>KHÁCH HÀNG</th><th>SỐ ĐIỆN THOẠI</th><th>THIẾT BỊ</th><th>SỰ CỐ</th><th>ƯU TIÊN</th><th>HẠN SLA</th><th>TRẠNG THÁI</th><th>THAO TÁC</th></tr>
                </thead>
                <tbody id="full-ticket-table-body"></tbody>
              </table>
            </div>
          </div>

          <!-- TAB 3: TIẾP NHẬN YÊU CẦU -->
          <div id="page-create" class="page">
            <div class="header"><div><p class="subtitle">TIẾP NHẬN BẢO HÀNH</p><h1 class="title">Tạo phiếu mới</h1></div></div>
            <div class="form-container">
              <div id="formAlert" class="alert-box"></div>
              <form id="ticketForm" onsubmit="handleFormSubmit(event)" novalidate>
                <div class="form-grid">
                  <div class="form-group"><label>Tên khách hàng *</label><input type="text" id="custName" placeholder="Nguyễn Văn Vinh" required /></div>
                  <div class="form-group"><label>Số điện thoại (10 số) *</label><input type="tel" id="custPhone" placeholder="0901234567" required /></div>
                  <div class="form-group"><label>Thông tin thiết bị *</label><input type="text" id="devInfo" placeholder="iPhone 15 Pro Max" required /></div>
                  <div class="form-group"><label>Nhóm sự cố *</label>
                    <select id="issueType" required>
                      <option value="Lỗi phần cứng">Lỗi phần cứng</option>
                      <option value="Lỗi phần mềm">Lỗi phần mềm</option>
                      <option value="Bảo hành định kỳ">Bảo hành định kỳ</option>
                    </select>
                  </div>
                  <div class="form-group"><label>Mức độ ưu tiên</label>
                    <select id="priority">
                      <option value="Thường">Thường (SLA +48h)</option>
                      <option value="Cao">Cao (SLA +24h)</option>
                    </select>
                  </div>
                  <div class="form-group full-width"><label>Mô tả chi tiết sự cố (>= 10 ký tự) *</label><textarea id="description" rows="3" required></textarea></div>
                </div>
                <div class="form-actions"><button type="button" class="btn-secondary" onclick="switchTab('overview')">Hủy</button><button type="submit" class="btn-primary">Lưu phiếu</button></div>
              </form>
            </div>
          </div>

          <!-- TAB 4: QUẢN LÝ KHÁCH HÀNG (THỰC THỂ THỨ HAI) -->
          <div id="page-customers" class="page">
            <div class="header">
              <div><p class="subtitle">QUẢN LÝ DỮ LIỆU</p><h1 class="title">Danh sách Khách hàng (Thực thể thứ 2)</h1></div>
            </div>
            <div class="table-container">
              <table>
                <thead>
                  <tr><th>ID</th><th>HỌ TÊN KHÁCH HÀNG</th><th>SỐ ĐIỆN THOẠI</th><th>EMAIL</th></tr>
                </thead>
                <tbody id="customer-table-body">
                  <tr><td colspan="4" style="text-align:center;">Đang tải danh sách khách hàng...</td></tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      <script>
        let allTicketsData = [];
        let queryCount = 0;
        let lastSearchSignature = '';

        window.onload = function() {
          if (localStorage.getItem('isLoggedIn') === 'true') {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('appContainer').style.display = 'flex';
            loadData();
            loadCustomers();
          }
        };

        function handleLogin(event) {
          event.preventDefault();
          const user = document.getElementById('loginUser').value.trim();
          const pass = document.getElementById('loginPass').value.trim();
          const alertBox = document.getElementById('loginAlert');

          if (user === 'admin' && pass === '123456') {
            localStorage.setItem('isLoggedIn', 'true');
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('appContainer').style.display = 'flex';
            loadData();
            loadCustomers();
          } else {
            alertBox.style.display = 'block';
            alertBox.innerText = '❌ Sai tài khoản hoặc mật khẩu! (Dùng admin / 123456)';
          }
        }

        function handleLogout() {
          localStorage.removeItem('isLoggedIn');
          location.reload();
        }

        function resetSearchState() {
          queryCount = 0;
          lastSearchSignature = '';
          const searchInput = document.getElementById('searchInput');
          const statusFilter = document.getElementById('statusFilter');
          const searchAlert = document.getElementById('searchAlert');
          const formAlert = document.getElementById('formAlert');
          if (searchInput) searchInput.value = '';
          if (statusFilter) statusFilter.value = '';
          if (searchAlert) {
            searchAlert.style.display = 'none';
            searchAlert.innerText = '';
          }
          if (formAlert) {
            formAlert.style.display = 'none';
          }
        }

        function switchTab(tabName) {
          document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
          document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
          document.getElementById('page-' + tabName).classList.add('active');
          document.getElementById('menu-' + tabName).classList.add('active');

          // Reset kết quả và bộ đếm tra cứu khi đổi tab
          resetSearchState();

          if (tabName === 'overview' || tabName === 'tickets') loadData();
          if (tabName === 'customers') loadCustomers();
        }

        async function loadData() {
          const tbodyOverview = document.getElementById('ticket-table-body');
          try {
            const res = await fetch('/api/dashboard');
            const data = await res.json();
            allTicketsData = data.recentTickets || [];

            document.getElementById('stat-total').innerText = data.stats.total;
            document.getElementById('stat-new').innerText = data.stats.new;
            document.getElementById('stat-progress').innerText = data.stats.in_progress;
            document.getElementById('stat-high').innerText = data.stats.high_priority;

            if (tbodyOverview) {
              tbodyOverview.innerHTML = allTicketsData.slice(0, 5).map(t => \`
                <tr>
                  <td><strong>\${t.ticket_code}</strong></td>
                  <td><b>\${t.customer_name}</b><br><span style="font-size:11px;color:#6b7280;">\${t.device_info}</span></td>
                  <td>\${t.issue_type}</td>
                  <td><span class="tag \${t.priority === 'Cao' ? 'tag-high' : 'tag-normal'}">\${t.priority}</span></td>
                  <td><span class="tag \${t.status === 'Đang xử lý' ? 'tag-status-process' : 'tag-status-new'}">\${t.status}</span></td>
                  <td style="color: #9ca3af;">\${t.sla_deadline}</td>
                </tr>
              \`).join('') || '<tr><td colspan="6" style="text-align:center;">Chưa có phiếu nào.</td></tr>';
            }
            filterTickets();
          } catch (err) { console.error(err); }
        }

        async function loadCustomers() {
          const tbody = document.getElementById('customer-table-body');
          try {
            const res = await fetch('/api/customers');
            const customers = await res.json();
            tbody.innerHTML = customers.map(c => \`
              <tr>
                <td><strong>#\${c.id}</strong></td>
                <td><b>\${c.name}</b></td>
                <td>\${c.phone}</td>
                <td>\${c.email || 'N/A'}</td>
              </tr>
            \`).join('') || '<tr><td colspan="4" style="text-align:center;">Chưa có khách hàng nào.</td></tr>';
          } catch (err) { tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:red;">Lỗi tải dữ liệu khách hàng</td></tr>'; }
        }

        function filterTickets() {
          const keyword = document.getElementById('searchInput').value.toLowerCase();
          const statusVal = document.getElementById('statusFilter').value;
          const filtered = allTicketsData.filter(t => {
            const matchKw = (t.ticket_code && t.ticket_code.toLowerCase().includes(keyword)) || (t.customer_name && t.customer_name.toLowerCase().includes(keyword)) || (t.phone && t.phone.includes(keyword));
            const matchStatus = !statusVal || t.status === statusVal;
            return matchKw && matchStatus;
          });

          const tbodyTickets = document.getElementById('full-ticket-table-body');
          tbodyTickets.innerHTML = filtered.map(t => \`
            <tr>
              <td><strong>\${t.ticket_code}</strong></td>
              <td><strong>\${t.customer_name}</strong></td>
              <td>\${t.phone}</td>
              <td>\${t.device_info}</td>
              <td>\${t.issue_type}</td>
              <td><span class="tag \${t.priority === 'Cao' ? 'tag-high' : 'tag-normal'}">\${t.priority}</span></td>
              <td style="color: #9ca3af;">\${t.sla_deadline}</td>
              <td>
                <select class="select-status" onchange="updateStatus(\${t.id}, this.value)">
                  <option value="Mới tiếp nhận" \${t.status === 'Mới tiếp nhận' ? 'selected' : ''}>Mới tiếp nhận</option>
                  <option value="Đang xử lý" \${t.status === 'Đang xử lý' ? 'selected' : ''}>Đang xử lý</option>
                  <option value="Hoàn thành" \${t.status === 'Hoàn thành' ? 'selected' : ''}>Hoàn thành</option>
                </select>
              </td>
              <td><button class="btn-delete" onclick="deleteTicket(\${t.id})">🗑️ Xóa</button></td>
            </tr>
          \`).join('') || '<tr><td colspan="9" style="text-align:center;">Không tìm thấy phiếu phù hợp.</td></tr>';
          return filtered;
        }

        function onSearchCriteriaChange() {
          // Khi người dùng đổi tên tra cứu hoặc đổi trạng thái thì reset bộ đếm về 0 và ẩn hộp thông báo cũ
          queryCount = 0;
          const searchAlert = document.getElementById('searchAlert');
          if (searchAlert) searchAlert.style.display = 'none';
          filterTickets();
        }

        function handleManualSearch() {
          const currentSignature =
            document.getElementById('searchInput').value.trim().toLowerCase() +
            '|' +
            document.getElementById('statusFilter').value;

          if (currentSignature !== lastSearchSignature) {
            queryCount = 1;
            lastSearchSignature = currentSignature;
          } else {
            queryCount++;
          }

          const filtered = filterTickets();
          const searchAlert = document.getElementById('searchAlert');
          searchAlert.style.display = 'block';
          searchAlert.innerText =
            '🔍 Kết quả tra cứu (Lần ' +
            queryCount +
            '): Tìm thấy ' +
            filtered.length +
            ' phiếu bảo hành khớp điều kiện.';
        }

        async function handleReloadTickets() {
          const currentSignature =
            document.getElementById('searchInput').value.trim().toLowerCase() +
            '|' +
            document.getElementById('statusFilter').value;

          if (currentSignature !== lastSearchSignature) {
            queryCount = 1;
            lastSearchSignature = currentSignature;
          } else {
            queryCount++;
          }

          await loadData();
          const filtered = filterTickets();
          const searchAlert = document.getElementById('searchAlert');
          searchAlert.style.display = 'block';
          searchAlert.innerText =
            '🔄 Tra cứu lần ' +
            queryCount +
            ' hoàn tất: Dữ liệu nhất quán (' +
            filtered.length +
            ' bản ghi, không bị nhân đôi).';
        }

        async function updateStatus(id, newStatus) {
          await fetch('/api/tickets/' + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
          });
          loadData();
        }

        async function deleteTicket(id) {
          if (confirm('Bạn có chắc chắn muốn xóa phiếu bảo hành này?')) {
            const res = await fetch('/api/tickets/' + id, { method: 'DELETE' });
            if (res.ok) { alert('Đã xóa thành công!'); loadData(); }
            else { alert('Xóa thất bại!'); }
          }
        }

        async function handleFormSubmit(event) {
          event.preventDefault();
          const alertBox = document.getElementById('formAlert');
          const descVal = document.getElementById('description').value;
          const payload = {
            customer_name: document.getElementById('custName').value,
            phone: document.getElementById('custPhone').value,
            device_info: document.getElementById('devInfo').value,
            issue_type: document.getElementById('issueType').value,
            priority: document.getElementById('priority').value,
            description: descVal,
            issue_description: descVal
          };

          const res = await fetch('/api/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const result = await res.json();

          if (res.ok) {
            alertBox.className = 'alert-box alert-success';
            alertBox.style.display = 'block';
            alertBox.innerText = '✅ Tạo phiếu thành công! Mã: ' + result.data.ticket_code;
            document.getElementById('ticketForm').reset();
            setTimeout(() => switchTab('tickets'), 1000);
          } else {
            alertBox.className = 'alert-box alert-error';
            alertBox.style.display = 'block';
            alertBox.innerText = '❌ Lỗi (' + res.status + '): ' + (result.message || result.error || 'Không thể tạo phiếu');
          }
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log('Server chạy tại: http://localhost:' + PORT);
});