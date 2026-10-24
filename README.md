# Chuyên đề Tốt nghiệp 1 – Bài tập 1: Phân tích và Thiết kế

## 1. Thông tin dự án

| Thông tin | Nội dung |
|---|---|
| **Đề tài / Case Study** | Smart CRM – Mekong Mobile |
| **Luồng nghiệp vụ** | L2 – Tiếp nhận và phân loại yêu cầu bảo hành |
| **Chuyên ngành (Track)** | Kỹ thuật phần mềm (Software Engineering – SE) |
| **Sinh viên thực hiện** | Nguyễn Văn Vinh |
| **MSSV** | 2374802010563 |
| **Học phần** | Chuyên đề Tốt nghiệp 1 |
| **Bài tập** | Bài tập 1 – Phân tích và Thiết kế |

---

## 2. Giới thiệu dự án và phạm vi

### 2.1. Giới thiệu dự án

Dự án Smart CRM – Mekong Mobile tập trung phân tích và thiết kế hệ thống quản lý quan hệ khách hàng (Customer Relationship Management – CRM), hỗ trợ nhân viên tiếp nhận và quản lý các yêu cầu bảo hành thiết bị.

**Bối cảnh nghiệp vụ:**

Hệ thống hỗ trợ nhân viên thực hiện các công việc sau:

- Tra cứu thông tin khách hàng thông qua số điện thoại.
- Ghi nhận thông tin thiết bị cần bảo hành.
- Tiếp nhận và mô tả tình trạng lỗi của thiết bị.
- Phân loại sự cố và xác định mức độ ưu tiên xử lý.
- Tạo phiếu bảo hành và thiết lập thời hạn cam kết xử lý theo SLA (Service Level Agreement).

### 2.2. Phạm vi thực hiện

Trong khuôn khổ Bài tập 1, dự án tập trung vào các sản phẩm phân tích và thiết kế sau:

- Tài liệu đặc tả yêu cầu phần mềm SRS rút gọn.
- Sơ đồ Use Case cho luồng nghiệp vụ L2.
- Đặc tả chi tiết Use Case, bao gồm luồng chính và luồng ngoại lệ.
- Sơ đồ kiến trúc hệ thống theo mô hình 3 lớp.
- Mô hình dữ liệu ERD gồm 4–6 bảng, xác định khóa chính, khóa ngoại và SQL DDL skeleton.
- Wireframe minh họa 3 màn hình chính của luồng nghiệp vụ.
- API Contract cho các RESTful API cốt lõi.
- Tài liệu khai báo sử dụng công cụ AI và nhật ký điều chỉnh thiết kế.

### 2.3. Ngoài phạm vi (WON'T)

Các chức năng sau không thuộc phạm vi thực hiện:

- Tích hợp cổng thanh toán trực tuyến như VNPay hoặc MoMo.
- Phát triển ứng dụng di động độc lập dành cho khách hàng.
- Tự động nhận diện và phân tích lỗi thiết bị thông qua hình ảnh.
- Tích hợp SMS Gateway để gửi tin nhắn tự động.
- Phát triển các nghiệp vụ CRM khác ngoài luồng L2 đã chọn.

---

## 3. Yêu cầu môi trường (Environment Requirements)

| Thành phần | Công nghệ / Công cụ | Phiên bản / Ghi chú |
|---|---|---|
| Ngôn ngữ lập trình | JavaScript | ES6+ |
| Môi trường chạy | Node.js | v18 trở lên |
| Framework Backend | Express.js | RESTful API |
| Hệ quản trị cơ sở dữ liệu | PostgreSQL | v14 trở lên |
| Công cụ quản lý cơ sở dữ liệu | pgAdmin 4 hoặc DBeaver | Quản lý và truy vấn CSDL |
| Công cụ thiết kế sơ đồ | Draw.io | Định dạng `.drawio` |
| Trình soạn thảo mã nguồn | Visual Studio Code | VS Code |
| Định dạng tài liệu | Markdown | Định dạng `.md` |
| Quản lý phiên bản | Git và GitHub | Quản lý mã nguồn và tài liệu |

---

