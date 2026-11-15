# BÁO CÁO LỖI HỆ THỐNG (BUG LOG)

## 1. Thông tin chung
* **Dự án:** Hệ thống Tiếp nhận và Phân loại Bảo hành Thiết bị (Luồng L2) - Track SE
* **Môi trường kiểm thử:** Node.js Unit Test (`node:test` / `assert`) kết hợp kiểm thử giao diện Web.
* **Tổng số lỗi phát hiện:** 3 lỗi (1 Major, 2 Critical/Major) tương ứng với 3 test case `TC-06`, `TC-07`, `TC-08`.

---

## 2. Chi tiết các lỗi (Defects)

### BUG-01: Mô tả sự cố vượt quá giới hạn tối đa 500 ký tự không bị chặn (Silent Failure)
1. **Mã lỗi / Defect ID:** BUG-01 (Phát hiện từ `TC-06`)
2. **Mức độ (Severity / Priority):** Major / Cao
3. **Mô tả chi tiết:** Khi người dùng nhập đoạn mô tả sự cố (`issue_description`) dài hơn 500 ký tự (vượt ngưỡng biên trên), hệ thống không báo lỗi, không trả về mã `400 Bad Request` mà giao diện bị đứng im hoặc tiếp nhận dữ liệu thô gây quá tải cơ sở dữ liệu.
4. **Các bước tái hiện (Steps to Reproduce):** 
   - Gọi `ticketService.createTicket()` với `issue_description` chứa chuỗi dài 501 ký tự (`'A'.repeat(501)`).
   - Hoặc trên giao diện web, nhập nội dung mô tả sự cố vượt quá 500 ký tự rồi bấm nút *"Lưu & Tiếp nhận phiếu"*.
5. **Kết quả mong đợi (Expected Result):** Hệ thống phải chặn lại, ném ngoại lệ với `statusCode = 400` và thông báo mô tả tối đa 500 ký tự.
6. **Kết quả thực tế (Actual Result):** Hệ thống không kiểm tra độ dài tối đa, không trả về mã lỗi 400 (`Missing expected rejection`).
7. **Link Commit sửa lỗi:** `<Dán link hoặc mã commit sau khi thực hiện git commit fix BUG-01>`

---

### BUG-02: Cho phép tạo phiếu với mức độ ưu tiên (`priority`) ngoài danh mục hợp lệ
1. **Mã lỗi / Defect ID:** BUG-02 (Phát hiện từ `TC-07`)
2. **Mức độ (Severity / Priority):** Major / Cao
3. **Mô tả chi tiết:** Hàm xử lý nghiệp vụ (`createTicket`) không kiểm tra (validate) giá trị của trường `priority`. Cho phép truyền vào các giá trị tự do không nằm trong danh mục chuẩn của hệ thống (như `['Thấp', 'Thường', 'Cao', 'Khẩn cấp']`).
4. **Các bước tái hiện (Steps to Reproduce):** 
   - Gọi `ticketService.createTicket()` với thuộc tính `priority: 'Siêu Cấp'`.
   - Hoặc can thiệp thẻ `<select>` trên giao diện để gửi giá trị ngoài danh mục rồi bấm Lưu.
5. **Kết quả mong đợi (Expected Result):** Hệ thống từ chối yêu cầu, ném lỗi `statusCode = 400` báo mức độ ưu tiên không hợp lệ.
6. **Kết quả thực tế (Actual Result):** Hệ thống bỏ qua bước kiểm tra danh mục và tạo phiếu thành công (`201 Created`).
7. **Link Commit sửa lỗi:** `<Dán link hoặc mã commit sau khi thực hiện git commit fix BUG-02>`

---

### BUG-03: Lỗ hổng bảo mật XSS — Chưa lọc thẻ mã độc HTML/Script trong dữ liệu đầu vào
1. **Mã lỗi / Defect ID:** BUG-03 (Phát hiện từ `TC-08`)
2. **Mức độ (Severity / Priority):** Critical / Cao
3. **Mô tả chi tiết:** Các trường dữ liệu dạng chuỗi do người dùng cung cấp (như `customer_name`) không được làm sạch (sanitize) hoặc kiểm tra ký tự đặc biệt, tạo cơ hội cho kẻ tấn công chèn mã độc JavaScript/HTML (`<script>alert("hack")</script>`).
4. **Các bước tái hiện (Steps to Reproduce):** 
   - Gọi `ticketService.createTicket()` với `customer_name: '<script>alert("hack")</script>'`.
   - Gửi request trực tiếp lên API endpoint của hệ thống.
5. **Kết quả mong đợi (Expected Result):** Hệ thống phát hiện thẻ script độc hại, từ chối lưu trữ và trả về mã `400 Bad Request`.
6. **Kết quả thực tế (Actual Result):** Hệ thống chấp nhận chuỗi chứa thẻ `<script>` và lưu thẳng vào cơ sở dữ liệu mà không bị chặn.
7. **Link Commit sửa lỗi:** `50a5c7a (HEAD -> main, origin/main) fix(ticket): chong xss va loc the html doc hai (BUG-03)
8d5f58c fix(ticket): validate muc do uu tien priority hop le (BUG-02)
4a9502e fix(ticket): chan mo ta su co vuot qua 500 ky tu (BUG-01)