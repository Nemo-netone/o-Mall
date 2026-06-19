# pr4-supabase · 执行计划（Plan）

> 配套 [`prd.md`](./prd.md)。本文回答「按什么顺序做、做到哪」。
> 维护约定：完成一项把 `[ ]` 改 `[x]`；里程碑全部子项+验收通过才标 ✅。

## 0. 进度看板

**整体进度：S1–S4 完成 · 数据已入库、前端读库、已发布；S5 图片迁 Storage 后置**

| 里程碑 | 状态 | 说明 |
|--------|------|------|
| S0 规划 + 本地骨架 | ✅ | Drizzle schema、`sql/001_init.sql`、`.env.example`、本 PRD/Plan；Supabase 已登录、Management API 已验证可执行 SQL |
| S1 建表 + RLS（线上） | ✅ | 已应用 `001_init.sql`：4 表 + RLS 公开只读（用户明确授权） |
| S2 seed 数据 | ✅ | 已写入 6 分类 / 6 商品 / 12 评价 / 6 内容页 |
| S3 前端接入 supabase-js + 本地兜底 | ✅ | `state/catalog` Context 本地兜底 + 运行时拉 Supabase；首页/列表/分类/详情读库；实测 REST 200、0 报错 |
| S4 构建 + CloudBase 发布 | ✅ | 注入 `VITE_SUPABASE_*`，build + deploy 已上线 |
| S5（后置）图片迁 Storage / 内容页读库 / 账号订单 | ⬜ | 可选增强（图片现仍随站点打包，路径存库） |

> 图例：⬜ 未开始 ｜ 🟡 进行中 ｜ ✅ 已验收。

## 1. 接入参数（已确认）

- 项目 ref：`fmgqjbxydgxwhjrrhwxi`（Nemo-netone's Project，新加坡）
- 前端 URL：`https://fmgqjbxydgxwhjrrhwxi.supabase.co`
- anon key：已取（公开，受 RLS 保护）
- 执行 SQL 路径：Management API `/database/query`（令牌鉴权，无需 DB 密码）

## 2. 里程碑步骤

### S1 建表 + RLS（线上，需明确同意）
- [ ] 应用 `lib/db/sql/001_init.sql`：建 4 表 + 开 RLS + 公开只读策略。
- [ ] 验收：4 表存在；RLS 已开。

### S2 seed 数据
- [ ] 写一次性 seed 脚本：读 `web/src/data/{catalog,content}.ts`，转 SQL（jsonb 字段 JSON 化、转义），经 Management API 批量写入。
- [ ] 写入：6 分类、6 商品（含 features/成分表/参数等 jsonb）、全部评价、6 内容页（company/tech/charity/functions/knowledge/assessment）。
- [ ] 验收：`select count(*)` 各表数量正确；anon key 能查到商品。

### S3 前端接入
- [ ] web 加 `@supabase/supabase-js`；新增 `src/lib/supabase.ts`（读 `import.meta.env.VITE_SUPABASE_*`）。
- [ ] 新增 `src/data/remote.ts`：从 Supabase 拉商品/分类/评价；**失败/未配置则回退** `catalog.ts` 本地数据。
- [ ] 商品列表/详情/分类/首页改用异步数据源 + 加载/空/错状态（兜底后基本不触发错态）。
- [ ] 验收：typecheck + build 通过；本地 preview 看商品来自库；删/断网时回退本地不白屏。

### S4 构建 + 发布
- [ ] `.env` 写入 `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`（不提交）。
- [ ] build + `cloudbase hosting deploy`；线上抽查商品数据来自 Supabase。

## 3. 风险与对策

| 风险 | 对策 |
|------|------|
| 改线上库不可逆 | 先在仓库留 `001_init.sql` 可审；`create table if not exists` 幂等；seed 用 upsert |
| anon key 泄漏被滥用 | 已配 RLS 只读；不开匿名写；anon 本就是公开值 |
| Supabase 超时/抖动 | 前端本地兜底 + 加载/错状态，永不白屏 |
| 密钥进仓库 | 只入 `.env`（已忽略）；`.env.example` 占位；service_role/PAT 用后轮换 |
| Vite 构建期才注入 anon | CloudBase 本地构建时读 `.env`，产物含 anon（公开安全） |

## 4. 不做（本任务之外）

service_role 进前端、匿名写、自建后端（阶段一）、图片存 Postgres bytea（应走 Storage）。
