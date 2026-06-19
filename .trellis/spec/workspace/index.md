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
- `o-mall-v2/lib/db`：数据库 client 和 schema 导出。
- `o-mall-v2/lib/api-spec`：OpenAPI 真源。

## 当前方向

商城正在此 workspace 中重写。参考项目可提供思路，但当前项目必须保留自己的包名、部署假设和合同。当前发布目标是 CloudBase 静态托管优先，腾讯云服务器部署后置。
