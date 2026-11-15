# Test Plan — Hệ thống Quản lý Bảo hành Mekong Mobile CRM

## 1. Phạm vi kiểm thử và phần chủ ý KHÔNG kiểm (Scope & Out of Scope)

### Trong phạm vi kiểm thử (In-Scope)
- **Luồng tiếp nhận phiếu bảo hành (`createTicket`):** Kiểm chứng quy trình tạo phiếu và tính năng tự động tính hạn cam kết SLA dựa trên mức độ ưu tiên.
- **Quy tắc kiểm tra giá trị biên (Boundary Value):** Kiểm tra cận dưới (độ dài tối thiểu 10 ký tự) và cận trên (độ dài tối đa 500 ký tự) đối với trường mô tả sự cố.
- **Xác thực dữ liệu đầu vào và nghiệp vụ:** Kiểm tra việc chặn các trường bắt buộc bị thiếu, chặn giá trị ưu tiên (`priority`) ngoài danh mục cho phép, và chặn trùng lặp thiết bị đang trong tiến trình xử lý (mã lỗi `409 Conflict`).
- **Bảo mật cơ bản & Chất lượng dữ liệu:** Kiểm thử khả năng chống mã độc XSS (`<script>`) ở dữ liệu đầu vào và đảm bảo tính toàn vẹn (không sinh bản ghi rác) khi giao dịch gặp lỗi.
- **Tính tái lập (Reproducibility):** Kiểm tra sự đồng nhất của dữ liệu truy vấn, đảm bảo không bị nhân đôi sau nhiều lần gọi liên tiếp.

### Chủ ý KHÔNG kiểm thử (Out of Scope)
- Giao diện cấu hình hệ thống nâng cao và các trang quản trị tĩnh không chứa logic nghiệp vụ cốt lõi.
- Kiểm thử tải/hiệu năng (Load/Stress Testing) và kiểm thử xâm nhập nâng cao (Penetration Testing) nằm ngoài phạm vi học phần này.

---

## 2. Loại test và số lượng mỗi tầng (Test Types & Distribution)
Tổng số lượng thực tế: **10 Test Cases**, được phân bổ đầy đủ qua 5 nhóm kiểm thử bắt buộc:

| Nhóm Kiểm Thử | Số lượng | Ký hiệu Test Cases | Mục đích kiểm tra chính |
| :--- | :---: | :--- | :--- |
| **Luồng đúng (Happy Path)** | 1 | `TC-01` | Tạo phiếu thành công và tự động tính SLA |
| **Giá trị biên (Boundary Value)** | 3 | `TC-02`, `TC-03`, `TC-06` | Biên dưới (10 ký tự), dưới biên dưới (9 ký tự), vượt biên trên (501 ký tự) |
| **Dữ liệu sai & Nghiệp vụ (Invalid Data)** | 3 | `TC-04`, `TC-05`, `TC-07` | Thiếu trường, trùng thiết bị xử lý (409), sai danh mục ưu tiên |
| **Bảo mật & Tác dụng phụ (Security)** | 2 | `TC-08`, `TC-09` | Chặn XSS (`<script>`) và toàn vẹn CSDL khi lỗi 409 |
| **Tính tái lập (Reproducibility)** | 1 | `TC-10` | Ổn định dữ liệu, không nhân đôi khi truy vấn liên tiếp |

---

## 3. Tiêu chí thành công ĐO ĐƯỢC (Measurable Success Criteria)
- **Đạt 100% Test Cases:** Toàn bộ 10/10 test cases đạt kết quả thực tế **PASS** (sau khi hoàn tất khắc phục các `BUG-01`, `BUG-02`, `BUG-03`).
- **Độ phủ quy tắc nghiệp vụ:** Mọi quy tắc nghiệp vụ cốt lõi và ràng buộc dữ liệu đều có ít nhất một test case kiểm chứng luồng đúng và giá trị biên rõ ràng.
- **Trạng thái Bug Log:** Không còn tồn đọng bất kỳ lỗi mức độ **Critical** hoặc **Major** nào chưa được sửa chữa.

---

## 4. Môi trường và dữ liệu thử (Environment & Test Data)
- **Môi trường chạy:** Thực thi kiểm thử tự động hoặc thủ công thông qua môi trường Node.js local hoặc container Docker độc lập.
- **Dữ liệu thử & Dọn dẹp:** Sử dụng dữ liệu khởi tạo mẫu chuẩn (`mockDb` / `beforeEach`), thực hiện làm sạch và reset trạng thái trước mỗi lần chạy test nhằm đảm bảo tính khách quan, độc lập và tái lập kết quả chính xác tuyệt đối.