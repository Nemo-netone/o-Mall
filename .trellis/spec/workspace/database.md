# 数据库规范

## 1. 范围

涉及 Drizzle schema、数据库推送、数据库环境变量、商城持久化数据时使用本规范。

## 2. 签名

数据库包：

```ts
import { db } from "@o-mall/db";
```

环境变量：

```text
DATABASE_URL=postgresql://user:password@host:5432/omall
```

## 3. 合同

- Schema 文件放在 `o-mall-v2/lib/db/src/schema/`。
- 每个表都要从 `o-mall-v2/lib/db/src/schema/index.ts` 导出。
- 数据库 client 在 `o-mall-v2/lib/db/src/index.ts`。
- 本地开发可使用 `postgresql://localhost:5432/omall`。
- 腾讯云生产连接串必须通过环境变量注入，不得提交到仓库。

## 4. 校验和错误矩阵

| 条件 | 预期行为 |
| --- | --- |
| 开发环境缺少 `DATABASE_URL` | 可使用默认本地 URL |
| 生产环境缺少 `DATABASE_URL` | 视为部署配置错误 |
| schema 变化 | 开发库运行 `pnpm --filter @o-mall/db run push` |
| 数据非法 | 写入前通过 Zod 或路由层校验 |

## 5. 正例 / 基础 / 反例

- 正例：表定义、验证 schema、API 合同、路由行为一起设计。
- 基础：新增单表后从 schema index 导出。
- 反例：在前端直接写 SQL 或绕过 schema 导出。

## 6. 必要检查

- schema 改动后跑 TypeScript 检查。
- 在把表写进“可用功能”文档前，先在开发数据库执行 push。

## 7. 错误 vs 正确

错误：

```ts
// 新表存在，但没有从 schema index 导出
```

正确：

```ts
export * from "./products.js";
```
