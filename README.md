# Smart CRM – Mekong Mobile
## Chuyên đề Tốt nghiệp 1 – Bài tập 1 & Bài tập 2

## 1. Thông tin dự án

| Thông tin | Nội dung |
|---|---|
| **Đề tài / Case Study** | Smart CRM – Mekong Mobile |
| **Luồng nghiệp vụ** | L2 – Tiếp nhận và phân loại yêu cầu bảo hành |
| **Chuyên ngành (Track)** | Kỹ thuật phần mềm (Software Engineering – SE) |
| **Sinh viên thực hiện** | Nguyễn Văn Vinh |
| **MSSV** | 2374802010563 |
| **Học phần** | Chuyên đề Tốt nghiệp 1 |
| **Bài tập** | Bài tập 1 – Phân tích và Thiết kế; Bài tập 2 – Hiện thực hóa Module Cốt Lõi |
| **Phiên bản (Tag)** | v0.2 |

---

## 2. Giới thiệu dự án và phạm vi

### 2.1. Giới thiệu dự án

Dự án Smart CRM – Mekong Mobile tập trung phân tích, thiết kế và hiện thực hóa hệ thống quản lý quan hệ khách hàng (Customer Relationship Management – CRM), hỗ trợ nhân viên tiếp nhận và quản lý các yêu cầu bảo hành thiết bị.

Hệ thống hỗ trợ nhân viên thực hiện các công việc sau:

- Tra cứu thông tin khách hàng thông qua số điện thoại.
- Ghi nhận thông tin thiết bị cần bảo hành.
- Tiếp nhận và mô tả tình trạng lỗi của thiết bị.
- Phân loại sự cố và xác định mức độ ưu tiên xử lý.
- Tạo phiếu bảo hành và thiết lập thời hạn cam kết xử lý theo SLA (Service Level Agreement).
- Theo dõi danh sách và trạng thái phiếu bảo hành.
- Quản lý tiến độ tiếp nhận và xử lý yêu cầu bảo hành.

### 2.2. Phạm vi thực hiện

**Bài tập 1 – Phân tích và Thiết kế**

Tập trung xây dựng các sản phẩm phân tích và thiết kế hệ thống:

- Tài liệu đặc tả yêu cầu phần mềm SRS rút gọn.
- Sơ đồ Use Case cho luồng nghiệp vụ L2.
- Đặc tả chi tiết Use Case, bao gồm luồng chính và luồng ngoại lệ.
- Sơ đồ kiến trúc hệ thống theo mô hình 3 lớp.
- Mô hình dữ liệu ERD gồm 4–6 bảng, xác định khóa chính, khóa ngoại và SQL DDL skeleton.
- Wireframe minh họa 3 màn hình chính của luồng nghiệp vụ.
- API Contract cho các RESTful API cốt lõi.
- Tài liệu khai báo sử dụng công cụ AI và nhật ký điều chỉnh thiết kế.

**Bài tập 2 – Hiện thực hóa Module Cốt Lõi**

Tiếp tục phát triển từ kết quả phân tích và thiết kế của BT1:

- Hiện thực hóa kiến trúc hệ thống 3 lớp.
- Xây dựng Backend sử dụng Node.js và Express.js.
- Tích hợp cơ sở dữ liệu PostgreSQL.
- Hiện thực các API phục vụ nghiệp vụ quản lý phiếu bảo hành.
- Xây dựng các quy tắc nghiệp vụ tự động như tính hạn SLA và kiểm tra trùng lặp thiết bị.
- Kiểm soát dữ liệu đầu vào và xử lý lỗi nghiệp vụ.
- Xây dựng giao diện Frontend gồm Dashboard, danh sách phiếu bảo hành và màn hình tạo phiếu mới.
- Tích hợp Client API và component xử lý các trạng thái Loading, Empty, Error.
- Xây dựng bộ Unit Test cho tầng nghiệp vụ.
- Kiểm thử luồng End-to-End (E2E) trên dữ liệu mẫu.
- Hoàn thiện tài liệu kỹ thuật, minh chứng kiểm thử và lịch sử quản lý phiên bản Git.

