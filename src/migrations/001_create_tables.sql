-- 1. Bảng Khách hàng
CREATE TABLE IF NOT EXISTS Customer (
    CustomerID VARCHAR(50) PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    Phone VARCHAR(15) UNIQUE NOT NULL,
    Address TEXT
);

-- 2. Bảng Nhân viên
CREATE TABLE IF NOT EXISTS Staff (
    StaffID VARCHAR(50) PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    Role VARCHAR(50) NOT NULL
);

-- 3. Bảng Thiết bị
CREATE TABLE IF NOT EXISTS Device (
    DeviceID VARCHAR(50) PRIMARY KEY,
    CustomerID VARCHAR(50) NOT NULL,
    DeviceName VARCHAR(100) NOT NULL,
    SerialNumber VARCHAR(100) UNIQUE NOT NULL,
    CONSTRAINT FK_Device_Customer FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

-- 4. Bảng Phiếu bảo hành (Entity chính)
CREATE TABLE IF NOT EXISTS WarrantyTicket (
    TicketID VARCHAR(50) PRIMARY KEY,
    CustomerID VARCHAR(50) NOT NULL,
    DeviceID VARCHAR(50) NOT NULL,
    StaffID VARCHAR(50) NOT NULL,
    IssueDescription TEXT NOT NULL,
    Category VARCHAR(50) NOT NULL,
    Priority VARCHAR(20) NOT NULL,
    Status VARCHAR(20) NOT NULL,
    SLADueDate TIMESTAMP NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Ticket_Customer FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    CONSTRAINT FK_Ticket_Device FOREIGN KEY (DeviceID) REFERENCES Device(DeviceID),
    CONSTRAINT FK_Ticket_Staff FOREIGN KEY (StaffID) REFERENCES Staff(StaffID)
);