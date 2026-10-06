# TÀI LIỆU ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS RÚT GỌN)
**Học phần:** Chuyên đề tốt nghiệp 1 – HK1 (2026 – 2027)  
**Đề tài:** Hệ thống Tiếp nhận và Phân loại Bảo hành Thiết bị  
**Luồng nghiệp vụ:** L2 – Tiếp nhận và phân loại yêu cầu bảo hành  
**Sinh viên thực hiện:** Nguyễn Văn Vinh  
**MSSV:** 2374802010563  
**Chuyên ngành (Track):** Kỹ thuật phần mềm (SE)  

---

## 1. GIỚI THIỆU VÀ PHẠM VI

### 1.1 Mục tiêu hệ thống
Hệ thống hỗ trợ nhân viên tiếp nhận tra cứu nhanh khách hàng qua số điện thoại, ghi nhận thông tin thiết bị lỗi, phân loại nhóm sự cố, xác định mức độ ưu tiên và tự động thiết lập phiếu bảo hành kèm thời hạn cam kết trả máy chuẩn xác.

### 1.2 Bảng thuật ngữ nhất quán (Glossary)
| Thuật ngữ | Tên tiếng Anh | Định nghĩa / Quy ước sử dụng |
| :--- | :--- | :--- |
| **Phiếu bảo hành** | Warranty Ticket | Bản ghi chính thức tiếp nhận thiết bị, mã sinh tự động dạng `BH-YYYYMMDD-XXXX`. |
| **Số Serial** | Serial Number | Mã định danh phần cứng duy nhất của thiết bị được bảo hành. |
| **Hạn cam kết** | SLA Due Date | Mốc thời gian dự kiến hoàn thành xử lý thiết bị (+48 giờ làm việc kể từ lúc tạo phiếu). |
| **Nhóm sự cố** | Issue Category | Phân loại kỹ thuật gồm: Phần cứng (Hardware), Phần mềm (Software), Ngoại quan (Cosmetic). |
| **Mức ưu tiên** | Priority Level | Mức độ xử lý gồm: Thấp (Low), Bình thường (Normal), Khẩn cấp (High). |

---

## 2. YÊU CẦU NGƯỜI DÙNG (USER STORIES)

* **US1 [MUST]:** Là nhân viên tiếp nhận, tôi muốn tra cứu khách hàng bằng số điện thoại để xác định lịch sử tiếp nhận và không phải nhập lại thông tin cá nhân.
* **US2 [SHOULD]:** Là nhân viên tiếp nhận, tôi muốn thêm mới hồ sơ khách hàng khi số điện thoại chưa tồn tại để kịp thời lưu thông tin khách hàng mới vào hệ thống.
* **US3 [MUST]:** Là nhân viên tiếp nhận, tôi muốn ghi nhận thông tin thiết bị (tên máy, số serial) và mô tả lỗi để lưu lại hiện trạng ban đầu của thiết bị cần bảo hành.
* **US4 [SHOULD]:** Là nhân viên tiếp nhận, tôi muốn phân loại nhóm sự cố (phần cứng, phần mềm, ngoại quan) để chuyển yêu cầu đến đúng bộ phận kỹ thuật xử lý.
* **US5 [SHOULD]:** Là nhân viên tiếp nhận, tôi muốn xác định mức độ ưu tiên của yêu cầu (Thấp, Bình thường, Khẩn) để điều phối tiến độ xử lý phù hợp với thỏa thuận dịch vụ.
* **US6 [MUST]:** Là nhân viên tiếp nhận, tôi muốn tạo phiếu bảo hành kèm hạn cam kết trả máy tự động để cung cấp mã biên nhận và lịch hẹn chính xác cho khách hàng.
* **US7 [COULD]:** Là quản lý trung tâm, tôi muốn xem danh sách các phiếu bảo hành lọc theo trạng thái và ngày tiếp nhận để theo dõi tiến độ xử lý của toàn bộ trung tâm.
* **US8 [COULD]:** Là nhân viên tiếp nhận, tôi muốn in phiếu biên nhận bảo hành ra bản giấy hoặc xuất PDF để khách hàng ký xác nhận bàn giao thiết bị.

### Tiêu chí chấp nhận (Given-When-Then) cho các Story MUST

#### US1: Tra cứu khách hàng theo số điện thoại
* **GWT1.1 (Luồng chính):**
  * *Given:* Khách hàng có số điện thoại "0901234567" đã tồn tại trên hệ thống.
  * *When:* Nhân viên tiếp nhận nhập "0901234567" vào ô tìm kiếm và bấm "Tra cứu".
  * *Then:* Hệ thống tự động điền họ tên, địa chỉ của khách hàng vào phiếu tiếp nhận.