## 4. Cấu trúc thư mục repository

Cấu trúc thư mục dự án:

```text
CDTN1_2374802010563_NguyenVanVinh/
├── docs/
│   ├── srs.md
│   ├── architecture.drawio
│   ├── usecase_l2.drawio
│   ├── erd.drawio
│   ├── wireframe.png
│   ├── anhminhchung.jpg
│   ├── e2e_proof.png
│   ├── thay-doi-thiet-ke.md
│   ├── ai-disclosure.md
│   └── api-contract.md
├── src/
│   ├── api/
│   │   └── client.js
│   ├── components/
│   │   └── DataState.jsx
│   ├── config/
│   ├── migrations/
│   ├── repositories/
│   │   └── ticketRepository.js
│   ├── routes/
│   │   └── ticketRoutes.js
│   ├── seeds/
│   ├── services/
│   │   └── ticketService.js
│   └── server.js
├── tests/
│   └── ticketService.test.js
├── .gitignore
├── .env.example
├── package.json
├── package-lock.json
└── README.md
```

### 4.1. Mô tả các thành phần

| Tệp / Thư mục | Mục đích |
|---|---|
| `docs/srs.md` | Tài liệu đặc tả yêu cầu phần mềm SRS |
| `docs/architecture.drawio` | Sơ đồ kiến trúc hệ thống |
| `docs/usecase_l2.drawio` | Sơ đồ Use Case của luồng nghiệp vụ L2 |
| `docs/erd.drawio` | Sơ đồ mô hình dữ liệu ERD |
| `docs/wireframe.png` | Hình ảnh wireframe minh họa các màn hình |
| `docs/anhminhchung.jpg` | Hình ảnh minh chứng bổ sung |
| `docs/e2e_proof.png` | Ảnh chụp màn hình minh chứng kết quả chạy End-to-End |
| `docs/thay-doi-thiet-ke.md` | Nhật ký phản hồi và điều chỉnh thiết kế |
| `docs/ai-disclosure.md` | Tài liệu khai báo sử dụng công cụ AI |
| `docs/api-contract.md` | Đặc tả hợp đồng API |
| `src/api/client.js` | Module xử lý gọi API kết nối Backend |
| `src/components/DataState.jsx` | Component xử lý các trạng thái Loading, Empty và Error |
| `src/config/` | Chứa các tệp cấu hình ứng dụng |
| `src/migrations/` | Chứa các tệp migration cơ sở dữ liệu |
| `src/repositories/ticketRepository.js` | Tầng thao tác và truy vấn cơ sở dữ liệu |
| `src/routes/ticketRoutes.js` | Định nghĩa các API endpoint liên quan đến phiếu bảo hành |
| `src/seeds/` | Chứa dữ liệu mẫu phục vụ kiểm thử |
| `src/services/ticketService.js` | Tầng xử lý logic nghiệp vụ phiếu bảo hành |
| `src/server.js` | Tệp khởi chạy máy chủ Express |
| `tests/ticketService.test.js` | Bộ Unit Test kiểm thử logic nghiệp vụ |
| `.gitignore` | Quy định các tệp không đưa vào Git |
| `.env.example` | Mẫu cấu hình biến môi trường |
| `package.json` | Khai báo thông tin dự án, dependencies và scripts |
| `package-lock.json` | Khóa phiên bản các thư viện phụ thuộc |
| `README.md` | Tài liệu giới thiệu và hướng dẫn dự án |

---

## 5. Hướng dẫn cài đặt và chạy ứng dụng

### 5.1. Yêu cầu trước khi cài đặt

Đảm bảo máy tính đã cài đặt:

- Node.js phiên bản 18 trở lên.
- npm đi kèm với Node.js.
- PostgreSQL phiên bản 14 trở lên.
- Git nếu cần tải repository từ GitHub.

### 5.2. Tải dự án

Mở Terminal tại thư mục muốn lưu dự án và chạy:

```bash
git clone <REPOSITORY_URL>
cd CDTN1_2374802010563_NguyenVanVinh
```

Thay `<REPOSITORY_URL>` bằng đường dẫn repository GitHub thực tế.

