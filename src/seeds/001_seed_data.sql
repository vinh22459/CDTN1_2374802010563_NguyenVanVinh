-- Nạp dữ liệu mẫu cho bảng Customer
INSERT INTO Customer (CustomerID, FullName, Phone, Address) VALUES
('C001', 'Nguyễn Văn A', '0901234567', '123 Đường Nguyễn Trãi, Quận 1, TP.HCM'),
('C002', 'Trần Thị B', '0987654321', '456 Đường Lê Văn Việt, TP. Thủ Đức');

-- Nạp dữ liệu mẫu cho bảng Staff
INSERT INTO Staff (StaffID, FullName, Role) VALUES
('S001', 'Kỹ thuật viên 1', 'Hardware Technician'),
('S002', 'Kỹ thuật viên 2', 'Software Technician');

-- Nạp dữ liệu mẫu cho bảng Device
INSERT INTO Device (DeviceID, CustomerID, DeviceName, SerialNumber) VALUES
('D001', 'C001', 'MacBook Pro M2', 'C02G123456'),
('D002', 'C002', 'Dell XPS 13', 'DLXPS9310');

-- Nạp dữ liệu mẫu cho bảng WarrantyTicket (Entity chính)
INSERT INTO WarrantyTicket (TicketID, CustomerID, DeviceID, StaffID, IssueDescription, Category, Priority, Status, SLADueDate) VALUES
('T001', 'C001', 'D001', 'S001', 'Lỗi bàn phím không gõ được', 'Hardware', 'High', 'Chờ xử lý', '2026-10-25 12:00:00');