* **GWT1.2 (Luồng ngoại lệ):**
  * *Given:* Số điện thoại "0999888777" chưa từng được lưu trong cơ sở dữ liệu.
  * *When:* Nhân viên bấm "Tra cứu".
  * *Then:* Hệ thống hiển thị thông báo "Không tìm thấy khách hàng" và mở nút chức năng "Tạo khách hàng mới".

#### US3: Ghi nhận thông tin thiết bị và mô tả lỗi
* **GWT3.1 (Luồng chính):**
  * *Given:* Đã chọn khách hàng hợp lệ và nhân viên nhập tên máy "iPhone 13", số Serial "F17X902KL", mô tả lỗi "Màn hình bị sọc xanh".
  * *When:* Nhân viên bấm "Lưu thông tin thiết bị".
  * *Then:* Dữ liệu máy được ghi nhận và hiển thị tóm tắt trên phiếu tiếp nhận.
* **GWT3.2 (Luồng ngoại lệ):**
  * *Given:* Nhân viên để trống ô "Mô tả lỗi" của thiết bị.
  * *When:* Nhân viên bấm "Lưu thông tin thiết bị".
  * *Then:* Hệ thống giữ nguyên màn hình, hiển thị cảnh báo đỏ "Mô tả lỗi không được để trống" và không cho chuyển sang bước kế tiếp.

#### US6: Tạo phiếu bảo hành và hạn cam kết
* **GWT6.1 (Luồng chính):**
  * *Given:* Đã có đủ thông tin khách hàng, thiết bị, nhóm sự cố và mức ưu tiên "Bình thường".
  * *When:* Nhân viên bấm "Xác nhận tạo phiếu".
  * *Then:* Hệ thống tạo phiếu mới với mã `BH-YYYYMMDD-XXXX`, tự động gán hạn cam kết là +48 giờ làm việc và chuyển trạng thái sang "Chờ xử lý".
* **GWT6.2 (Luồng ngoại lệ):**
  * *Given:* Số Serial của thiết bị vừa nhập trùng với một phiếu bảo hành đang có trạng thái "Đang sửa chữa".
  * *When:* Nhân viên bấm "Xác nhận tạo phiếu".
  * *Then:* Hệ thống chặn tạo phiếu và hiển thị cảnh báo: "Thiết bị có số Serial này đang có phiếu chưa hoàn thành. Vui lòng kiểm tra lại".

---

## 3. SƠ ĐỒ VÀ ĐẶC TẢ USE CASE

### 3.1 Sơ đồ Use Case tổng thể
*File gốc: `docs/usecase_l2.drawio`*
* **Actors:** Nhân viên tiếp nhận (chính), Quản lý trung tâm (phụ).
* **Danh sách Use Case:**
  1. `UC1: Tra cứu thông tin khách hàng`
  2. `UC2: Đăng ký khách hàng mới`
  3. `UC3: Tạo phiếu bảo hành mới` *(Quan trọng nhất)*
  4. `UC4: Phân loại nhóm sự cố và mức ưu tiên`
  5. `UC5: Tra cứu danh sách phiếu bảo hành`
  6. `UC6: Xuất biên nhận bảo hành`

### 3.2 Đặc tả chi tiết Use Case chính: UC3 – Tạo phiếu bảo hành mới
* **Mã Use Case:** UC3
* **Actor:** Nhân viên tiếp nhận
* **Điều kiện tiên quyết:** Nhân viên đã đăng nhập hệ thống; Khách hàng đã được chọn (qua tra cứu hoặc tạo mới).
* **Điều kiện hậu quyết:** Phiếu bảo hành mới được lưu thành công với trạng thái "Chờ xử lý", sinh mã phiếu duy nhất.

#### Luồng chính (Main Flow):
1. Nhân viên chọn khách hàng đã xác định và bấm "Tạo phiếu tiếp nhận mới".
2. Hệ thống hiển thị form nhập thông tin gồm: thiết bị, mô tả lỗi, nhóm sự cố và mức ưu tiên.
3. Nhân viên nhập Tên thiết bị, Số Serial, Tình trạng ngoại quan và Mô tả lỗi chi tiết.
4. Nhân viên chọn Phân loại nhóm sự cố và Mức ưu tiên.
5. Hệ thống tự động tính ngày giờ cam kết hoàn thành (+48 giờ làm việc).
6. Nhân viên kiểm tra và nhấn "Xác nhận tạo phiếu".
7. Hệ thống kiểm tra dữ liệu, lưu phiếu vào cơ sở dữ liệu MongoDB và sinh mã phiếu `BH-YYYYMMDD-XXXX`.
8. Hệ thống thông báo tạo phiếu thành công và hiển thị tóm tắt thông tin phiếu.