### 5.3. Cài đặt thư viện

```bash
npm install
```

### 5.4. Cấu hình môi trường

Tạo tệp `.env` dựa trên `.env.example` và cập nhật các thông tin kết nối cơ sở dữ liệu phù hợp với môi trường thực tế.

Không đưa mật khẩu hoặc thông tin xác thực thật lên GitHub.

### 5.5. Chạy Unit Test

```bash
npm test
```

**Tiêu chí kiểm thử:** Tối thiểu 5 Unit Test PASS cho lớp nghiệp vụ `ticketService`, bao gồm các trường hợp giá trị biên và luồng ngoại lệ.

### 5.6. Khởi chạy ứng dụng

```bash
node src/server.js
```

Sau khi máy chủ khởi chạy thành công, mở trình duyệt và truy cập:

```text
http://localhost:3000
```

**Lưu ý:** Các lệnh trên giả định repository đã có đầy đủ mã nguồn, cấu hình, dependencies và scripts tương ứng. Cần kiểm tra `package.json`, cấu hình PostgreSQL và các tệp khởi tạo dữ liệu trước khi chạy.

---

## 6. Tài liệu API Contract

Hệ thống cung cấp các RESTful API phục vụ nghiệp vụ tiếp nhận và quản lý phiếu bảo hành (`WarrantyTicket`).

Các API được tổ chức theo mô hình kiến trúc 3 lớp:

| Lớp | Trách nhiệm |
|---|---|
| Routes / Controller | Tiếp nhận HTTP request, kiểm tra dữ liệu đầu vào và trả về HTTP response |
| Services | Xử lý logic nghiệp vụ, phân loại sự cố, xác định mức độ ưu tiên và thời hạn SLA |
| Repositories | Thực hiện truy vấn và thao tác dữ liệu |

Chi tiết về request, response, HTTP status code và quy tắc kiểm tra dữ liệu được mô tả trong:

`docs/api-contract.md`

Các API cốt lõi phục vụ nghiệp vụ bao gồm:

- Tra cứu thông tin khách hàng.
- Tiếp nhận và tạo phiếu bảo hành.
- Truy vấn danh sách phiếu bảo hành.
- Tìm kiếm và lọc phiếu bảo hành.
- Cập nhật trạng thái phiếu bảo hành.

Danh sách endpoint cụ thể, phương thức HTTP và cấu trúc dữ liệu phải tuân theo nội dung API Contract đã được định nghĩa trong repository.

---

## 7. Trạng thái tiến độ hiện tại (Current Status & Progress)

### 7.1. Các thành phần đã hoàn thành

#### A. Phân tích và thiết kế

- [x] **SRS rút gọn:** Bao gồm bảng thuật ngữ, yêu cầu chức năng, yêu cầu phi chức năng có ngưỡng đo lường và bảng truy vết.
- [x] **Use Case Diagram và đặc tả UC3:** Mô tả luồng chính và các luồng ngoại lệ của nghiệp vụ L2.
- [x] **Sơ đồ kiến trúc 3 lớp:** Thể hiện cấu trúc hệ thống, trách nhiệm các lớp và cách trao đổi dữ liệu.
- [x] **Mô hình dữ liệu ERD và SQL DDL:** Xác định khóa chính, khóa ngoại và cấu trúc bảng.
- [x] **API Contract:** Đặc tả các RESTful API cốt lõi cho `WarrantyTicket`.
- [x] **AI Disclosure và nhật ký điều chỉnh:** Khai báo công cụ AI và ghi nhận các thay đổi thiết kế.

#### B. Mã nguồn và module mở rộng Track SE

