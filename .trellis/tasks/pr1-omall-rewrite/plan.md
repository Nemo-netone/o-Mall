# pr1-omall-rewrite · 执行计划（Plan）

> 配套文档：同目录 [`prd.md`](./prd.md)（要做什么 / 范围 / 验收）。
> 本文回答“按什么顺序做、做到哪了”：里程碑、进度看板、里程碑到 PR 映射。
> 规范见 `../../spec/`，流程见 `../../workflow.md`，项目级说明见仓库根 `AGENTS.md`。
> 维护约定：完成一项把 `[ ]` 改 `[x]`；里程碑全部子项和验收通过才把该里程碑标 ✅。

---

## 0. 进度看板

**整体进度：7 / 7 里程碑 · 商城静态 MVP 已发布到 CloudBase 体验版**

| 里程碑 | 状态 | 说明 |
|--------|------|------|
| M0 脚手架与规范对齐 | ✅ 已验收 | pnpm monorepo / TS / health API / 图片 / Trellis 就位；typecheck + build 通过 |
| M1 静态数据底座 + hash 路由 | ✅ 已验收 | `main.tsx` 使用 `useHashLocation`；商品/分类类型和本地 catalog 就位；应用布局壳已完成 |
| M2 首页 | ✅ 已验收 | hero、科学数据条、精选专区、快捷导航、科学 banner、信任徽章已完成 |
| M3 商品列表 + 商品详情 | ✅ 已验收 | 商品列表/分类/搜索；详情页 Tab（使用说明/配方成分/用户评价）和吸底操作栏已完成 |
| M4 内容展示页 | ✅ 已验收 | 企业简介、首创技术、爱心助农、护肝知识、健康评测、产品功能页已完成 |
| M5 购物车 + 确认订单模拟 | ✅ 已验收 | 加购、改数量、选择/移除、搭配推荐、地址/支付方式/费用明细/成功态模拟已完成 |
| M6 构建与 CloudBase 发布 | ✅ 已验收 | `pnpm typecheck`、`pnpm --filter @o-mall/web run build` 通过；`dist/images` 含 8 张商城图；已发布到体验版 |

> 图例：⬜ 未开始 ｜ 🟡 进行中 ｜ ✅ 已验收。
>
> **线上地址**：https://meta-d5gh4ds014005aff1-1369167244.tcloudbaseapp.com
> （腾讯云免费测试域名首次访问可能有“风险提醒”安全拦截页，点“确定访问”进入；去掉该页需绑定自有域名。）

---

## 1. 当前真实状态（对照代码核验：2026-06-22）

已就位：

- pnpm workspace monorepo（`@o-mall/*`），TypeScript ~5.7。
- 前端：`artifacts/web` = React 18.3 + Vite 6 + Wouter 3.3，hash 路由，完整商城页面。
- 前端数据：商品、分类、评价优先运行时读取 Supabase；失败或未配置 `VITE_SUPABASE_*` 时回退本地 `catalog.ts`。
- 静态资源：`artifacts/web/public/images/` 8 张商城图已被页面引用，build 后复制到 `artifacts/web/dist/images/`。
- 后端：`artifacts/api-server` 已有 `GET /health`、`GET /api/health`、`POST /api/ai/chat`。
- CloudBase HTTP 云函数：`functions/omall-ai-chat` 作为 AI 代理，`scf_bootstrap` 启动 Node Web Server。
- 数据库：`lib/db/src/schema/index.ts` 已定义 `categories/products/reviews/content_pages`；`sql/001_init.sql` 和 `seed.ts` 已存在。
- API 合同：`lib/api-spec/openapi.json` 已记录健康检查和 AI 聊天代理。
- 文档/规范：`AGENTS.md`、根 README、`o-mall-v2/README.md`、`.trellis/` 已对齐 CloudBase 静态托管优先路线。

仍未完成或属于后置：

- 商品列表/详情 API、购物车 API、订单 API 尚未实现。
- 真实支付、真实运营后台、账号体系尚未实现；结算页只是前端模拟。
- 内容展示页仍使用本地 `src/data/content.ts`，还没有运行时读取 `content_pages`。
- 图片仍随 CloudBase 静态站打包发布，尚未迁移到 Supabase Storage。
- 腾讯云 Linux 服务器后端部署仍后置。

---

## 2. 里程碑验收记录

### ✅ M0 · 脚手架与规范对齐
- [x] pnpm monorepo、TS、health API、`/api` 代理。
- [x] 商城图片放入 `artifacts/web/public/images/`。
- [x] `.trellis/` 全套规范对齐 CloudBase；README/AGENTS 对齐。
- [x] **验收**：`pnpm typecheck` 和 Web build 通过；文档与代码口径已更新。

