# TÀI LIỆU ĐẶC TẢ API CONTRACT
**Đề tài:** Hệ thống Tiếp nhận và Phân loại Bảo hành Thiết bị (Luồng L2)  
**Chuyên ngành:** Kỹ thuật phần mềm (SE)  

---

## 1. Tổng quan
Tài liệu này định nghĩa các RESTful API endpoints cốt lõi phục vụ cho các luồng nghiệp vụ bắt buộc (`MUST`) của hệ thống, bao gồm tra cứu thông tin khách hàng và tạo phiếu bảo hành mới.

- **Base URL:** `https://api.warranty-system.local/v1`
- **Định dạng dữ liệu:** `application/json`
- **Xác thực (Authentication):** Bearer Token (JWT) cho các API yêu cầu phân quyền nhân viên.

---

## 2. Danh sách API Endpoints

### 2.1. Tra cứu thông tin khách hàng theo số điện thoại
* **Endpoint:** `GET /customers/search`
* **Mô tả:** Cho phép nhân viên tiếp nhận nhập số điện thoại để kiểm tra xem khách hàng đã tồn tại trong hệ thống hay chưa trước khi lập phiếu bảo hành.
* **Query Parameters:**
  * `phone` (string, bắt buộc): Số điện thoại cần tra cứu (định dạng 10 chữ số).

#### Phản hồi thành công (HTTP 200 OK)
```json
{
  "success": true,
  "code": 200,
  "message": "Tìm thấy thông tin khách hàng",
  "data": {
    "customerID": "CUST001",
    "fullName": "Nguyễn Văn A",
    "phone": "0901234567",
    "address": "123 Đường Tên Lửa, TP.HCM"
  }
}
