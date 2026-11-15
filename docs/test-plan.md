## Phạm vi kiểm thử & Giới hạn (Scope & Out of Scope)

### 1. Trong phạm vi kiểm thử (In-Scope)
* Kiểm thử chức năng tạo phiếu bảo hành (`createTicket` / form tạo phiếu mới).
* Kiểm thử tính toán hạn mức SLA tự động theo mức độ ưu tiên (`priority`).
* Kiểm thử ràng buộc dữ liệu đầu vào (Độ dài tối thiểu/tối đa, trường bắt buộc, định dạng dữ liệu).
* Kiểm thử quy tắc nghiệp vụ (Chặn trùng lặp thiết bị đang xử lý - trả về mã 409).
* Kiểm thử bảo mật cơ bản (Chống tấn công XSS thông qua thẻ `<script>`).
* Kiểm thử tính tái lập (Reproducibility) và tính ổn định của cơ sở dữ liệu khi truy vấn nhiều lần.

### 2. Chủ ý KHÔNG kiểm thử (Out of Scope)
* **Hiệu năng và tải hệ thống (Performance & Load Testing):** Không kiểm thử chịu tải hàng nghìn request đồng thời (JMeter/K6) do phạm vi bài tập chỉ tập trung vào kiểm thử chức năng và đơn vị (Unit Test / Integration Test).
* **Bảo mật mạng cấp độ hạ tầng (Infrastructure Security):** Không kiểm thử tấn công DDoS, quét lỗ hổng tường lửa (Firewall) hoặc cấu hình bảo mật máy chủ Cloud.
* **Giao diện trên thiết bị di động chuyên biệt (Mobile Responsive Edge Cases):** Không kiểm thử chi tiết trải nghiệm UI/UX trên các dòng máy tính bảng hoặc điện thoại màn hình gập đặc thù.
* **Hệ thống thanh toán hoặc tích hợp bên thứ ba:** Không kiểm thử các cổng thanh toán hay hóa đơn điện tử (vì hệ thống bảo hành hiện tại không có tính năng thanh toán tài chính).