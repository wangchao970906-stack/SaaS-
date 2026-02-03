-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    avatar TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted INT DEFAULT 0
);

-- 工作空间表
CREATE TABLE IF NOT EXISTS workspaces (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(10),
    status VARCHAR(20) DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted INT DEFAULT 0
);

-- 工作空间成员表
CREATE TABLE IF NOT EXISTS workspace_members (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    workspace_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    role VARCHAR(20) NOT NULL,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted INT DEFAULT 0
);

-- 产品表
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    workspace_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted INT DEFAULT 0
);

-- 结算订单表
CREATE TABLE IF NOT EXISTS settlement_orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    workspace_id BIGINT NOT NULL,
    product_id BIGINT,
    product_name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted INT DEFAULT 0
);

-- 插入测试数据 (这里直接在 schema 文件里插也可以，或者放 data.sql)
-- 注意: 密码是 'password123' 的 BCrypt 哈希值
MERGE INTO users KEY(email) VALUES (1, 'alex.chen@enterprise.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Alex Chen', 'https://picsum.photos/seed/alex/200', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);
MERGE INTO users KEY(email) VALUES (2, 'test@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Test User', 'https://picsum.photos/seed/test/200', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);

MERGE INTO workspaces KEY(id) VALUES (1, 'Digital Alchemists Co.', 'DA', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);
MERGE INTO workspaces KEY(id) VALUES (2, 'Global Logistics Ltd.', 'GL', 'pending_kyc', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);

MERGE INTO workspace_members KEY(id) VALUES (1, 1, 1, 'Owner', CURRENT_TIMESTAMP, 0);
MERGE INTO workspace_members KEY(id) VALUES (2, 2, 1, 'Admin', CURRENT_TIMESTAMP, 0);

MERGE INTO products KEY(id) VALUES (1, 1, 'Enterprise SaaS Platform', 'Complete enterprise management solution', 9999.00, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);
MERGE INTO products KEY(id) VALUES (2, 1, 'API Gateway Service', 'High-performance API gateway', 4999.00, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);

MERGE INTO settlement_orders KEY(id) VALUES (1, 1, 1, 'Enterprise SaaS Platform', 9999.00, 'completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);
MERGE INTO settlement_orders KEY(id) VALUES (2, 1, 2, 'API Gateway Service', 4999.00, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);