### ✅ M1 · 静态数据底座 + hash 路由
- [x] Wouter 使用 **hash 路由**（`main.tsx` 用 `useHashLocation`）。
- [x] 商品/分类静态数据 + TS 类型。
- [x] 应用布局壳：顶栏、底部导航、移动优先容器。
- [x] **验收**：CloudBase 刷新详情页不依赖服务端 rewrite；类型检查通过。

### ✅ M2 · 首页
- [x] hero banner、精选专区、快捷导航、科学数据区，复用 `public/images/`。
- [x] 暖金 / 深绿 / 草本白底风格；移动优先且适配桌面。
- [x] **验收**：首页为真实商城展示，不是默认占位页。

### ✅ M3 · 商品列表 + 商品详情
- [x] 商品列表（卡片/网格/搜索/分类），点击进入详情。
- [x] 详情页含使用说明、配方成分、用户评价三类信息。
- [x] **验收**：列表到详情可达，详情含三类信息，hash 路由刷新不 404。

### ✅ M4 · 内容展示页
- [x] 产品功能、企业、技术、公益、护肝知识、健康评测内容页。
- [x] **验收**：导航可达，内容结构清晰，移动端可读。

### ✅ M5 · 购物车 + 确认订单模拟
- [x] 加入购物车、修改数量、选择/移除、确认订单模拟页。
- [x] **验收**：购物车增删改正确，可走到确认订单模拟页；不宣称真实下单/支付。

### ✅ M6 · 构建与 CloudBase 发布
- [x] `pnpm typecheck` 通过。
- [x] `pnpm --filter @o-mall/web run build` 通过，`dist` 含 `images/`。
- [x] 已执行 CloudBase 静态托管发布到体验版 `meta-d5gh4ds014005aff1`。
- [x] **验收**：本地构建产物可发布，线上体验版可访问。

---

## 3. 里程碑 → PR 拆分映射

**M1（3 / 3）**
- [x] `feat(web): 切换 hash 路由并校验刷新不 404`
- [x] `feat(web): 商品/分类静态数据与 TS 类型`
- [x] `feat(web): 应用布局壳（顶栏/底部导航/移动容器）`

**M2（1 / 1）**
- [x] `feat(web): 首页 hero/精选/导航/科学数据区`

**M3（2 / 2）**
- [x] `feat(web): 商品列表页`
- [x] `feat(web): 商品详情页（使用说明/配方/评价）`

**M4（1 / 1）**
- [x] `feat(web): 内容展示页（产品功能/企业/技术/公益）`

**M5（2 / 2）**
- [x] `feat(web): 购物车（加购/改数量/选择移除）`
- [x] `feat(web): 确认订单模拟页`

**M6（1 / 1）**
- [x] `chore(web): 构建校验与 CloudBase 发布说明对齐`

后续 Supabase 读库进展见 `../pr4-supabase/plan.md`。

---

## 4. 关键决策

| 决策点 | 选择 | 理由 |
|--------|------|------|
| 路由 | hash 路由 | CloudBase 静态托管刷新子路径不 404，无需服务端 rewrite |
| 静态 MVP 数据 | 本地 catalog 兜底 | 不被 API/DB 阻塞，保证静态站永不白屏 |
| 运行时商品数据 | Supabase anon + RLS 只读 | 静态站无需自建后端读取商品；公开 anon key 由 RLS 保护 |
| 购物车状态 | 前端轻量状态 | 购物车为本地模拟流程，避免过早引入真实订单复杂度 |
| 图片 | 仍在 `web/public/images/` | 当前项目独立构建发布；Storage 迁移后置 |
| AI 顾问 | 本地规则兜底 + 可选服务端代理 | 未配置代理时可用；配置后密钥只在 Express/CloudBase 函数环境变量 |
| 后端交易能力 | MVP 后置 | 静态商城先交付展示、浏览、加购和下单模拟 |

## 5. 风险与对策

| 风险 | 影响 | 对策 |
|------|------|------|
| 文档写成“真实交易已完成” | 误导用户和后续开发 | 明确购物车/结算是前端模拟，真实支付和订单 API 未完成 |
| Supabase 不可达 | 商品页面白屏 | 前端初始值使用本地 catalog，远端失败回退本地 |
| anon key 被误当密钥 | 安全误判 | 文档写清 anon key 可公开，但 service_role/PAT/数据库密码不得进仓库 |
| AI 供应商 key 进前端 | 密钥泄露 | 前端只配置 `VITE_AI_PROXY_URL`；`SILICONFLOW_API_KEY` 只放服务端/云函数环境变量 |
| `shopTwo-main` 被误提交 | 污染主项目 | 根 `.gitignore` 忽略 `shopTwo-main/`，并在 AGENTS/README 写清只读参考 |

## 6. 不做（本 MVP 之外）

真实支付、完整账号体系、真实订单 API、运营后台、图片 Storage 迁移、内容页运行时读库、复制/修改 `shopTwo-main`、把腾讯云 Linux 服务器作为第一发布目标。
