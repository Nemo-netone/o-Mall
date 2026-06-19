# o-Mall Agent Guide

这是给后续 AI / 开发者看的项目级说明。默认用中文交流和写说明。
本项目走**文档驱动开发**：动手前先读权威文档，文档与代码必须一致。

> 权威层级（冲突时下层服从上层，发现冲突先指出再改）：
> `.trellis/tasks/pr1-omall-rewrite/prd.md`（要什么）
> → `.trellis/tasks/pr1-omall-rewrite/plan.md`（按什么顺序做、做到哪）
> → `.trellis/spec/workspace/*.md`（按什么标准做）
> → 本 `AGENTS.md`（项目级流程与边界）。

## 沟通和工作方式

- 默认使用中文。
- 解释代码时优先讲功能树、文件职责、调用链、数据流。
- 小改动直接推进并做轻量验证；大改动先确认影响层：前端、后端、数据库、API 合同、部署、文档。
- 不要把参考项目和当前主项目混在一起。
- 每个改动尽量小、可独立验证；提交前对照 plan.md 对应里程碑的「验收」核验。

## 仓库边界

- `o-mall-v2/` 是当前真正要写的商城重写项目。
- `shopTwo-main/` 是参考项目，**只读**，借鉴业务流程、UI、目录组织和 API 思路；不改、不复制大段、不运行时 import。
- 根 `README.md` 是工作区总览；`o-mall-v2/README.md` 是主项目说明。
- `.trellis/` 是 Trellis 规范、当前任务和工作流（含本任务的 `prd.md` 与 `plan.md`）。

## 现在正在做什么

当前目标：在 `o-mall-v2/` 重构商城展示，**优先发布到 CloudBase 静态托管**。
商城静态 MVP **已完成并发布到 CloudBase 体验版**（前端已是完整商城，非脚手架占位）。

当前真实状态（已对照代码核验，2026-06-19）：

| 层 | 现状 | 位置 |
|----|------|------|
| Monorepo | pnpm workspace + TS ~5.7，包名 `@o-mall/*` | `o-mall-v2/` |
| 前端 | React 18.3 + Vite 6 + Wouter 3.3（**hash 路由**）；完整商城页面 | `artifacts/web/src/` |
| 页面 | 首页/商品列表/分类/详情(Tab)/我的/购物车/结算 + 5 内容页(企业/技术/公益/知识/评测)/产品功能 | `artifacts/web/src/pages/` |
| 静态图 | 8 张商城图已被首页/卡片/banner 引用，build 后进 `dist/images/` | `artifacts/web/public/images/` |
| 发布 | 已 `cloudbase hosting deploy` 到体验版 `meta-d5gh4ds014005aff1` | tcloudbaseapp.com |
| 后端 | 仅 `GET /health`（17 行），本阶段静态发布不依赖 | `artifacts/api-server/src/index.ts` |
| 数据库 | 已接 Drizzle，`schema/index.ts` 仍是**空占位（无表）** | `lib/db/src/` |
| API 合同 | `openapi.json` 仅 `/health` | `lib/api-spec/` |
| 文档/规范 | `AGENTS.md`、两个 README、`.trellis/` 全套已对齐 CloudBase | 根目录 / `.trellis/` |

> 线上：https://meta-d5gh4ds014005aff1-1369167244.tcloudbaseapp.com （免费测试域名首访有"风险提醒"拦截页，点"确定访问"进入；去掉需绑自有域名）
> 详细里程碑与进度看板见 **[`.trellis/tasks/pr1-omall-rewrite/plan.md`](./.trellis/tasks/pr1-omall-rewrite/plan.md)**（单一事实源，勿在别处复制进度）。

## 已知差距 / 待修正

- ✅ 路由已切 hash（`main.tsx` 用 `useHashLocation`），刷新子路径不 404。
- ✅ 商城图片已被页面引用，build 后进 `dist/images/`。
- CloudBase 体验版免费域名有"风险提醒"安全拦截页；要去掉需在 CloudBase 控制台**绑定自有域名**。
- `lib/db` schema、商品/订单 API、购物车/订单/支付均未实现 → MVP 后置（静态 MVP 不依赖）。

## 接下来要做什么

M1–M6 已全部完成并发布（详情、验收见 plan.md）。后续可选方向：

1. 在 CloudBase 控制台**绑定自有域名**，去掉免费测试域名的"风险提醒"拦截页。
2. 后置：Express 商品/订单 API、PostgreSQL 持久化（`lib/db` 建表）、OpenAPI 扩展。
3. 后置：腾讯云 Linux 服务器部署后端（当前第一发布目标仍是 CloudBase 静态托管）。
4. 体验增强：商品搜索、收藏页、骨架屏、图片懒加载优化。

前端体验借鉴 `shopTwo-main`：暖金 / 深绿 / 草本白底卡片风格；移动优先并适配桌面；详情页 Tab 含使用说明、配方成分、用户评价。

## Trellis 规则

- Trellis 文档在仓库根 `.trellis/`。有意义的开发前先读：
  - `.trellis/workflow.md`（五阶段工作流）
  - `.trellis/spec/guides/index.md` 和 `.trellis/spec/workspace/index.md`
  - 本任务的 `.trellis/tasks/pr1-omall-rewrite/{prd,plan}.md`
- 按改动类型读对应 spec：`monorepo.md` / `frontend.md` / `api-contracts.md` / `database.md` / `deployment.md`。
- 跨层改动必须同时补清楚合同：请求/响应字段、数据库 schema、环境变量、校验与错误行为、需要跑的检查。
- 沉淀：学到稳定规则更新 spec；命令/部署路径变化更新 README；新边界写入本文件；进度只更新 plan.md 看板。

## 协作与复查

- 本轮由 AI 按文档驱动（ssr 方法）完成文档与规范对齐；后续会用 **Trellis 技能复查**一致性。
- 复查重点：文档与代码是否一致、plan.md 看板是否反映真实进度、未发布是否被误写成已发布、`shopTwo-main` 是否被误当主源。

## 常用命令

从 `o-mall-v2/` 目录执行：

```powershell
pnpm install
pnpm --filter @o-mall/web run dev        # 开发服务（默认 http://localhost:5173）
pnpm --filter @o-mall/web run typecheck
pnpm --filter @o-mall/web run build      # 产物在 artifacts/web/dist
pnpm --filter @o-mall/web run preview     # 本地预览构建产物（验证刷新不 404）
cloudbase hosting deploy artifacts/web/dist   # 无默认环境时加 -e <env-id>
```

## 安全和边界

- 不要提交真实密钥、数据库密码、生产连接串；`.env.example` 只写示例值，`.env` 已被忽略。
- 不要删除或修改 `shopTwo-main/`，它是参考资料。
- 不要照搬参考项目的 Replit/Cloudflare 部署假设；当前第一发布目标是 CloudBase 静态托管，腾讯云 Linux 服务器后置。
- 不要把未接 API/数据库的静态演示写成已具备真实后端能力；未真实发布前文档只写"可发布/发布命令"，不写"已发布"。
- 如果命令或依赖不存在，记录缺口，不要假装已经具备。
