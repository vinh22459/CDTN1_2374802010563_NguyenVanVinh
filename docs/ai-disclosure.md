# BẢNG KHAI BÁO SỬ DỤNG CÔNG CỤ AI (CẬP NHẬT CHO BÀI TẬP 3)

**Họ tên sinh viên:** Nguyễn Văn Vinh  
**MSSV:** 2374802010563  
**Đề tài:** Hệ thống Tiếp nhận và Phân loại Bảo hành Thiết bị (Luồng L2 - Smart CRM Mekong Mobile)  
**Chuyên ngành (Track):** Kỹ thuật phần mềm (SE)  

---

## 1. Bảng chi tiết sử dụng công cụ AI

| Công cụ | Dùng vào việc gì | Áp dụng ở tệp / hàm nào | Em đã kiểm chứng thế nào |
| :--- | :--- | :--- | :--- |
| **Google Gemini** | Hỗ trợ mở rộng kịch bản kiểm thử lên 10 Test Cases (đủ 5 nhóm kiểm thử chuẩn SE) và gợi ý biểu thức chính quy lọc mã độc XSS, kiểm tra biên độ dài mô tả (`BUG-01`, `BUG-02`, `BUG-03`). | `src/services/ticketService.js`, `test/ticketService.test.js` | Tự viết logic kiểm tra; chạy trực tiếp bộ kiểm thử qua lệnh `npm test` xác nhận phát hiện đúng 3 lỗi ban đầu và đạt 10/10 PASS sau khi vá lỗi. |
| **ChatGPT** | Hỗ trợ tìm hiểu cú pháp xóa mềm (`DELETE /api/tickets/:id`), xây dựng tầng định tuyến cho thực thể thứ hai (`Customer`) và tra cứu mã trạng thái HTTP (`400`, `404`, `409`). | `src/routes/ticketRoutes.js`, `src/routes/customerRoutes.js`, `src/repositories/ticketRepository.js` | Đối chiếu với tài liệu API Contract, thực hiện gọi API thực tế qua trình duyệt/cURL và kiểm tra dữ liệu lưu trữ trong `tickets_data.json`. |
| **Google Gemini** | Hỗ trợ tối ưu cấu hình đóng gói container (`Dockerfile`, `docker-compose.yml` kèm cơ chế `healthcheck`) để đáp ứng phép thử máy trắng bằng 2 lệnh. | `Dockerfile`, `docker-compose.yml` | Thực thi trực tiếp lệnh `docker compose down -v` và `docker compose up -d --build` trên Docker Desktop, kiểm tra container lên trạng thái `Started`/`healthy` tại cổng `3000`. |
| **Google Gemini** | Hỗ trợ chuẩn hóa bố cục bảng Markdown và dịch thuật ngữ kỹ thuật sang tiếng Anh cho bộ tài liệu bàn giao Bài tập 3. | `docs/test-plan.md`, `docs/test-report.md`, `docs/bug-log.md`, `docs/deployment-guide.md`, `docs/checklist-bao-mat.md`, `docs/api-docs.md`, `docs/thay-doi-thiet-ke.md` | Rà soát thủ công từng dòng tài liệu, đối chiếu khớp 100% với mã nguồn thực tế, lịch sử commit (`4a9502e`, `8d5f58c`, `50a5c7a`) và kết quả chạy kiểm thử. |

---

## 2. Cách thức kiểm chứng và chịu trách nhiệm
- Toàn bộ mã nguồn, các tầng kiến trúc (`routes` -> `services` -> `repositories`), bộ 10 kịch bản kiểm thử (`test/`), các bản vá lỗi (`BUG-01`, `BUG-02`, `BUG-03`) và cấu hình đóng gói Docker đều do tác giả trực tiếp tích hợp, chạy thử nghiệm trên môi trường cục bộ và xác thực tính đúng đắn.
- Đã thực hiện đầy đủ phép thử đóng gói từ thư mục dự án bằng Docker Compose và kiểm tra toàn bộ 5 API endpoints hoạt động ổn định.
- Tác giả chịu hoàn toàn trách nhiệm về tính chính xác, tính logic và toàn vẹn của toàn bộ sản phẩm, tài liệu kỹ thuật và mã nguồn nộp trong Bài tập 3 (phiên bản `v1.0`).

---

## 3. Cam kết cá nhân
Cam kết tuân thủ nghiêm ngặt quy định về liêm chính học thuật của nhà trường; mọi dòng mã và tài liệu nộp đều đã được hiểu rõ, đọc kỹ và xác thực thực tế.

TP. Hồ Chí Minh, ngày 15 tháng 11 năm 2026  
**Sinh viên thực hiện**

*(Ký và ghi rõ họ tên)*

**VINH**  
**Nguyễn Văn Vinh**  
**MSSV: 2374802010563**