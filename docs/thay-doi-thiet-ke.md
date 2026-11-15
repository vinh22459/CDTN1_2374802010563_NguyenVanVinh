Điểm BT1: 5.5/10 (Đầy đủ: 6.5/10 · Kỹ thuật: 4/10 · Nhất quán: 6/10 · Trình bày: 5.5/10)

Điểm tốt:
- Đặc tả UC3 Tạo phiếu bảo hành mới đầy đủ điều kiện trước/sau, luồng chính 8 bước và luồng ngoại lệ 3a, 7a (trùng Serial đang xử lý) đánh số đúng chuẩn.
- NFR có ngưỡng đo được: NFR1 p95 ≤ 300 ms với 100 người dùng đồng thời, NFR4 RTO ≤ 30 phút.
- SQL DDL 4 bảng có PK, 4 khóa ngoại và UNIQUE cho Phone, SerialNumber.

Cần khắc phục:
- Mục 2 và Mục 4 chỉ dán link drawio, bài nộp không có Use Case Diagram và sơ đồ ERD. Thầy chỉ chấm được những gì có trong PDF.
- Sơ đồ kiến trúc chưa có chú thích, chưa ghi cách các lớp trao đổi và phần NGOÀI PHẠM VI.
- Câu lập luận thứ 3 (Service Pattern vì bảo trì dài hạn) không gắn mã NFR và ngưỡng.
- SRS chưa viết nội dung User Story nào (US1–US7 chỉ có trong bảng truy vết); FR7 có trong bảng truy vết nhưng không có trong danh sách FR; thiếu mục vai trò, quy tắc nghiệp vụ và WON'T.
- Phụ lục AI thiếu dòng cam kết, họ tên, MSSV, ngày; repo thiếu .env.example, commit chủ yếu "Add files via upload".

Gợi ý cho BT2:
- Chèn ảnh xuất từ usecase_l2.drawio và erd.drawio (kèm chú thích) vào tài liệu, viết đủ US1–US7 có tiêu chí chấp nhận để làm cơ sở viết test.

Em đã tiếp thu và hoàn thiện đầy đủ các điểm theo feedback của thầy (cập nhật hình ảnh sơ đồ Use Case/ERD vào file PDF, bổ sung chi tiết nội dung User Stories US1–US7, hoàn thiện các yêu cầu phi chức năng gắn ngưỡng, bổ sung chú thích sơ đồ kiến trúc kèm phần 'Ngoài phạm vi', cũng như cập nhật file .env.example, .env và API Contract lên Git). Em xin gửi lại bài nộp hoàn chỉnh ạ.
Nhận xét Bài tập 2 – Nguyễn Văn Vinh (2374802010563)
Điểm mạnh: Service thuần không có dấu vết HTTP, quy tắc SLA theo mức ưu tiên và chặn trùng thiết bị đang xử lý (409), migration/seed, 5 kiểm thử đủ ba loại, có ảnh ba trạng thái.
Cần khắc phục: Mới có CRUD cho phiếu (chưa có thao tác xoá, chưa có thực thể thứ hai) (S1). Giao diện một trang, chưa đủ 3 màn hình (S4). Chưa có đăng nhập. Lịch sử commit chỉ 5 lần trong 2 ngày.
Mục kiểm chứng (bảng 4.2) chưa đạt: S1 (mới CRUD phiếu, chưa có thực thể thứ hai, chưa có xoá); S4 (giao diện 1 trang, chưa đủ 3 màn hình).