### 2.3. Ngoài phạm vi (WON'T)

Các chức năng sau không thuộc phạm vi thực hiện:

- Tích hợp cổng thanh toán trực tuyến như VNPay hoặc MoMo.
- Phát triển ứng dụng di động độc lập dành cho khách hàng.
- Tự động nhận diện và phân tích lỗi thiết bị thông qua hình ảnh.
- Tích hợp SMS Gateway để gửi tin nhắn tự động.
- Phát triển các nghiệp vụ CRM khác ngoài luồng L2 đã chọn.

---

## 3. Yêu cầu môi trường (Environment Requirements)

Để cài đặt, kiểm thử và vận hành hệ thống, môi trường cần đáp ứng:

| Thành phần | Công nghệ / Công cụ | Phiên bản / Ghi chú |
|---|---|---|
| Ngôn ngữ lập trình | JavaScript | ES6+ |
| Môi trường chạy | Node.js | v18 trở lên |
| Trình quản lý thư viện | npm | Đi kèm Node.js |
| Framework Backend | Express.js | RESTful API |
| Hệ quản trị cơ sở dữ liệu | PostgreSQL | v14 trở lên |
| Công cụ quản lý CSDL | pgAdmin 4 hoặc DBeaver | Quản lý và truy vấn CSDL |
| Công cụ thiết kế sơ đồ | Draw.io | Định dạng `.drawio` |
| Trình soạn thảo mã nguồn | Visual Studio Code | VS Code |
| Định dạng tài liệu | Markdown | Định dạng `.md` |
| Quản lý phiên bản | Git và GitHub | Quản lý mã nguồn và tài liệu |
| Kiểm thử | Node.js Test Runner hoặc công cụ được cấu hình trong dự án | Chạy Unit Test |

---

## 4. Cấu trúc thư mục repository

Cấu trúc thư mục dự án:

```text
CDTN1_2374802010563_NguyenVanVinh/
├── docs/
│   ├── srs.md
│   ├── architecture.drawio
│   ├── architecture-thuc-te.md
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
| `docs/architecture.drawio` | Sơ đồ kiến trúc hệ thống được thiết kế ở BT1 |
| `docs/architecture-thuc-te.md` | Mô tả kiến trúc hệ thống thực tế sau khi hiện thực hóa |
| `docs/usecase_l2.drawio` | Sơ đồ Use Case của luồng nghiệp vụ L2 |
| `docs/erd.drawio` | Sơ đồ mô hình dữ liệu ERD |
| `docs/wireframe.png` | Hình ảnh wireframe minh họa các màn hình |
| `docs/anhminhchung.jpg` | Hình ảnh minh chứng bổ sung |
| `docs/e2e_proof.png` | Ảnh chụp màn hình minh chứng kết quả kiểm thử E2E |
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
git clone https://github.com/vinh22459/CDTN1_2374802010563_NguyenVanVinh.git
cd CDTN1_2374802010563_NguyenVanVinh
```

Để sử dụng phiên bản nộp bài BT2, checkout tag:

```bash
git checkout v0.2
```

### 5.3. Cài đặt thư viện

```bash
npm install
```

Lệnh này cài đặt các thư viện phụ thuộc được khai báo trong `package.json` và `package-lock.json`.

### 5.4. Cấu hình môi trường

Tạo tệp `.env` dựa trên `.env.example`:

```bash
cp .env.example .env
```

Sau đó cập nhật thông tin kết nối cơ sở dữ liệu PostgreSQL phù hợp với môi trường thực tế.

**Lưu ý bảo mật:**

- Không đưa tệp `.env` lên GitHub.
- Không công khai mật khẩu cơ sở dữ liệu hoặc thông tin xác thực.
- Chỉ sử dụng `.env.example` để cung cấp cấu trúc biến môi trường mẫu.

### 5.5. Khởi tạo cơ sở dữ liệu (Migration và Seed)

