# API Documentation — Mekong Mobile CRM (Track SE)

## 1. Endpoint: Create Warranty Ticket

- **Method & Path:** `POST /api/tickets`
- **Business Description:** Receives warranty request details, validates input data, automatically calculates SLA due date based on priority, checks for duplicate active devices, and initializes a new ticket.
- **Authentication Requirements:** Public / Session check via client login status.

### Parameters & Request Body

| Parameter | Data Type | Required | Description |
|---|---|---|---|
| `customer_name` | string | Yes | Full name of the customer. |
| `phone` | string | Yes | Exactly 10 numeric digits. |
| `device_info` | string | Yes | Device model and serial/IMEI number. |
| `issue_type` | string | Yes | Category of the issue (e.g., Lỗi phần cứng, Lỗi phần mềm). |
| `priority` | string | No | Priority level (Thường, Cao). Defaults to Thường. |
| `description` | string | Yes | Detailed issue description (between 10 and 500 characters). |

### Success Response (201 Created)

```json
{
  "success": true,
  "data": {
    "id": 101,
    "ticket_code": "TKT-20261116-4821",
    "customer_name": "Nguyen Van Vinh",
    "phone": "0901234567",
    "device_info": "iPhone 15 Pro Max",
    "issue_type": "Lỗi phần cứng",
    "priority": "Thường",
    "status": "Mới tiếp nhận",
    "sla_deadline": "12:00 18/11/2026",
    "isDeleted": false
  }
}
```

### Error Codes

| HTTP Status | Error | Description |
|---|---|---|
| 400 | Bad Request | Missing mandatory fields, invalid phone format, description length violation (<10 or >500 characters), invalid priority value, or XSS payload detected. |
| 409 | Conflict | The specified device is already under active processing in another open ticket. |

**Real Execution Example:** Copied from test run `TC-01`.

---

## 2. Endpoint: Get Dashboard Summary

- **Method & Path:** `GET /api/dashboard`
- **Business Description:** Retrieves statistical overview metrics (total active tickets, new tickets, in-progress tickets, high-priority tickets) and the list of recent active tickets.
- **Authentication Requirements:** Public / Session check.
- **Parameters & Request Body:** None.

### Success Response (200 OK)

```json
{
  "success": true,
  "stats": {
    "total": 5,
    "new": 2,
    "in_progress": 2,
    "high_priority": 1
  },
  "recentTickets": []
}
```

### Error Codes

| HTTP Status | Error | Description |
|---|---|---|
| 500 | Internal Server Error | Database read failure or file system read error. |

**Real Execution Example:** Copied from dashboard load test.

---

## 3. Endpoint: Get Ticket List

- **Method & Path:** `GET /api/tickets`
- **Business Description:** Retrieves all active warranty tickets (excluding soft-deleted ones) with optional query filters.
- **Authentication Requirements:** Public / Session check.

### Parameters & Request Body

Optional query parameters:

- `status`: Filter tickets by status.
- `keyword`: Search tickets by keyword.

### Success Response (200 OK)

Returns an array of ticket objects.

### Error Codes

| HTTP Status | Error | Description |
|---|---|---|
| 500 | Internal Server Error | Internal server error when retrieving ticket data. |

**Real Execution Example:** Copied from ticket list view.

---

## 4. Endpoint: Delete Ticket (Soft Delete)

- **Method & Path:** `DELETE /api/tickets/:id`
- **Business Description:** Performs a soft delete on the specified ticket by setting `isDeleted = true` and updating status to `Đã hủy`, persisting changes to storage.
- **Authentication Requirements:** Public / Session check.

### Parameters & Request Body

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | URL Parameter | Yes | Ticket ID. |

### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Đã xóa phiếu thành công",
  "data": {}
}
```

### Error Codes

| HTTP Status | Error | Description |
|---|---|---|
| 404 | Not Found | Ticket ID does not exist or has already been deleted. |

**Real Execution Example:** Copied from ticket deletion test.

---

## 5. Endpoint: Get Customers List (Second Entity)

- **Method & Path:** `GET /api/customers`
- **Business Description:** Retrieves the list of registered customers in the CRM system (representing the second core entity).
- **Authentication Requirements:** Public / Session check.
- **Parameters & Request Body:** None.

### Success Response (200 OK)

Returns an array of customer objects.

### Error Codes

| HTTP Status | Error | Description |
|---|---|---|
| 500 | Internal Server Error | Internal server error when retrieving customer data. |

**Real Execution Example:** Copied from customer management screen.

---

# AI Disclosure Statement — Phase 3

## 1. AI Tools Declaration

| Tool Name | Purpose of Use | Applied Files / Functions | Verification Method |
|---|---|---|---|
| **ChatGPT / Gemini** | Assisted in drafting Test Plan structure, formatting Markdown tables, and translating technical descriptions into English. | `docs/test-plan.md`, `docs/api-docs.md`, `docs/deployment-guide.md` | Manually reviewed every line, cross-checked against actual code logic, and verified execution results. |
| **GitHub Copilot / AI Code Assistant** | Suggested syntax patterns for input validation and code implementation. | Relevant source code and validation functions. | Reviewed suggestions, checked against project requirements, and executed tests to verify correctness. |

## 2. Verification Commitment

All AI-generated suggestions were reviewed and verified by the student before being included in the project. The student is responsible for the final implementation, documentation accuracy, and test results.