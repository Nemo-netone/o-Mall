# o-mall-v2

`o-mall-v2` 是 O-Mall 商城的主重写项目。旁边的 `../shopTwo-main` 只是参考资料；当前项目要形成自己的包名、前端文件、静态资源、接口合同、数据库结构和部署路径。

## 当前状态

已经有：

- pnpm workspace monorepo
- `artifacts/web` Vite + React 前端（**完整商城**：首页/商品列表/分类/详情(Tab)/我的/购物车/结算 + 企业·技术·公益·护肝知识·健康评测·产品功能内容页，hash 路由）
- 前端 AI 健康顾问入口（底部导航中间按钮）：未配置生产代理时基于本地商品库回答；配置 `VITE_AI_PROXY_URL` 后可走自有后端/CloudBase HTTP 云函数代理
- `artifacts/api-server` Express API 服务
- `GET /health` 健康检查接口
- `POST /api/ai/chat` AI 代理接口（本地 Express / CloudBase HTTP 云函数均使用服务端环境变量保存供应商 key）
- `lib/db` Drizzle/PostgreSQL 数据库包
- `lib/api-spec/openapi.json` OpenAPI 合同
- 根目录 `../.trellis/` Trellis 工作流和规范文档

## 🚀 部署架构（重要）

**本项目采用混合部署架构**，前后端分离：

### 前端静态站 - Cloudflare Pages（主线）
- ✅ **生产地址**：https://o-mall-v2.pages.dev
- ✅ **国内可访问**（无需梯子）
- ✅ **完全免费**，全球 CDN 加速
- ✅ **自动 HTTPS**，支持自定义域名
- 📦 发布目标：`artifacts/web/dist`

### 后端 API / 云函数 - CloudBase
- 🔧 **AI 聊天代理**：`functions/omall-ai-chat/` CloudBase HTTP 云函数
- 🔑 环境变量 `SILICONFLOW_API_KEY` 配置在 CloudBase 云函数环境
- 📍 访问路径：`/api/ai/chat`
- ⚠️ **重要**：AI 密钥只在服务端（CloudBase 云函数），绝不暴露在前端代码

### 备用部署（国内访问受限）
- CloudBase 静态托管：https://meta-d5gh4ds014005aff1-1369167244.tcloudbaseapp.com
- Vercel：https://o-mall-v2.vercel.app（需梯子访问）

**为什么这样部署？**
- Cloudflare Pages：国内访问友好，完全免费
- CloudBase 云函数：保护 AI 密钥安全，按调用量计费（免费额度内基本不产生费用）

还没有作为线上能力完成：

- 商品列表/详情 API
- 购物车 API
- 订单 API
- 真实运营后台
- 内容页运行时读库（当前内容页仍使用前端本地内容数据）
- 图片迁移到 Supabase Storage（当前仍随 `dist/images/` 打包发布）
- 真实支付（结算为前端模拟）

## 项目结构

```text
o-mall-v2/
├── artifacts/
│   ├── api-server/            # Express API 服务：health + AI proxy
│   └── web/                   # Vite React 前端，当前 CloudBase 静态站主线
├── functions/
│   └── omall-ai-chat/         # CloudBase HTTP 云函数版 AI proxy
├── lib/
│   ├── api-spec/              # OpenAPI 合同
│   └── db/                    # Drizzle/PostgreSQL 数据层
├── .env.example
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

## 技术栈

- Monorepo：pnpm workspaces
- 语言：TypeScript
- 前端：React 18 + Vite 6 + Wouter
- 后端：Express 5
- 数据库：PostgreSQL + Drizzle ORM
- API 合同：OpenAPI 3.1
- **前端部署**：Cloudflare Pages（主线），CloudBase/Vercel（备用）
- **后端部署**：CloudBase HTTP 云函数（AI 代理）

## 前端命令

从当前目录执行：

```powershell
pnpm --filter @o-mall/web run dev
pnpm --filter @o-mall/web run typecheck
pnpm --filter @o-mall/web run build
pnpm --filter @o-mall/web run preview
```

构建产物：

```text
artifacts/web/dist
```

## CloudBase 静态托管（备用）

**注意**：主线部署已迁移到 **Cloudflare Pages**，CloudBase 仅作为备用或云函数宿主。

发布前先构建：

```powershell
pnpm --filter @o-mall/web run typecheck
pnpm --filter @o-mall/web run build
```

如果 CloudBase 已部署 `/api/ai/chat` HTTP 云函数路由，构建静态站时可临时设置：

```powershell
$env:VITE_AI_PROXY_URL="/api/ai/chat"; pnpm --filter @o-mall/web run build
```

发布到 CloudBase：

```powershell
cloudbase hosting deploy artifacts/web/dist -e meta-d5gh4ds014005aff1
```

## Cloudflare Pages 部署（主线）

**推荐方式**：通过 Cloudflare CLI 部署

前提条件：
```powershell
npm install -g wrangler
```

部署命令：
```powershell
# 1. 构建前端
pnpm --filter @o-mall/web run build