Sau khi cấu hình PostgreSQL và các biến môi trường, thực hiện:

```bash
npm run migrate
npm run seed
```

Trong đó:

- `npm run migrate`: Khởi tạo hoặc cập nhật cấu trúc bảng trong cơ sở dữ liệu.
- `npm run seed`: Nạp dữ liệu mẫu phục vụ kiểm thử và trải nghiệm hệ thống.

Các lệnh trên yêu cầu repository đã được cấu hình scripts tương ứng trong `package.json`.

### 5.6. Chạy Unit Test

Thực hiện lệnh:

```bash
npm test
```

Bộ kiểm thử tập trung vào tầng nghiệp vụ `ticketService`, bao gồm:

- Kiểm thử tạo phiếu bảo hành hợp lệ.
- Kiểm thử tính toán thời hạn SLA.
- Kiểm thử dữ liệu đầu vào không hợp lệ.
- Kiểm thử trường hợp thiết bị bị trùng lặp.
- Kiểm thử các giá trị biên và luồng ngoại lệ.

**Tiêu chí kiểm thử:** Bộ Unit Test có 5 trường hợp kiểm thử và mục tiêu đạt kết quả 5/5 PASS.

Chạy lại bộ kiểm thử để kiểm tra tính ổn định và khả năng tái lập kết quả.

### 5.7. Khởi chạy ứng dụng

Sau khi hoàn tất cài đặt thư viện và khởi tạo cơ sở dữ liệu, chạy:

```bash
node src/server.js
```

Sau khi máy chủ khởi chạy thành công, mở trình duyệt và truy cập:

```text
http://localhost:3000
```

**Lưu ý:** Các lệnh trên giả định repository đã có đầy đủ mã nguồn, cấu hình, dependencies và scripts tương ứng. Cần kiểm tra `package.json`, cấu hình PostgreSQL và các tệp khởi tạo dữ liệu trước khi chạy.

---

## 6. Tài liệu API Contract và quy tắc nghiệp vụ

### 6.1. Kiến trúc API

Hệ thống cung cấp các RESTful API phục vụ nghiệp vụ tiếp nhận và quản lý phiếu bảo hành (`WarrantyTicket`).

Các API được tổ chức theo mô hình kiến trúc 3 lớp:

| Lớp | Trách nhiệm |
|---|---|
| Routes / Controller | Tiếp nhận HTTP request, kiểm tra dữ liệu đầu vào và trả về HTTP response |
| Services | Xử lý logic nghiệp vụ, phân loại sự cố, xác định mức độ ưu tiên và thời hạn SLA |
| Repositories | Thực hiện truy vấn và thao tác dữ liệu |

Các API cốt lõi phục vụ nghiệp vụ bao gồm:

- Tra cứu thông tin khách hàng.
- Tiếp nhận và tạo phiếu bảo hành.
- Truy vấn danh sách phiếu bảo hành.
- Tìm kiếm và lọc phiếu bảo hành.
- Cập nhật trạng thái phiếu bảo hành.

Chi tiết về request, response, HTTP status code và quy tắc kiểm tra dữ liệu được mô tả trong:

`docs/api-contract.md`

### 6.2. Các quy tắc nghiệp vụ cốt lõi được hiện thực hóa ở BT2

**1. Tự động tính hạn cam kết SLA (`calculateSLADueDate`)**

Khi tạo phiếu bảo hành mới, hệ thống tự động xác định thời hạn hoàn thành dựa trên mức độ ưu tiên (`priority`):

| Mức độ ưu tiên | Thời hạn xử lý |
|---|---|
| Thường (Normal) | Cộng thêm 48 giờ |
| Cao (High) | Cộng thêm 24 giờ |
| Khẩn cấp (Urgent) | Cộng thêm 24 giờ |

Quy tắc này giúp hệ thống tự động thiết lập thời hạn cam kết xử lý cho từng phiếu bảo hành.

**2. Chặn trùng lặp thiết bị đang xử lý**