- [x] **Ba màn hình Frontend:** Dashboard tổng quan, danh sách phiếu bảo hành có tìm kiếm/lọc và màn hình tiếp nhận yêu cầu tạo phiếu mới kết nối API.
- [x] **Client API và DataState:** Tích hợp `src/api/client.js` và `src/components/DataState.jsx`, xử lý ba trạng thái giao diện Loading, Empty và Error.
- [x] **Luồng End-to-End (E2E):** Chạy thông suốt từ tiếp nhận yêu cầu đến danh sách phiếu và dashboard trên dữ liệu mẫu.
- [x] **Bộ Unit Test:** 5/5 Unit Test PASS cho lớp nghiệp vụ `ticketService`, bao gồm kiểm thử giá trị biên và luồng ngoại lệ.
- [x] **Ảnh minh chứng E2E:** Lưu tại `docs/e2e_proof.png`.
- [x] **Lịch sử commit:** Đạt từ 8 commit trở lên, tuân thủ quy ước Conventional Commits như `feat:`, `fix:`, `docs:`, `test:` và `refactor:`.

### 7.2. Các màn hình giao diện chính

#### 1. Dashboard tổng quan

- Thống kê số lượng phiếu bảo hành theo trạng thái.
- Hiển thị danh sách phiếu được cập nhật gần đây.
- Hỗ trợ nhân viên theo dõi tình hình tiếp nhận và xử lý yêu cầu.

#### 2. Danh sách phiếu bảo hành

- Hiển thị danh sách phiếu bảo hành.
- Hỗ trợ tìm kiếm và lọc phiếu.
- Hiển thị thông tin và trạng thái của từng phiếu.
- Hỗ trợ cập nhật trạng thái theo quyền hạn và quy tắc nghiệp vụ đã xác định.

#### 3. Tiếp nhận yêu cầu – Tạo phiếu mới

- Nhập thông tin khách hàng.
- Ghi nhận thông tin thiết bị.
- Mô tả tình trạng lỗi.
- Phân loại sự cố.
- Xác định mức độ ưu tiên và thời hạn xử lý theo SLA.
- Tạo phiếu bảo hành mới.

**Vị trí lưu tài liệu và minh chứng:**

- Wireframe: `docs/wireframe.png`
- Ảnh minh chứng E2E: `docs/e2e_proof.png`

---

## 8. Tài liệu tham khảo trong repository

Các tài liệu liên quan được tổ chức trong thư mục `docs/`:

| Tài liệu | Đường dẫn |
|---|---|
| SRS – Đặc tả yêu cầu phần mềm | `docs/srs.md` |
| Sơ đồ kiến trúc hệ thống | `docs/architecture.drawio` |
| Sơ đồ Use Case L2 | `docs/usecase_l2.drawio` |
| Sơ đồ ERD | `docs/erd.drawio` |
| Wireframe | `docs/wireframe.png` |
| API Contract | `docs/api-contract.md` |
| Khai báo sử dụng AI | `docs/ai-disclosure.md` |
| Nhật ký thay đổi thiết kế | `docs/thay-doi-thiet-ke.md` |
| Ảnh minh chứng E2E | `docs/e2e_proof.png` |

---

## 9. Cam kết liêm chính học thuật

Sinh viên chịu trách nhiệm kiểm tra tính chính xác, tính nhất quán và khả năng truy vết của các yêu cầu, sơ đồ, tài liệu thiết kế và mã nguồn trước khi nộp bài.

Việc sử dụng công cụ AI được khai báo trong `docs/ai-disclosure.md`. Các nội dung được hỗ trợ bởi AI cần được sinh viên rà soát, hiệu chỉnh và xác nhận phù hợp với đề bài, kiến thức môn học và kết quả thực hiện thực tế.

Các tài liệu và hình ảnh minh chứng được lưu trữ trong repository nhằm hỗ trợ việc kiểm tra, đánh giá và truy vết kết quả thực hiện.

---

## 10. Thông tin sinh viên

| Thông tin | Nội dung |
|---|---|
| **Sinh viên thực hiện** | Nguyễn Văn Vinh |
| **MSSV** | 2374802010563 |
| **Học phần** | Chuyên đề Tốt nghiệp 1 |
| **Case Study** | Smart CRM – Mekong Mobile |
| **Luồng nghiệp vụ** | L2 – Tiếp nhận và phân loại yêu cầu bảo hành |
| **Track** | Software Engineering (SE) |

---

*Smart CRM – Mekong Mobile | Chuyên đề Tốt nghiệp 1 – Bài tập 1: Phân tích và Thiết kế*
