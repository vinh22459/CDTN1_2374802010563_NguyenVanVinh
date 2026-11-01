const express = require('express');
const ticketRoutes = require('./routes/ticketRoutes');
const ticketService = require('./services/ticketService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
        .btn-primary { background-color: #2563eb; color: #fff; border: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s; }
        .btn-primary:hover { background-color: #1d4ed8; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 30px; }
        .card { background-color: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 20px; position: relative; }
        .card-title { font-size: 13px; color: #9ca3af; margin-bottom: 10px; }
        .card-value { font-size: 28px; font-weight: bold; color: #ffffff; margin-bottom: 5px; }
        .card-sub { font-size: 12px; color: #6b7280; }
        .badge-live { position: absolute; top: 15px; right: 15px; font-size: 10px; color: #10b981; }
        .filter-bar { display: flex; gap: 12px; margin-bottom: 20px; }
        .filter-bar input, .filter-bar select { background-color: #111827; border: 1px solid #1f2937; color: #fff; padding: 10px 14px; border-radius: 6px; font-size: 13px; outline: none; }
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
        .form-container { background-color: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 24px; max-width: 800px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .form-group.full-width { grid-column: span 2; }
        .form-group label { font-size: 13px; color: #9ca3af; font-weight: 600; }
        .form-group input, .form-group select, .form-group textarea { background-color: #1f2937; border: 1px solid #374151; color: #ffffff; padding: 12px; border-radius: 6px; font-size: 14px; outline: none; }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #2563eb; }
        .form-actions { display: flex; justify-content: flex-end; gap: 12px; }
        .btn-secondary { background: transparent; color: #9ca3af; border: 1px solid #374151; padding: 10px 18px; border-radius: 6px; cursor: pointer; }
        .alert-box { padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-size: 13px; display: none; }
        .alert-error { background-color: #7f1d1d; color: #fecaca; border: 1px solid #ef4444; }
        .alert-success { background-color: #064e3b; color: #a7f3d0; border: 1px solid #10b981; }
        .retry-btn { background-color: #dc2626; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold; margin-top: 8px; }
        .retry-btn:hover { background-color: #b91c1c; }
      </style>
    </head>
    <body>
      <div class="sidebar">
        <div class="logo">🛡️ Mekong Mobile</div>
        <div class="menu-category">Không gian làm việc</div>
        <a class="menu-item active" id="menu-overview" onclick="switchTab('overview')">📊 Tổng quan</a>
        <a class="menu-item" id="menu-tickets" onclick="switchTab('tickets')">🎫 Phiếu bảo hành</a>
        <a class="menu-item" id="menu-create" onclick="switchTab('create')">📝 Tiếp nhận yêu cầu</a>
      </div>

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

        <!-- PAGE 2: PHIẾU BẢO HÀNH -->
        <div id="page-tickets" class="page">
          <div class="header">
            <div>
              <p class="subtitle">QUẢN LÝ TẬP TRUNG</p>
              <h1 class="title">Danh sách phiếu bảo hành</h1>
            </div>
            <button class="btn-primary" onclick="switchTab('create')">+ Tạo phiếu mới</button>
          </div>

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
                  <th>HẠN SLA</th>
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
            <div id="formAlert" class="alert-box"></div>
            <form id="ticketForm" onsubmit="handleFormSubmit(event)">
              <div class="form-grid">
                <div class="form-group">
                  <label>Tên khách hàng *</label>
                  <input type="text" id="custName" placeholder="Ví dụ: Võ Hoàng Phi Lân" required />
                </div>
                <div class="form-group">
                  <label>Số điện thoại (10 số) *</label>
                  <input type="tel" id="custPhone" placeholder="Ví dụ: 0903999888" required />
                </div>
                <div class="form-group">
                  <label>Thông tin thiết bị (Model / IMEI) *</label>
                  <input type="text" id="devInfo" placeholder="Ví dụ: iPhone 15 Pro Max - IMEI 8899..." required />
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
                  <label>Mức độ ưu tiên (Tự động tính SLA +24h / +48h)</label>
                  <select id="priority">
                    <option value="Thường">Thường (SLA +48 giờ)</option>
                    <option value="Cao">Cao / Khẩn cấp (SLA +24 giờ)</option>
                  </select>
                </div>
                <div class="form-group full-width">
                  <label>Mô tả chi tiết sự cố (Tối thiểu 10 ký tự) *</label>
                  <textarea id="description" rows="4" placeholder="Mô tả chi tiết tình trạng máy khi tiếp nhận (tối thiểu 10 ký tự)..." required></textarea>
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

        function switchTab(tabName) {
          document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
          document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
          document.getElementById('page-' + tabName).classList.add('active');
          document.getElementById('menu-' + tabName).classList.add('active');
          document.getElementById('formAlert').style.display = 'none';

          if (tabName === 'overview' || tabName === 'tickets') {
            loadData();
          }
        }

        async function loadData() {
          const tbodyOverview = document.getElementById('ticket-table-body');
          const tbodyTickets = document.getElementById('full-ticket-table-body');

          // Trạng thái Đang tải (Loading State)
          if (tbodyOverview) tbodyOverview.innerHTML = \`<tr><td colspan="6" style="text-align:center; padding: 25px; color: #3b82f6;">⏳ Đang tải dữ liệu hệ thống...</td></tr>\`;
          if (tbodyTickets) tbodyTickets.innerHTML = \`<tr><td colspan="8" style="text-align:center; padding: 25px; color: #3b82f6;">⏳ Đang tải danh sách phiếu bảo hành...</td></tr>\`;

          try {
            const res = await fetch('/api/dashboard');
            if (!res.ok) throw new Error('Không thể kết nối đến máy chủ API');
            const data = await res.json();
            
            const stats = data.stats || { total: 0, new: 0, in_progress: 0, high_priority: 0 };
            const recentTickets = data.recentTickets || [];
            allTicketsData = recentTickets;

            document.getElementById('stat-total').innerText = stats.total;
            document.getElementById('stat-new').innerText = stats.new;
            document.getElementById('stat-progress').innerText = stats.in_progress;
            document.getElementById('stat-high').innerText = stats.high_priority;

            // Trạng thái Rỗng (Ngữ cảnh 2a: Cơ sở dữ liệu chưa có phiếu nào)
            if (recentTickets.length === 0) {
              if (tbodyOverview) tbodyOverview.innerHTML = \`<tr><td colspan="6" style="text-align:center; padding: 30px; color: #9ca3af;">Hệ thống hiện chưa có phiếu bảo hành nào. <br><button class="btn-primary" style="margin-top:10px;" onclick="switchTab('create')">+ Tạo phiếu mới</button></td></tr>\`;
            } else {
              if (tbodyOverview) {
                tbodyOverview.innerHTML = recentTickets.slice(0, 5).map(t => \`
                  <tr>
                    <td><strong>\${t.ticket_code}</strong></td>
                    <td>
                      <div style="font-weight: bold; color: #fff;">\${t.customer_name}</div>
                      <div style="font-size: 11px; color: #6b7280;">\${t.device_info}</div>
                    </td>
                    <td>\${t.issue_type}</td>
                    <td><span class="tag \${t.priority === 'Cao' ? 'tag-high' : 'tag-normal'}">\${t.priority}</span></td>
                    <td><span class="tag \${getStatusTagClass(t.status)}">\${t.status}</span></td>
                    <td style="color: #9ca3af;">\${t.sla_deadline || t.sla_due_date}</td>
                  </tr>
                \`).join('');
              }
            }

            filterTickets();
          } catch (err) {
            // Trạng thái Lỗi kết nối kèm nút Thử lại (Error State & Retry)
            const errorHtml = \`<tr><td colspan="8" style="text-align:center; padding: 30px; color: #f87171;">
              ❌ Lỗi kết nối hệ thống: Không thể tải dữ liệu từ máy chủ.<br>
              <button class="retry-btn" onclick="loadData()">🔄 Thử lại</button>
            </td></tr>\`;
            if (tbodyOverview) tbodyOverview.innerHTML = errorHtml;
            if (tbodyTickets) tbodyTickets.innerHTML = errorHtml;
          }
        }

        function getStatusTagClass(status) {
          if (status === 'Đang xử lý') return 'tag-status-process';
          if (status === 'Hoàn thành') return 'tag-status-done';
          return 'tag-status-new';
        }

        function filterTickets() {
          const keyword = document.getElementById('searchInput').value.toLowerCase();
          const statusVal = document.getElementById('statusFilter').value;
          const priorityVal = document.getElementById('priorityFilter').value;

          const filtered = allTicketsData.filter(t => {
            const matchKeyword = (t.ticket_code && t.ticket_code.toLowerCase().includes(keyword)) ||
                                 (t.customer_name && t.customer_name.toLowerCase().includes(keyword)) ||
                                 (t.phone && t.phone.includes(keyword));
            const matchStatus = !statusVal || t.status === statusVal;
            const matchPriority = !priorityVal || t.priority === priorityVal;
            return matchKeyword && matchStatus && matchPriority;
          });

          const tbodyTickets = document.getElementById('full-ticket-table-body');
          
          // Trạng thái Rỗng (Ngữ cảnh 2b: Bộ lọc / Tìm kiếm không khớp kết quả)
          if (filtered.length === 0) {
            tbodyTickets.innerHTML = \`<tr><td colspan="8" style="text-align:center; padding: 30px; color: #9ca3af;">Không tìm thấy phiếu bảo hành nào khớp với bộ lọc hiện tại.</td></tr>\`;
            return;
          }

          tbodyTickets.innerHTML = filtered.map(t => \`
            <tr>
              <td><strong>\${t.ticket_code}</strong></td>
              <td style="color: #fff; font-weight: bold;">\${t.customer_name}</td>
              <td>\${t.phone || 'N/A'}</td>
              <td>\${t.device_info}</td>
              <td>
                <div style="font-weight: 600;">\${t.issue_type}</div>
                <div style="font-size: 11px; color: #6b7280;">\${t.description || t.issue_description || ''}</div>
              </td>
              <td><span class="tag \${t.priority === 'Cao' ? 'tag-high' : 'tag-normal'}">\${t.priority}</span></td>
              <td style="color: #9ca3af;">\${t.sla_deadline || t.sla_due_date}</td>
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

        async function updateTicketStatus(id, newStatus) {
          await fetch('/api/tickets/' + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
          });
          loadData();
        }

        async function handleFormSubmit(event) {
          event.preventDefault();
          const alertBox = document.getElementById('formAlert');

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

          const result = await res.json();

          if (res.ok) {
            alertBox.className = 'alert-box alert-success';
            alertBox.style.display = 'block';
            alertBox.innerText = '✅ Tạo phiếu thành công! Mã phiếu: ' + result.data.ticket_code + ' | Hạn SLA: ' + result.data.sla_deadline;
            document.getElementById('ticketForm').reset();
            setTimeout(() => switchTab('tickets'), 1200);
          } else {
            alertBox.className = 'alert-box alert-error';
            alertBox.style.display = 'block';
            alertBox.innerText = '❌ Lỗi (' + res.status + '): ' + (result.message || 'Không thể tạo phiếu!');
          }
        }

        loadData();
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log('Server local đang chạy tại: http://localhost:' + PORT);
});