Trước khi lưu phiếu bảo hành mới, hệ thống kiểm tra thông tin thiết bị (`device_info`).

Nếu thiết bị đã tồn tại trong một phiếu bảo hành khác ở trạng thái chưa hoàn tất, hệ thống từ chối tạo phiếu mới và trả về:

`409 Conflict`

Mục đích là tránh tạo nhiều phiếu bảo hành trùng lặp cho cùng một thiết bị khi yêu cầu trước đó vẫn đang được xử lý.

**3. Kiểm soát dữ liệu đầu vào (Input Validation)**

Hệ thống kiểm tra các trường dữ liệu bắt buộc trước khi thực hiện thao tác tạo phiếu.

Một số trường hợp bị từ chối:

- Thiếu thông tin bắt buộc.
- Dữ liệu không đúng định dạng.
- Mô tả sự cố ngắn hơn 10 ký tự.
- Giá trị đầu vào không đáp ứng các quy tắc nghiệp vụ.

Khi dữ liệu không hợp lệ, hệ thống trả về:

`400 Bad Request`

### 6.3. Xử lý trạng thái giao diện

Frontend tích hợp `src/api/client.js` và `src/components/DataState.jsx` để xử lý các trạng thái:

- **Loading:** Hiển thị khi hệ thống đang tải dữ liệu từ API.
- **Empty:** Hiển thị khi không có dữ liệu phù hợp.
- **Error:** Hiển thị khi xảy ra lỗi trong quá trình gọi API hoặc xử lý dữ liệu.

Việc xử lý đầy đủ các trạng thái giúp giao diện phản hồi rõ ràng hơn khi kết nối với Backend.

---

## 7. Trạng thái tiến độ hiện tại (Current Status & Progress)

### 7.1. Bài tập 1 – Phân tích và thiết kế

#### A. Phân tích và thiết kế

- [x] **SRS rút gọn:** Bao gồm bảng thuật ngữ, yêu cầu chức năng, yêu cầu phi chức năng có ngưỡng đo lường và bảng truy vết.
- [x] **Use Case Diagram và đặc tả UC3:** Mô tả luồng chính và các luồng ngoại lệ của nghiệp vụ L2.
- [x] **Sơ đồ kiến trúc 3 lớp:** Thể hiện cấu trúc hệ thống, trách nhiệm các lớp và cách trao đổi dữ liệu.
- [x] **Mô hình dữ liệu ERD và SQL DDL:** Xác định khóa chính, khóa ngoại và cấu trúc bảng.
- [x] **API Contract:** Đặc tả các RESTful API cốt lõi cho `WarrantyTicket`.
- [x] **AI Disclosure và nhật ký điều chỉnh:** Khai báo công cụ AI và ghi nhận các thay đổi thiết kế.

### 7.2. Bài tập 2 – Hiện thực hóa module cốt lõi

#### A. Mã nguồn và kiến trúc

- [x] **Kiến trúc 3 lớp:** Hiện thực các tầng Routes, Services và Repositories.
- [x] **Backend:** Xây dựng hệ thống RESTful API sử dụng Node.js và Express.js.
- [x] **Database:** Tích hợp PostgreSQL và tổ chức migration, seed dữ liệu.
- [x] **Business Logic:** Hiện thực các quy tắc nghiệp vụ liên quan đến phiếu bảo hành.
- [x] **Validation:** Kiểm tra dữ liệu đầu vào và xử lý lỗi nghiệp vụ.

#### B. Frontend và tích hợp hệ thống

- [x] **Ba màn hình Frontend:** Dashboard tổng quan, danh sách phiếu bảo hành có tìm kiếm/lọc và màn hình tiếp nhận yêu cầu tạo phiếu mới kết nối API.
- [x] **Client API và DataState:** Tích hợp `src/api/client.js` và `src/components/DataState.jsx`, xử lý ba trạng thái giao diện Loading, Empty và Error.
- [x] **Luồng End-to-End (E2E):** Chạy thông suốt từ tiếp nhận yêu cầu đến danh sách phiếu và dashboard trên dữ liệu mẫu.
- [x] **Ảnh minh chứng E2E:** Lưu tại `docs/e2e_proof.png`.

