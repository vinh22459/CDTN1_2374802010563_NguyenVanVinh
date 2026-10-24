# Chuyên đề Tốt nghiệp 1 – Bài tập 1: Phân tích và Thiết kế

## Thông tin dự án

- **Đề tài / Case Study:** Smart CRM – Mekong Mobile
- **Luồng nghiệp vụ:** L2 – Tiếp nhận và phân loại yêu cầu bảo hành
- **Chuyên ngành (Track):** Kỹ thuật phần mềm (SE)
- **Sinh viên thực hiện:** Nguyễn Văn Vinh
- **MSSV:** 2374802010563

---

## 1. Giới thiệu dự án và phạm vi

### 1.1. Giới thiệu dự án

Dự án tập trung phân tích và thiết kế hệ thống quản lý quan hệ khách hàng (CRM), hỗ trợ tiếp nhận và xử lý các yêu cầu bảo hành thiết bị tại Mekong Mobile.

**Bối cảnh nghiệp vụ:**

Hệ thống hỗ trợ nhân viên tiếp nhận thực hiện các công việc sau:

- Tra cứu thông tin khách hàng thông qua số điện thoại.
- Ghi nhận thông tin thiết bị cần bảo hành.
- Tiếp nhận và mô tả tình trạng lỗi của thiết bị.
- Phân loại sự cố và xác định mức độ ưu tiên xử lý.
- Tạo phiếu bảo hành và thiết lập thời hạn cam kết xử lý theo SLA.

### 1.2. Phạm vi thực hiện

Trong khuôn khổ Bài tập 1, dự án tập trung vào các sản phẩm phân tích và thiết kế sau:

- Tài liệu đặc tả yêu cầu phần mềm SRS rút gọn.
- Sơ đồ Use Case cho luồng nghiệp vụ L2.
- Đặc tả chi tiết Use Case, bao gồm luồng chính và luồng ngoại lệ.
- Sơ đồ kiến trúc hệ thống theo mô hình 3 lớp.
- Mô hình dữ liệu ERD gồm 4–6 bảng, xác định khóa chính, khóa ngoại và SQL DDL skeleton.
- Wireframe minh họa 3 màn hình chính của luồng nghiệp vụ.
- API Contract cho các RESTful API cốt lõi.
- Tài liệu khai báo sử dụng công cụ AI và nhật ký điều chỉnh thiết kế.

### 1.3. Ngoài phạm vi (WON'T)

Các chức năng sau không thuộc phạm vi thực hiện của Bài tập 1:

- Tích hợp cổng thanh toán trực tuyến như VNPay hoặc MoMo.
- Phát triển ứng dụng di động độc lập dành cho khách hàng.
- Tự động nhận diện và phân tích lỗi thiết bị thông qua hình ảnh.
- Tích hợp SMS Gateway để gửi tin nhắn tự động.
- Phát triển các nghiệp vụ CRM khác ngoài luồng L2 đã chọn.

---

## 2. Yêu cầu môi trường (Environment Requirements)

| Thành phần | Công nghệ / Công cụ | Phiên bản / Ghi chú |
|---|---|---|
| Ngôn ngữ lập trình | JavaScript | ES6+ |
| Môi trường chạy | Node.js | v18 trở lên |
| Framework backend | Express.js | RESTful API |
| Hệ quản trị cơ sở dữ liệu | PostgreSQL | v14 trở lên |
| Công cụ quản lý cơ sở dữ liệu | pgAdmin 4 hoặc DBeaver | Quản lý và truy vấn CSDL |
| Công cụ thiết kế sơ đồ | Draw.io | Định dạng `.drawio` |
| Trình soạn thảo mã nguồn | Visual Studio Code | VS Code |
| Quản lý tài liệu | Markdown | Định dạng `.md` |
| Quản lý phiên bản | Git và GitHub | Lưu trữ mã nguồn, tài liệu |

---

## 3. Cấu trúc thư mục kho lưu trữ (Repository Structure)

Cấu trúc thư mục dự kiến của dự án:

```text
CDTN1_2374802010563_NguyenVanVinh/
├── docs/
│   ├── srs.md
│   ├── architecture.drawio
│   ├── usecase_l2.drawio
│   ├── erd.drawio
│   ├── wireframe.png
│   ├── anhminhchung.jpg
│   ├── thay-doi-thiet-ke.md
│   ├── ai-disclosure.md
│   └── api-contract.md
├── src/
│   ├── routes/
│   ├── services/
│   ├── repositories/
│   └── server.js
├── tests/
├── .gitignore
├── .env.example
└── README.md
```

### 3.1. Mô tả các thành phần

