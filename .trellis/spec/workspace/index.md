# Workspace Spec 索引

这些规范定义如何在 `o-mall-v2` 中开发。

## 开发前检查

按改动类型读取相关文件：

- `monorepo.md`：workspace/package 边界。
- `api-contracts.md`：API 路由和 OpenAPI 规则。
- `database.md`：Drizzle/PostgreSQL schema 规则。
- `frontend.md`：Vite React 前端规则。
- `deployment.md`：CloudBase 静态托管优先部署规则。

始终先读本文件和 `../guides/index.md`。

## 包职责

- `o-mall-v2/artifacts/api-server`：Express API 服务，入口是 `src/index.ts`。
- `o-mall-v2/artifacts/web`：Vite React 前端，入口是 `src/main.tsx`。
- `o-mall-v2/functions/omall-ai-chat`：CloudBase HTTP 云函数版 AI 代理，入口由 `scf_bootstrap` 启动。
- `o-mall-v2/lib/db`：数据库 client 和 schema 导出；当前含商品、分类、评价、内容页表。
- `o-mall-v2/lib/api-spec`：OpenAPI 真源；当前含健康检查和 AI 聊天代理合同。

## 当前方向

商城静态 MVP 已在此 workspace 中完成并发布到 CloudBase 体验版。参考项目可提供思路，但当前项目必须保留自己的包名、部署假设和合同。当前发布目标仍是 CloudBase 静态托管优先，腾讯云服务器部署后置。

后续开发重点：

- 商品、分类、评价已经可从 Supabase 公开只读表运行时读取，前端必须保留本地数据兜底。
- 内容页仍使用本地 `src/data/content.ts`，迁到 `content_pages` 时要同步前端数据源和文档。
- 真实支付、购物车 API、订单 API 尚未完成，不能写成线上交易能力。