# 2. 部署到 Cloudflare Pages
wrangler pages deploy artifacts/web/dist --project-name=o-mall-v2
```

配置文件：`vercel.json` 也支持从 Vercel 导入（可选）

**优势**：
- ✅ 国内访问友好（无需梯子）
- ✅ 完全免费，无流量限制（100GB/月免费额度）
- ✅ 自动 HTTPS，支持自定义域名
- ✅ 全球 CDN，访问速度快

路由：CloudBase 静态托管下使用 **hash 路由**（`main.tsx` 已用 `useHashLocation`），例如：

```text
/#/
/#/products
/#/product/p2
/#/category
/#/company
/#/tech
/#/cart
/#/checkout
```

这样刷新详情页/内容页时不依赖服务端 rewrite，已验证刷新不 404。

> 实际发布使用的环境：`meta-d5gh4ds014005aff1`（CloudBase 体验版）。命令：
> `cloudbase hosting deploy artifacts/web/dist -e meta-d5gh4ds014005aff1`

## 当前运行链路

### 生产环境链路

```text
用户浏览器
  -> Cloudflare Pages (o-mall-v2.pages.dev)
  -> React 前端 (artifacts/web/dist)
  -> 商品/分类/评价数据：优先读 Supabase 公开只读表，失败回退本地 catalog
```

### AI 健康顾问链路

```text
用户浏览器
  -> Cloudflare Pages 前端
  -> 点击 AI 按钮
  -> 请求 CloudBase HTTP 云函数: /api/ai/chat
  -> CloudBase 云函数 (functions/omall-ai-chat)
  -> SiliconFlow API (DeepSeek 模型)
  -> 返回 AI 回答
```

**关键配置**：
- 前端环境变量：`VITE_AI_PROXY_URL=/api/ai/chat`（指向 CloudBase 云函数）
- 云函数环境变量：`SILICONFLOW_API_KEY=sk-xxx`（在 CloudBase 控制台配置）

### 开发环境链路

```text
本地浏览器
  -> artifacts/web Vite 开发服务 (localhost:5173)
  -> 前端请求后端时走 /api 代理
  -> artifacts/api-server Express 路由 (localhost:3000)
  -> JSON 响应
```

## 后端命令

```powershell
pnpm --filter @o-mall/api-server run dev
pnpm --filter @o-mall/api-server run build
```

当前健康检查：

```http
GET /health
GET /api/health
POST /api/ai/chat
```

响应：

```json
{
  "status": "ok",
  "timestamp": "2026-06-18T00:00:00.000Z"
}
```

## 环境变量

看 `.env.example`。

```text
DATABASE_URL=postgresql://localhost:5432/omall
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-public-key>
# VITE_AI_PROXY_URL=https://<your-api-domain>/api/ai/chat
# CloudBase 同域 HTTP 云函数路由可用：VITE_AI_PROXY_URL=/api/ai/chat
SILICONFLOW_API_KEY=sk-your-api-key-here
# SUPABASE_ACCESS_TOKEN=sbp_xxx
# SUPABASE_PROJECT_REF=<project-ref>
PORT=3000
NODE_ENV=development
```

不要把真实生产密钥或数据库密码提交到仓库。

远端商品下架说明：`lib/db/sql/002_remove_discontinued_products.sql` 用于删除已下架商品 `p4/p5` 及其评价；运行 `lib/db/seed.ts` 时也会先删除 `DISCONTINUED_PRODUCT_IDS` 中的商品，避免本地 seed 后远端残留。

数据库现状：`lib/db/src/schema/index.ts` 已定义 `categories/products/reviews/content_pages`。前端当前只运行时读取商品、分类、评价；内容页仍使用本地 `src/data/content.ts`，后续如改成读库需要同时更新前端数据源和 Trellis spec。

AI 相关注意：不要把模型供应商密钥写进前端 `.env`。如果要让线上访客都能调用 AI，请把 `SILICONFLOW_API_KEY` 配在 CloudBase HTTP 云函数的环境变量中（在 CloudBase 控制台配置），再把前端的 `VITE_AI_PROXY_URL` 指向云函数代理路径 `/api/ai/chat`。

**CloudBase HTTP 云函数配置**：

云函数代码目录：
```text
functions/omall-ai-chat/
  ├── index.js          # HTTP 云函数入口
  ├── package.json
  └── scf_bootstrap     # 启动脚本
