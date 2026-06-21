# o-mall-v2

`o-mall-v2` 是 O-Mall 商城的主重写项目。旁边的 `../shopTwo-main` 只是参考资料；当前项目要形成自己的包名、前端文件、静态资源、接口合同、数据库结构和 CloudBase 发布路径。

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

商城静态 MVP **已发布到 CloudBase 体验版**：

- 线上地址：https://meta-d5gh4ds014005aff1-1369167244.tcloudbaseapp.com
- 风格对标 `../shopTwo-main`：深绿 + 暖金 + 草本米底卡片；移动优先并适配桌面
- 免费测试域名首访有"风险提醒"安全拦截页，点"确定访问"进入；去掉需绑定自有域名

还没有作为线上能力完成：

- 商品数据库表
- 商品列表/详情 API
- 购物车 API
- 订单 API
- 真实运营后台或种子数据流程
- 真实支付（结算为前端模拟）

## 项目结构

```text
o-mall-v2/
├── artifacts/
│   ├── api-server/            # Express API 服务，后续接真实接口
│   └── web/                   # Vite React 前端，当前 CloudBase 静态站主线
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
- 当前发布目标：CloudBase 静态托管

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

## CloudBase 静态托管

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
cloudbase hosting deploy artifacts/web/dist
```

如果 CLI 没有默认环境，显式指定：

```powershell
cloudbase hosting deploy artifacts/web/dist -e <env-id>
```

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

静态 MVP 阶段：

```text
浏览器
  -> CloudBase 静态托管
  -> Vite 构建产物 dist
  -> React 静态数据和前端状态
```

后续接 API 后的开发链路：

```text
浏览器
  -> artifacts/web Vite 开发服务
  -> 前端请求后端时走 /api 代理
  -> artifacts/api-server Express 路由
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

AI 相关注意：不要把模型供应商密钥写进前端 `.env`。如果要让线上访客都能调用 AI，请把 `SILICONFLOW_API_KEY` 配在 CloudBase HTTP 云函数或自有后端的环境变量中，再把前端的 `VITE_AI_PROXY_URL` 指向代理，例如 `/api/ai/chat`。

CloudBase HTTP 云函数代码在：

```text
functions/omall-ai-chat
```

部署时使用 HTTP 函数，并把访问路径绑定到 `/api/ai/chat`；密钥放到云函数环境变量 `SILICONFLOW_API_KEY`，不要写入仓库配置。

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
../.trellis/tasks/pr1-omall-rewrite/prd.md     # 要做什么 + 验收标准
../.trellis/tasks/pr1-omall-rewrite/plan.md    # 里程碑 + 进度看板 + PR 拆分
```

规范分区：

- `monorepo.md`：包边界和依赖规则
- `api-contracts.md`：路由、OpenAPI、响应合同
- `database.md`：Drizzle/PostgreSQL 规则
- `frontend.md`：Vite React 前端规则
- `deployment.md`：CloudBase 静态托管部署规则

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
