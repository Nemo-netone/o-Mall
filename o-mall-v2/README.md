# o-mall-v2

O-Mall 电商平台 v2 版本 - 基于现代化技术栈的 Monorepo 架构

## 📁 项目结构

```
o-mall-v2/
├── lib/                      # 共享库
│   ├── db/                   # 数据库层 (Drizzle ORM + PostgreSQL)
│   └── api-spec/             # OpenAPI 规范
├── artifacts/                # 应用程序
│   └── api-server/           # Express API 服务器
└── package.json              # 根 workspace 配置
```

## 🛠️ 技术栈

### 核心技术
- **Monorepo**: pnpm workspaces
- **TypeScript**: 5.7+
- **Node.js**: 推荐 20+

### 后端
- **框架**: Express 5.0
- **数据库**: PostgreSQL
- **ORM**: Drizzle ORM
- **验证**: Zod

### 部署目标
- **腾讯云服务器** (Linux x64)
- 已优化依赖包体积（排除非 Linux 平台的二进制）

## 🚀 快速开始

### 安装依赖
```bash
pnpm install
```

### 数据库设置
1. 确保 PostgreSQL 已安装并运行
2. 创建数据库：
```bash
createdb omall
```

3. 设置环境变量：
```bash
export DATABASE_URL="postgresql://localhost:5432/omall"
```

4. 推送数据库 schema：
```bash
pnpm --filter @o-mall/db run push
```

### 开发服务器
```bash
pnpm dev
```

服务器将在 `http://localhost:3000` 启动

### 类型检查
```bash
pnpm typecheck
```

### 构建
```bash
pnpm build
```

## 📦 Workspace 包

### @o-mall/db
数据库层，包含：
- Drizzle ORM 配置
- 数据库 schema 定义
- Zod 验证 schema

**主要命令**：
```bash
pnpm --filter @o-mall/db run push   # 推送 schema 到数据库
pnpm --filter @o-mall/db run studio # 打开 Drizzle Studio
```

### @o-mall/api-spec
API 规范定义：
- OpenAPI 3.1 规范
- 后续可用于代码生成（Orval）

### @o-mall/api-server
Express API 服务器：
- RESTful API 端点
- 健康检查端点：`GET /health`

**主要命令**：
```bash
pnpm --filter @o-mall/api-server run dev       # 开发模式
pnpm --filter @o-mall/api-server run build     # 构建
pnpm --filter @o-mall/api-server run start     # 生产模式
```

## 🔒 安全特性

### 供应链防护
- **最小发布时间要求**: 24 小时
- 所有 npm 包必须发布至少 1 天后才能安装
- 防护 90% 的供应链攻击

### 包体积优化
- 仅保留 Linux x64 平台二进制
- 排除所有其他平台的 esbuild/rollup 二进制
- 减小 `node_modules` 体积约 60%

## 📝 开发规范

### 添加新的数据表
1. 在 `lib/db/src/schema/` 创建新文件（例如 `users.ts`）
2. 定义 Drizzle table 和 Zod schema
3. 在 `lib/db/src/schema/index.ts` 导出
4. 运行 `pnpm --filter @o-mall/db run push`

### 添加新的 API 端点
1. 在 `lib/api-spec/openapi.json` 定义 API
2. 在 `artifacts/api-server/src/` 实现端点
3. 使用 `@o-mall/db` 进行数据库操作

## 🚀 部署到腾讯云

### 环境准备
1. 确保服务器已安装：
   - Node.js 20+
   - PostgreSQL 14+
   - pnpm

2. 设置环境变量：
```bash
export DATABASE_URL="postgresql://user:password@localhost:5432/omall"
export PORT=3000
export NODE_ENV=production
```

### 部署步骤
```bash
# 1. 克隆代码
git clone <repo-url>
cd o-Mall/o-mall-v2

# 2. 安装依赖
pnpm install --frozen-lockfile

# 3. 构建
pnpm build

# 4. 推送数据库 schema
pnpm --filter @o-mall/db run push

# 5. 启动服务
pnpm --filter @o-mall/api-server run start
```

### 使用 PM2 守护进程
```bash
pm2 start artifacts/api-server/dist/index.js --name "o-mall-api"
pm2 save
pm2 startup
```

## 📚 后续扩展

可以添加的包：
- `lib/api-client` - TypeScript API 客户端（前端使用）
- `artifacts/admin` - 管理后台（Vite + React）
- `artifacts/mobile` - 移动应用（Expo）
- `lib/shared` - 共享工具函数

## 🤝 贡献指南

1. 创建功能分支：`git checkout -b feat/your-feature`
2. 提交变更：`git commit -m "feat: add something"`
3. 推送分支：`git push origin feat/your-feature`
4. 创建 Pull Request

## 📄 License

MIT
