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

当前表：

```text
categories(id, title, subtitle, icon, sort)
products(id, name, badge, summary, spec, tags, price, original_price, image, category_id, theme, sales, repurchase, features, suitable, steps, certs, ingredient_table, params, usage, ingredients, sort)
reviews(id, product_id, user_name, rating, text, date, tag)
content_pages(key, data, updated_at)
```

## 3. 合同

- Schema 文件放在 `o-mall-v2/lib/db/src/schema/`。
- 每个表都要从 `o-mall-v2/lib/db/src/schema/index.ts` 导出。
- 数据库 client 在 `o-mall-v2/lib/db/src/index.ts`。
- 本地开发可使用 `postgresql://localhost:5432/omall`。
- Supabase/PostgreSQL 生产连接串必须通过环境变量注入，不得提交到仓库。
- SQL 初始化脚本：`o-mall-v2/lib/db/sql/001_init.sql`，与 Drizzle schema 保持一致。
- seed 脚本：`o-mall-v2/lib/db/seed.ts`，使用 `SUPABASE_ACCESS_TOKEN` / `SUPABASE_PAT` 和 `SUPABASE_PROJECT_REF` 经 Supabase Management API 写入。
- 前端当前只运行时读取 `categories/products/reviews`；`content_pages` 已建表和 seed，但内容页仍使用本地 `src/data/content.ts`。
- RLS：当前线上策略只允许公开 `select`，不开放匿名写入。

## 4. 校验和错误矩阵

| 条件 | 预期行为 |
| --- | --- |
| 开发环境缺少 `DATABASE_URL` | 可使用默认本地 URL |
| 生产环境缺少 `DATABASE_URL` | 视为部署配置错误 |
| schema 变化 | 开发库运行 `pnpm --filter @o-mall/db run push` |
| 使用 Management API seed 但缺少 PAT | 脚本退出并提示缺少 `SUPABASE_ACCESS_TOKEN` 或 `SUPABASE_PAT` |
| 前端读 Supabase 失败 | 前端回退本地 catalog，页面不白屏 |
| anon 用户尝试写入 | RLS 拒绝写入 |
| 数据非法 | 写入前通过 Zod 或路由层校验 |

## 5. 正例 / 基础 / 反例

- 正例：表定义、验证 schema、API 合同、路由行为一起设计。
- 基础：新增单表后从 schema index 导出。
- 基础：公开读数据用 anon key + RLS；管理写入用 PAT/service_role/后端环境变量。
- 反例：在前端直接写 SQL、放 service_role、或绕过 schema 导出。

## 6. 必要检查

- schema 改动后跑 TypeScript 检查。
- 在把表写进“可用功能”文档前，先在开发数据库执行 push。
- 改 `001_init.sql`、`seed.ts`、Drizzle schema 时三者要保持字段一致。
- Supabase 读库相关前端改动还要跑 `pnpm --filter @o-mall/web run build`，确认本地兜底不受影响。

## 7. 错误 vs 正确

错误：

```ts
// 新表存在，但没有从 schema index 导出
```

正确：

```ts
export * from "./products.js";
```
