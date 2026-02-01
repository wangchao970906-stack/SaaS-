-- 创建数据库
CREATE DATABASE IF NOT EXISTS enterprise_saas DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE enterprise_saas;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE COMMENT '邮箱',
    password_hash VARCHAR(255) NOT NULL COMMENT '密码哈希',
    name VARCHAR(100) NOT NULL COMMENT '姓名',
    avatar TEXT COMMENT '头像URL',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted INT DEFAULT 0 COMMENT '逻辑删除标记',
    INDEX idx_email (email),
    INDEX idx_deleted (deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 工作空间表
CREATE TABLE IF NOT EXISTS workspaces (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL COMMENT '工作空间名称',
    logo VARCHAR(10) COMMENT 'Logo缩写',
    status VARCHAR(20) DEFAULT 'active' COMMENT '状态: active, pending_kyc, suspended',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted INT DEFAULT 0 COMMENT '逻辑删除标记',
    INDEX idx_status (status),
    INDEX idx_deleted (deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工作空间表';

-- 工作空间成员表
CREATE TABLE IF NOT EXISTS workspace_members (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    workspace_id BIGINT NOT NULL COMMENT '工作空间ID',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    role VARCHAR(20) NOT NULL COMMENT '角色: Owner, Admin, Operator, Finance',
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '加入时间',
    deleted INT DEFAULT 0 COMMENT '逻辑删除标记',
    INDEX idx_workspace_id (workspace_id),
    INDEX idx_user_id (user_id),
    INDEX idx_deleted (deleted),
    UNIQUE KEY uk_workspace_user (workspace_id, user_id, deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工作空间成员表';

-- 产品表
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    workspace_id BIGINT NOT NULL COMMENT '工作空间ID',
    name VARCHAR(255) NOT NULL COMMENT '产品名称',
    description TEXT COMMENT '产品描述',
    price DECIMAL(10, 2) DEFAULT 0.00 COMMENT '价格',
    status VARCHAR(20) DEFAULT 'active' COMMENT '状态: active, inactive',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted INT DEFAULT 0 COMMENT '逻辑删除标记',
    INDEX idx_workspace_id (workspace_id),
    INDEX idx_status (status),
    INDEX idx_deleted (deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='产品表';

-- 结算订单表
CREATE TABLE IF NOT EXISTS settlement_orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    workspace_id BIGINT NOT NULL COMMENT '工作空间ID',
    product_id BIGINT COMMENT '产品ID',
    product_name VARCHAR(255) NOT NULL COMMENT '产品名称',
    amount DECIMAL(10, 2) NOT NULL COMMENT '金额',
    status VARCHAR(20) DEFAULT 'pending' COMMENT '状态: pending, processing, completed, failed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted INT DEFAULT 0 COMMENT '逻辑删除标记',
    INDEX idx_workspace_id (workspace_id),
    INDEX idx_product_id (product_id),
    INDEX idx_status (status),
    INDEX idx_deleted (deleted)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='结算订单表';

-- 插入测试数据
-- 注意: 密码是 'password123' 的 BCrypt 哈希值
INSERT INTO users (email, password_hash, name, avatar) VALUES
('alex.chen@enterprise.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Alex Chen', 'https://picsum.photos/seed/alex/200'),
('test@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Test User', 'https://picsum.photos/seed/test/200');

INSERT INTO workspaces (name, logo, status) VALUES
('Digital Alchemists Co.', 'DA', 'active'),
('Global Logistics Ltd.', 'GL', 'pending_kyc');

INSERT INTO workspace_members (workspace_id, user_id, role) VALUES
(1, 1, 'Owner'),
(2, 1, 'Admin');

INSERT INTO products (workspace_id, name, description, price, status) VALUES
(1, 'Enterprise SaaS Platform', 'Complete enterprise management solution', 9999.00, 'active'),
(1, 'API Gateway Service', 'High-performance API gateway', 4999.00, 'active');

INSERT INTO settlement_orders (workspace_id, product_id, product_name, amount, status) VALUES
(1, 1, 'Enterprise SaaS Platform', 9999.00, 'completed'),
(1, 2, 'API Gateway Service', 4999.00, 'pending');