| Tệp / Thư mục | Mục đích |
|---|---|
| `docs/srs.md` | Tài liệu đặc tả yêu cầu phần mềm SRS |
| `docs/architecture.drawio` | Sơ đồ kiến trúc hệ thống |
| `docs/usecase_l2.drawio` | Sơ đồ Use Case của luồng nghiệp vụ L2 |
| `docs/erd.drawio` | Sơ đồ mô hình dữ liệu ERD |
| `docs/wireframe.png` | Hình ảnh Wireframe gồm 3 màn hình |
| `docs/anhminhchung.jpg` | Hình ảnh minh chứng bổ sung |
| `docs/thay-doi-thiet-ke.md` | Nhật ký phản hồi và điều chỉnh thiết kế |
| `docs/ai-disclosure.md` | Tài liệu khai báo sử dụng công cụ AI |
| `docs/api-contract.md` | Đặc tả hợp đồng API cho Track SE |
| `src/` | Cấu trúc mã nguồn backend dự kiến |
| `tests/` | Thư mục chứa các bài kiểm thử |
| `.gitignore` | Quy định các tệp không đưa vào Git |
| `.env.example` | Mẫu cấu hình biến môi trường |
| `README.md` | Tài liệu giới thiệu và hướng dẫn dự án |

**Lưu ý:** Cấu trúc trên là cấu trúc tổ chức kho lưu trữ. Chỉ đưa vào báo cáo những tệp thực tế đã tạo và kiểm tra trong repository.

---

## 4. Hướng dẫn cài đặt và chạy ứng dụng

### 4.1. Yêu cầu trước khi cài đặt

Cần chuẩn bị các thành phần sau:

- Node.js phiên bản 18 trở lên.
- npm đi kèm Node.js.
- PostgreSQL phiên bản 14 trở lên.
- Git để quản lý mã nguồn.

### 4.2. Tải dự án

Mở Terminal hoặc Command Prompt và chạy:

```bash
git clone <GITHUB_REPOSITORY_URL>
cd CDTN1_2374802010563_NguyenVanVinh
```

Thay `<GITHUB_REPOSITORY_URL>` bằng URL repository thực tế.

### 4.3. Cài đặt thư viện

Tại thư mục gốc của dự án, chạy:

```bash
npm install
```

Lệnh này cài đặt các thư viện được khai báo trong `package.json`.

### 4.4. Cấu hình môi trường

Sao chép `.env.example` thành `.env` và cập nhật các thông số kết nối PostgreSQL theo cấu hình thực tế.

