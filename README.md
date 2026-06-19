# o-Mall

这是 O-Mall 商城重写项目的工作区。当前主线是把 `o-mall-v2/` 重构成一个可展示、可构建、可优先发布到 CloudBase 静态托管的商城 MVP。

## 目录边界

```text
o-Mall/
├── AGENTS.md        # 给后续 AI/开发者看的持久说明
├── README.md        # 当前工作区总览
├── .trellis/        # Trellis 规范、任务和工作流
├── o-mall-v2/       # 正在重构和发布的商城主项目
└── shopTwo-main/    # 参考项目，只借鉴，不作为主线修改
```

## 主项目

实际开发请进入 `o-mall-v2/`。

当前主项目包含：

- pnpm workspace monorepo
- `artifacts/web`：Vite + React 商城前端，CloudBase 静态托管优先
- `artifacts/api-server`：Express API 服务，目前已有 `GET /health`
- `lib/db`：Drizzle/PostgreSQL 数据库包，后续接真实业务表
- `lib/api-spec`：OpenAPI 合同包，后续接商品/订单 API

## 参考项目

`shopTwo-main/` 只作参考。

可以借鉴：

- 移动商城首页结构
- 商品详情页信息组织
- 产品功能、企业、技术、公益等内容展示页思路
- 暖金、深绿、草本白底卡片的 UI 风格

不要把它当作当前主项目，不要直接改它，也不要从它运行时 import 文件。

## 当前方向

阶段一先完成 CloudBase 静态 MVP：

1. 首页展示
2. 商品列表
3. 商品详情
4. 产品功能内容页
5. 购物车和确认订单模拟
6. Web 构建
7. CloudBase 静态托管发布

后续再推进：

- Express 商品/订单 API
- PostgreSQL 持久化
- OpenAPI 合同完善
- 腾讯云 Linux 服务器部署

## 快速开始

```powershell
cd E:\twentySixGitHub\ThreeStandard\o-Mall\o-mall-v2
pnpm install
pnpm --filter @o-mall/web run dev
```

构建前端：

```powershell
pnpm --filter @o-mall/web run typecheck
pnpm --filter @o-mall/web run build
```

发布到 CloudBase 静态托管：

```powershell
cloudbase hosting deploy artifacts/web/dist
```

如果 CLI 没有默认环境：

```powershell
cloudbase hosting deploy artifacts/web/dist -e <env-id>
```

开始较大改动前先读：

- `AGENTS.md`
- `o-mall-v2/README.md`
- `.trellis/workflow.md`
- `.trellis/spec/guides/index.md`
- `.trellis/spec/workspace/index.md`
- `.trellis/tasks/pr1-omall-rewrite/prd.md`（当前任务目标与验收）
- `.trellis/tasks/pr1-omall-rewrite/plan.md`（里程碑与进度看板，进度的单一事实源）
