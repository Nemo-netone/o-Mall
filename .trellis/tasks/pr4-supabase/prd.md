# pr4-supabase · PRD（要做什么 / 范围 / 验收）

## 目标

把 O-Mall 的**商品数据与内容数据**从打包进前端的本地 TS 文件，迁移到 **Supabase（PostgreSQL）**，让数据可在后台维护、前端运行时读取；同时保持 CloudBase 静态托管不变、站点在数据库不可用时仍能正常显示（本地兜底）。

## 背景与现状

- 前端是 CloudBase 纯静态站（React + Vite + Wouter hash 路由），数据现在全在 `web/src/data/catalog.ts`、`content.ts`，图片打包在 `public/images/`。
- `lib/db` 早已接入 Drizzle/PostgreSQL；本任务已正式启用 schema，当前表为 `categories/products/reviews/content_pages`。
- 用户已提供 Supabase Personal Access Token（管理令牌）；已 `supabase login`。
- 现有 Supabase 项目：`Nemo-netone's Project`，ref `fmgqjbxydgxwhjrrhwxi`，新加坡区。
- 已验证：Supabase Management API `/database/query` 可用令牌直接执行 SQL（建表/写数据**无需数据库密码**）。
- 当前前端只运行时读取商品、分类、评价；内容页仍使用本地 `content.ts`。`content_pages` 已建表/seed，运行时读取后置。
- 当前本地在售商品为 `p1/p2/p3`；`p4/p5/p6` 已加入 `DISCONTINUED_PRODUCT_IDS`，seed 前会先从远端删除这些下架商品及评价。

## 架构选型（关键决策）

| 决策点 | 选择 | 理由 |
|--------|------|------|
| 前端取数方式 | **前端直连 supabase-js（anon key + RLS 只读）** | 静态站无需后端；anon key 公开安全，由 RLS 保护 |
| 数据可用性 | **本地数据兜底** | Supabase 不可达/超时就回退打包数据，永不白屏（符合前端规范的加载/空/错） |
| 表结构管理 | Drizzle 定义 + SQL 迁移（`lib/db/sql/001_init.sql`） | 与现有 `lib/db` 一致；线上用 Management API/SQL Editor 应用 |
| 写入权限 | 仅 service_role / 后台；anon 只读 | 防止匿名写入；前端不放 service_role |
| 图片 | 阶段一：路径存库，图仍随 dist；阶段二：迁 Supabase Storage 公开桶 | 阶段一只用令牌即可、零密钥暴露；Storage 需 service_role/Storage API |

## 范围

**阶段一（本任务）**
1. 建表：`categories` / `products` / `reviews` / `content_pages`（+ RLS 公开只读）。
2. seed：把本地 6 分类 / 在售商品 / 评价 / 6 内容页数据写入库，并删除 `DISCONTINUED_PRODUCT_IDS` 中的下架商品。
3. 前端：加 `@supabase/supabase-js` 客户端；商品/分类/评价**运行时从 Supabase 读取**，失败回退本地；加载/空/错状态完整。
4. 构建 + 发布 CloudBase（构建期注入 `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`）。

**阶段二（后置，可选）**
- 8 张商品图上传 Supabase Storage 公开桶，库中 `image` 改为 Storage 公开 URL。
- 内容展示页（company/tech/charity/functions/knowledge/assessment）也改为运行时读库。
- 购物车/订单持久化、Supabase Auth 登录。

## 不做

- 不在前端暴露 service_role / 管理令牌 / 数据库密码。
- 不把任何密钥写进仓库（`.env` 已忽略；`.env.example` 只放占位）。
- 不改 CloudBase 静态托管方案；不引入自建后端（阶段一）。

## 安全

- anon key：公开值，可进前端构建产物；务必配 RLS（已设公开只读）。
- service_role / PAT：仅本地脚本/迁移用；用后建议在 Supabase 后台**轮换**。
- 写策略：当前不开放匿名写；后续如需购物车/订单写入，再设带鉴权的 RLS。

## 验收

- Supabase 中 `categories/products/reviews/content_pages` 表存在且有数据，RLS 已开、公开只读可查。
- 用 anon key 能查到商品（`select` 通过 RLS）。
- 前端构建通过；线上商品列表/详情的数据来自 Supabase；断网/无库时回退本地不白屏。
- 仓库内无任何真实密钥。