```

部署步骤：
1. 在 CloudBase 控制台创建 HTTP 云函数
2. 上传 `functions/omall-ai-chat/` 目录
3. 配置访问路径：`/api/ai/chat`
4. 在云函数环境变量中配置：`SILICONFLOW_API_KEY=sk-xxx`
5. 前端构建时设置：`VITE_AI_PROXY_URL=/api/ai/chat`

**为什么 AI 函数在 CloudBase？**
- ✅ 保护 API 密钥安全（不暴露在前端代码）
- ✅ 免费额度足够（每月前 10 万次调用免费）
- ✅ 国内访问速度快
- ✅ 与前端同域，无跨域问题（如果前端也在 CloudBase）

## Trellis

Trellis 用来保存项目规范和任务记忆。

大改动前先读：

```text
../.trellis/workflow.md
../.trellis/spec/guides/index.md
../.trellis/spec/workspace/index.md
```

当前任务说明与执行计划：

```text
../.trellis/tasks/pr1-omall-rewrite/prd.md     # 静态商城 MVP 要做什么 + 验收标准
../.trellis/tasks/pr1-omall-rewrite/plan.md    # 静态商城 MVP 里程碑 + 进度看板
../.trellis/tasks/pr4-supabase/prd.md          # Supabase 数据增强目标 + 验收标准
../.trellis/tasks/pr4-supabase/plan.md         # Supabase 进度 + 后置项
```

规范分区：

- `monorepo.md`：包边界和依赖规则
- `api-contracts.md`：路由、OpenAPI、响应合同
- `database.md`：Drizzle/PostgreSQL 规则
- `frontend.md`：Vite React 前端规则
- `deployment.md`：部署规则（已更新为 Cloudflare Pages + CloudBase 混合架构）

## 部署总结

### 快速部署指南

**前端（Cloudflare Pages）**：
```powershell
# 1. 构建
pnpm --filter @o-mall/web run build

# 2. 部署
wrangler pages deploy artifacts/web/dist --project-name=o-mall-v2
```

**后端（CloudBase 云函数）**：
1. 在 CloudBase 控制台上传 `functions/omall-ai-chat/`
2. 配置路径：`/api/ai/chat`
3. 设置环境变量：`SILICONFLOW_API_KEY`

### 部署架构优势

| 组件 | 平台 | 优势 | 费用 |
|------|------|------|------|
| 前端静态站 | Cloudflare Pages | 国内可访问、全球CDN、自动HTTPS | 免费 |
| AI 云函数 | CloudBase | 保护密钥、国内访问快 | 免费额度内 |
| 数据库 | Supabase | PostgreSQL、实时订阅 | 免费 |

### 线上地址

- **生产主站**：https://o-mall-v2.pages.dev
- **备用地址**：https://o-mall-v2.vercel.app（需梯子）
- **CloudBase 备用**：https://meta-d5gh4ds014005aff1-1369167244.tcloudbaseapp.com

## 参考项目使用规则

`../shopTwo-main` 可以用来借鉴，但不要复制它的部署假设或包名。

可以参考：

- 首页和商品详情页布局
- 产品功能内容页结构
- UI 风格
- 移动商城业务行为

避免：

- 修改 `shopTwo-main`
- 从 `shopTwo-main` 直接 import
- 使用 `@workspace/*` 包名
- 假设 Replit/Cloudflare 部署方式适用于当前重写项目