#### C. Kiểm thử và quản lý phiên bản

- [x] **Bộ Unit Test:** 5/5 Unit Test PASS cho lớp nghiệp vụ `ticketService`, bao gồm kiểm thử giá trị biên và luồng ngoại lệ.
- [x] **Kiểm thử nghiệp vụ SLA:** Kiểm tra việc tự động tính hạn xử lý theo mức độ ưu tiên.
- [x] **Kiểm thử chống trùng lặp:** Kiểm tra trường hợp thiết bị đang có phiếu chưa hoàn tất.
- [x] **Kiểm thử Validation:** Kiểm tra các trường hợp dữ liệu thiếu hoặc không hợp lệ.
- [x] **Lịch sử commit:** Đạt từ 8 commit trở lên, tuân thủ quy ước Conventional Commits như `feat:`, `fix:`, `docs:`, `test:` và `refactor:`.
- [x] **Phiên bản nộp bài:** Đánh dấu phiên bản `v0.2`.

### 7.3. Các màn hình giao diện chính

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
- Unit Test: `tests/ticketService.test.js`

---

## 8. Tài liệu tham khảo trong repository

Các tài liệu liên quan được tổ chức trong thư mục `docs/`:

| Tài liệu | Đường dẫn |
|---|---|
| SRS – Đặc tả yêu cầu phần mềm | `docs/srs.md` |
| Sơ đồ kiến trúc hệ thống thiết kế | `docs/architecture.drawio` |
| Kiến trúc hệ thống thực tế | `docs/architecture-thuc-te.md` |
| Sơ đồ Use Case L2 | `docs/usecase_l2.drawio` |
| Sơ đồ ERD | `docs/erd.drawio` |
| Wireframe | `docs/wireframe.png` |
| API Contract | `docs/api-contract.md` |
| Khai báo sử dụng AI | `docs/ai-disclosure.md` |
| Nhật ký thay đổi thiết kế | `docs/thay-doi-thiet-ke.md` |
| Ảnh minh chứng E2E | `docs/e2e_proof.png` |

Các thành phần mã nguồn quan trọng:

| Thành phần | Đường dẫn |
|---|---|
| API Client | `src/api/client.js` |
| DataState Component | `src/components/DataState.jsx` |
| Ticket Repository | `src/repositories/ticketRepository.js` |
| Ticket Routes | `src/routes/ticketRoutes.js` |
| Ticket Service | `src/services/ticketService.js` |
| Server | `src/server.js` |
| Unit Test | `tests/ticketService.test.js` |
| Package Configuration | `package.json` |
| Environment Example | `.env.example` |

---

## 9. Cam kết liêm chính học thuật và sử dụng AI

Sinh viên chịu trách nhiệm kiểm tra tính chính xác, tính nhất quán và khả năng truy vết của các yêu cầu, sơ đồ, tài liệu thiết kế và mã nguồn trước khi nộp bài.

Việc sử dụng công cụ AI được khai báo trong `docs/ai-disclosure.md`.

Các nội dung được hỗ trợ bởi AI cần được sinh viên rà soát, hiệu chỉnh và xác nhận phù hợp với đề bài, kiến thức môn học và kết quả thực hiện thực tế.

Mã nguồn và tài liệu được xây dựng, kiểm tra và hoàn thiện theo yêu cầu của học phần Chuyên đề Tốt nghiệp 1.

Các tài liệu, mã nguồn và hình ảnh minh chứng được lưu trữ trong repository nhằm hỗ trợ việc kiểm tra, đánh giá và truy vết kết quả thực hiện.

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
| **Phạm vi tài liệu** | Bài tập 1 và Bài tập 2 |
| **Phiên bản** | v0.2 |

---

*Smart CRM – Mekong Mobile | Chuyên đề Tốt nghiệp 1 – Bài tập 1 & Bài tập 2*