#### Luồng ngoại lệ (Exception Flows):
* **3a. Thiếu thông tin bắt buộc:**
  * Tại bước 3, nếu thiếu Tên máy, Số Serial hoặc Mô tả lỗi:
    * Hệ thống dừng lưu, đánh dấu đỏ ô vi phạm và báo: *"Vui lòng điền đầy đủ các thông tin bắt buộc"*.
    * Nhân viên nhập bổ sung và tiếp tục từ bước 3.
* **7a. Thiết bị đang có phiếu bảo hành chưa hoàn tất (Trùng Serial):**
  * Tại bước 7, nếu phát hiện Số Serial đang có phiếu bảo hành ở trạng thái "Chờ xử lý" hoặc "Đang sửa chữa":
    * Hệ thống chặn lưu dữ liệu.
    * Báo lỗi: *"Thiết bị có số Serial này đang trong tiến trình xử lý tại phiếu khác"*.

---

## 4. YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS)

* **FR1:** Hệ thống cho phép tra cứu thông tin khách hàng bằng số điện thoại 10 chữ số.
* **FR2:** Hệ thống cho phép tạo mới hồ sơ khách hàng (họ tên, SĐT, địa chỉ) khi chưa có trên hệ thống.
* **FR3:** Hệ thống cho phép ghi nhận thông tin thiết bị (tên máy, số serial) và mô tả lỗi chi tiết.
* **FR4:** Hệ thống cho phép phân loại sự cố (phần cứng/phần mềm/ngoại quan) và gán mức ưu tiên (thấp/bình thường/khẩn).
* **FR5:** Hệ thống tự động tính hạn cam kết (+48 giờ làm việc) và cấp mã phiếu bảo hành duy nhất `BH-YYYYMMDD-XXXX`.
* **FR6:** Hệ thống cung cấp bộ lọc và hiển thị danh sách phiếu bảo hành theo trạng thái và thời gian.

---

## 5. YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS)

* **NFR1 (Thời gian phản hồi):** API tra cứu khách hàng và tạo phiếu bảo hành phải có thời gian phản hồi đạt **p95 ≤ 300 ms** trong mạng nội bộ.
* **NFR2 (Khả năng chịu tải):** Hệ thống chịu tải đồng thời tối thiểu **≥ 100 người dùng** với tỷ lệ lỗi giao dịch **≤ 0.1%**.
* **NFR3 (Độ sẵn sàng - Availability):** Thời gian hoạt động liên tục (uptime) đạt tối thiểu **≥ 99.5%** trong khung giờ hành chính (08:00 – 18:00 hàng ngày).
* **NFR4 (An toàn & Sao lưu dữ liệu):** Dữ liệu được tự động sao lưu định kỳ **1 lần/ngày** vào lúc 02:00 sáng; thời gian khôi phục dữ liệu (RTO) **≤ 30 phút**.

---

## 6. MA TRẬN TRUY VẾT VÀ ĐẶC TẢ TRACK SE (API CONTRACTS)

### 6.1 Bảng ma trận truy vết (Traceability Matrix)

| Mã FR | Tên yêu cầu chức năng | User Story | Use Case tương ứng | MoSCoW |
| :--- | :--- | :--- | :--- | :--- |
| **FR1** | Tra cứu khách hàng theo SĐT | US1 | UC1 (Tra cứu thông tin khách hàng) | **MUST** |
| **FR2** | Thêm mới thông tin khách hàng | US2 | UC2 (Đăng ký khách hàng mới) | **SHOULD** |
| **FR3** | Ghi nhận thiết bị và lỗi | US3 | UC3 (Tạo phiếu bảo hành mới) | **MUST** |
| **FR4** | Phân loại sự cố & mức ưu tiên | US4, US5 | UC4 (Phân loại nhóm sự cố và mức ưu tiên) | **SHOULD** |
| **FR5** | Tạo phiếu & tính hạn cam kết | US6 | UC3 (Tạo phiếu bảo hành mới) | **MUST** |
| **FR6** | Xem danh sách phiếu bảo hành | US7 | UC5 (Tra cứu danh sách phiếu bảo hành) | **COULD** |

---

### 6.2 Đặc tả API Contract (Dành riêng cho Track SE)

#### Endpoint 1: Tra cứu khách hàng theo SĐT (Map với US1)
* **Method:** `GET`
* **Path:** `/api/v1/customers/search?phone={phone}`
* **Response Thành công (200 OK):**
```json
{
  "status": "success",
  "data": {
    "customerId": "CUST-00912",
    "fullName": "Nguyễn Văn An",
    "phone": "0901234567",
    "address": "736 Nguyễn Trãi, Quận 5, TP.HCM"
  }
}
