# Tài liệu API Contract - Hệ thống Bảo hành và Phân loại Thiết bị

Tài liệu này định nghĩa các RESTful API endpoints cốt lõi phục vụ cho hệ thống, tuân thủ mô hình 3 lớp (Routes, Services, Repositories) và sử dụng cơ sở dữ liệu PostgreSQL.

- **Base URL**: `http://localhost:3000/api/v1`
- **Định dạng dữ liệu**: `application/json`

---

## Danh sách API Endpoints

### 1. Lấy danh sách tất cả phiếu bảo hành
* **Endpoint:** `GET /tickets`
* **Mô tả:** Truy vấn toàn bộ danh sách các phiếu bảo hành hiện có trong hệ thống, sắp xếp theo thời gian tạo mới nhất.
* **Phản hồi thành công (HTTP 200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "ticketid": "T001",
      "customerid": "C001",
      "deviceid": "D001",
      "staffid": "S001",
      "issuedescription": "Lỗi bàn phím không gõ được",
      "category": "Hardware",
      "priority": "High",
      "status": "Chờ xử lý",
      "sladuedate": "2026-10-25T05:00:00.000Z",
      "createdat": "2026-10-17T13:13:00.797Z"
    }
  ]
}
