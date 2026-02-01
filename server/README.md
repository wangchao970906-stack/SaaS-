# Enterprise SaaS Backend

Spring Boot 后端服务

## 技术栈
- Java 17
- Spring Boot 3.2.2
- Spring Security + JWT
- MyBatis-Plus 3.5.5
- MySQL 8.0

## 快速开始

### 1. 安装 MySQL
确保 MySQL 8.0+ 已安装并运行

### 2. 初始化数据库
```bash
mysql -u root -p < init.sql
```

### 3. 配置数据库
修改 `src/main/resources/application.yml` 中的数据库密码:
```yaml
spring:
  datasource:
    password: your_password  # 修改为你的 MySQL 密码
```

### 4. 运行项目
```bash
mvn spring-boot:run
```

服务将在 `http://localhost:8080/api` 启动

## API 接口

### 认证接口
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出

### 测试账号
- 邮箱: `alex.chen@enterprise.com`
- 密码: `password123`

## 开发说明

### 项目结构
```
src/main/java/com/enterprise/saas/
├── SaasApplication.java          # 启动类
├── config/                       # 配置类
├── controller/                   # 控制器
├── service/                      # 服务接口
├── service/impl/                 # 服务实现
├── mapper/                       # MyBatis Mapper
├── entity/                       # 实体类
├── dto/                          # 数据传输对象
├── security/                     # 安全相关
├── exception/                    # 异常处理
└── common/                       # 通用类
```

### 响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```
