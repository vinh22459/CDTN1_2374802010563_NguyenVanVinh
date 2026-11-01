# BẢNG KHAI BÁO SỬ DỤNG CÔNG CỤ AI (CẬP NHẬT CHO BÀI TẬP 2)

**Họ tên sinh viên:** Nguyễn Văn Vinh  
**MSSV:** 2374802010563  
**Đề tài:** Hệ thống Tiếp nhận và Phân loại Bảo hành Thiết bị (Luồng L2 - Smart CRM Mekong Mobile)  
**Chuyên ngành (Track):** Kỹ thuật phần mềm (SE)  

---

## 1. Bảng chi tiết sử dụng công cụ AI

| Công cụ | Dùng vào việc gì | Áp dụng ở tệp / hàm nào | Em đã kiểm chứng thế nào |
| :--- | :--- | :--- | :--- |
| **Google Gemini** | Hỗ trợ giải thích kiến trúc phân lớp, gợi ý cấu trúc viết Unit Test và rà soát lỗi cú pháp mã nguồn JavaScript. | `src/services/ticketService.js`, `tests/ticketService.test.js` | Tự viết toàn bộ logic nghiệp vụ; chạy trực tiếp bộ kiểm thử tự động qua lệnh `npm test` để xác nhận đạt kết quả PASS 100%. |
| **ChatGPT** | Hỗ trợ tìm hiểu cơ chế kiểm tra lỗi dữ liệu đầu vào và cú pháp ràng buộc quy tắc nghiệp vụ chặn trùng lặp thiết bị (mã lỗi 409 Conflict). | `src/routes/ticketRoutes.js`, `src/repositories/ticketRepository.js` | Đối chiếu với tài liệu API Contract, thực hiện test gọi API thực tế qua Postman/curl và chạy lại chương trình kiểm chứng. |
| **Google Gemini** | Hỗ trợ rà soát, định dạng lại bố cục báo cáo Markdown (`README.md`), tài liệu thay đổi thiết kế và báo cáo Bài tập 2. | `README.md`, `docs/thay-doi-thiet-ke.md`, `docs/ai-disclosure.md` | Đối chiếu trực tiếp với các chức năng và kết quả chạy thực tế trên hệ thống của đề tài. |

---

## 2. Cách thức kiểm chứng và chịu trách nhiệm
* Toàn bộ mã nguồn, các tầng kiến trúc (`routes` -> `services` -> `repositories`), kịch bản kiểm thử (`tests/`), cơ chế migration/seed và cấu trúc giao diện đều do tác giả trực tiếp xây dựng, chạy thử nghiệm trên môi trường cục bộ và xác thực tính đúng đắn.
* Đã thực hiện đầy đủ phép thử tự kiểm từ thư mục trống theo đúng yêu cầu của giảng viên để đảm bảo hệ thống tái lập và chạy mượt mà bằng lệnh.
* Tác giả chịu hoàn toàn trách nhiệm về tính chính xác, tính logic và toàn vẹn của toàn bộ sản phẩm và mã nguồn nộp trong Bài tập 2.

---

## 3. Cam kết cá nhân
Cam kết tuân thủ nghiêm ngặt quy định về liêm chính học thuật của nhà trường; mọi dòng mã nộp đều đã được hiểu rõ, đọc kỹ và xác thực thực tế.

TP. Hồ Chí Minh, ngày 01 tháng 11 năm 2026  
**Sinh viên thực hiện**

*(Ký và ghi rõ họ tên)*

**VINH**  
**Nguyễn Văn Vinh**  
**MSSV: 2374802010563**