Ví dụ:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mekong_mobile_crm
DB_USER=postgres
DB_PASSWORD=your_password
```

Các biến môi trường phải khớp với cách cấu hình kết nối được triển khai trong mã nguồn.

**Lưu ý bảo mật:** Không đưa tệp `.env` chứa mật khẩu hoặc thông tin xác thực thật lên GitHub.

### 4.5. Khởi động ứng dụng

Nếu dự án đã có tệp `src/server.js` và các phần phụ thuộc cần thiết, chạy:

```bash
node src/server.js
```

Sau khi khởi động thành công, truy cập địa chỉ local và cổng được cấu hình trong ứng dụng, ví dụ:

```text
http://localhost:3000
```

**Lưu ý:** Các lệnh trên là hướng dẫn chạy ứng dụng khi phần mã nguồn đã được triển khai. Bài tập phân tích và thiết kế không yêu cầu phải hoàn thành toàn bộ chức năng của hệ thống.

---

## 5. Tài liệu API Contract

Hệ thống dự kiến cung cấp các RESTful API phục vụ nghiệp vụ tiếp nhận và quản lý phiếu bảo hành (`WarrantyTicket`).

Các API được tổ chức theo mô hình kiến trúc 3 lớp:

1. **Routes / Controller:** Tiếp nhận HTTP request, kiểm tra dữ liệu đầu vào và trả về HTTP response.
2. **Services:** Xử lý logic nghiệp vụ, phân loại sự cố, xác định mức độ ưu tiên và thời hạn SLA.
3. **Repositories:** Thực hiện truy vấn và thao tác dữ liệu PostgreSQL.

Chi tiết request, response, HTTP status code và quy tắc kiểm tra dữ liệu được mô tả trong:

[`docs/api-contract.md`](docs/api-contract.md)

---

## 6. Trạng thái tiến độ hiện tại (Current Status & Progress)

### 6.1. Các thành phần đã hoàn thành

Theo trạng thái thực hiện dự án, các hạng mục Bài tập 1 đã được hoàn thiện về nội dung phân tích và thiết kế như sau:

- **SRS rút gọn:** Gồm 6 mục, bảng thuật ngữ, yêu cầu chức năng, yêu cầu phi chức năng có ngưỡng đo lường và bảng truy vết.
- **Use Case Diagram:** Mô tả các tác nhân và chức năng thuộc luồng nghiệp vụ L2.
- **Đặc tả Use Case UC3:** Bao gồm luồng chính và các luồng ngoại lệ.
- **Sơ đồ kiến trúc 3 lớp:** Thể hiện cấu trúc hệ thống, trách nhiệm các lớp, cách trao đổi giữa các thành phần, lập luận thiết kế gắn với yêu cầu phi chức năng và phạm vi không thực hiện.
- **Mô hình dữ liệu ERD:** Gồm 4–6 bảng với khóa chính, khóa ngoại và SQL DDL skeleton.
- **Wireframe:** Thiết kế 3 màn hình phục vụ quy trình tiếp nhận và phân loại yêu cầu bảo hành.
- **API Contract:** Mô tả các API cốt lõi dự kiến cho thực thể `WarrantyTicket`.
- **Tài liệu AI Disclosure:** Khai báo việc sử dụng công cụ AI trong quá trình thực hiện bài tập.
- **Nhật ký điều chỉnh thiết kế:** Ghi nhận phản hồi và các nội dung thay đổi thiết kế.

### 6.2. Các màn hình Wireframe

Ba màn hình chính của quy trình nghiệp vụ gồm:

1. **Tra cứu khách hàng:** Nhập số điện thoại để tìm kiếm thông tin khách hàng.
2. **Tạo phiếu bảo hành:** Nhập thông tin thiết bị, mô tả lỗi, phân loại sự cố và mức độ ưu tiên.
3. **Danh sách phiếu bảo hành:** Hiển thị các phiếu đã tạo cùng trạng thái và thời hạn xử lý.

Hình ảnh Wireframe được lưu tại:

[`docs/wireframe.png`](docs/wireframe.png)

### 6.3. Kết quả dự kiến

Sau khi hoàn thiện Bài tập 1, dự án có bộ tài liệu nền tảng để chuyển sang giai đoạn triển khai tiếp theo, bao gồm:

- Xác định rõ yêu cầu và phạm vi nghiệp vụ.
- Thống nhất các chức năng cốt lõi của luồng L2.
- Làm cơ sở thiết kế cơ sở dữ liệu và API.
- Định hướng triển khai backend theo kiến trúc 3 lớp.
- Hỗ trợ xây dựng các trường hợp kiểm thử từ yêu cầu đã đặc tả.

**Phạm vi Bài tập 1:** Tập trung vào phân tích, đặc tả yêu cầu và thiết kế. Việc hoàn thành tài liệu không đồng nghĩa với việc toàn bộ ứng dụng đã được lập trình, triển khai hoặc kiểm thử thực tế.

---

## 7. Tài liệu tham khảo trong repository

Các tài liệu liên quan được tổ chức trong thư mục `docs/`:

- [SRS – Đặc tả yêu cầu phần mềm](docs/srs.md)
- [Sơ đồ kiến trúc hệ thống](docs/architecture.drawio)
- [Sơ đồ Use Case L2](docs/usecase_l2.drawio)
- [Sơ đồ ERD](docs/erd.drawio)
- [Wireframe](docs/wireframe.png)
- [API Contract](docs/api-contract.md)
- [Khai báo sử dụng AI](docs/ai-disclosure.md)
- [Nhật ký thay đổi thiết kế](docs/thay-doi-thiet-ke.md)

---

## 8. Cam kết liêm chính học thuật

Sinh viên chịu trách nhiệm kiểm tra tính chính xác, tính nhất quán và khả năng truy vết của các yêu cầu, sơ đồ và tài liệu thiết kế trước khi nộp bài.

Việc sử dụng công cụ AI, nếu có, được khai báo trong `docs/ai-disclosure.md`. Các nội dung được hỗ trợ bởi AI cần được sinh viên rà soát, hiệu chỉnh và xác nhận phù hợp với đề bài, kiến thức môn học và kết quả thực hiện thực tế.

---

**Sinh viên thực hiện:** Nguyễn Văn Vinh  
**MSSV:** 2374802010563  
**Học phần:** Chuyên đề Tốt nghiệp 1  
**Bài tập:** Bài tập 1 – Phân tích và Thiết kế  
**Case Study:** Smart CRM – Mekong Mobile  
**Luồng nghiệp vụ:** L2 – Tiếp nhận và phân loại yêu cầu bảo hành  
**Track:** Software Engineering (SE)
