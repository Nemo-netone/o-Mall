# pr1-omall-rewrite

## 目标

在 `o-mall-v2` 中重构 O-Mall 商城前端，并优先发布到 CloudBase 静态托管。

`shopTwo-main` 只作为参考项目，用来借鉴移动商城的信息结构、商品详情页、内容展示页和暖金草本系 UI 风格。当前项目必须形成自己的文件、路由、构建产物和部署路径。

## 当前阶段目标

1. 把 `o-mall-v2/artifacts/web` 从占位页面改成可展示的商城静态 MVP。
2. 尽量贴近 `shopTwo-main` 的前端展示：
   - 首页 hero、精选专区、快捷导航、科学数据区
   - 商品列表
   - 商品详情页
   - 使用说明 / 配方成分 / 用户评价
   - 产品功能内容展示页
   - 购物车和确认订单模拟流程
3. 先用静态数据和本地前端状态完成展示，不阻塞在 API、数据库和后台。
4. 让构建产物可以直接上传到 CloudBase 静态托管。

## 当前状态

- 主 workspace 在 `o-mall-v2`。
- API 服务已有 `GET /health`，但本阶段 CloudBase 静态发布不依赖 API。
- Web 前端原来只有首页、商品、关于三个占位路由，需要重构。
- DB 包已经接入 Drizzle/PostgreSQL，但暂不作为本阶段发布前置条件。
- OpenAPI 目前只包含健康检查接口，后续接真实商品/订单 API 时再扩展。
- CloudBase CLI 已安装，发布使用 `cloudbase hosting deploy artifacts/web/dist`。

## MVP 范围

1. 商城展示
   - 首页
   - 商品列表
   - 商品详情
   - 产品功能内容页
   - 企业/技术/公益等内容展示页
2. 静态购物流程
   - 加入购物车
   - 修改数量
   - 选择/移除商品
   - 确认订单模拟
3. CloudBase 发布
   - Web 构建通过
   - 静态资源进入 `dist`
   - 可通过 CloudBase 静态托管命令上传

## 暂不做

- 真实支付。
- 复杂用户账号体系。
- 完整管理后台。
- 真实 PostgreSQL 商品/订单持久化。
- 直接复制或修改 `shopTwo-main`。
- 把腾讯云 Linux 服务器作为第一发布目标。

## 验收标准

- `AGENTS.md` 写清当前目标是 CloudBase 静态托管优先。
- 根 `README.md` 写清 `shopTwo-main` 与 `o-mall-v2` 的边界。
- `o-mall-v2/README.md` 写清构建、预览和 CloudBase 发布命令。
- `.trellis/` 包含当前工作流和 CloudBase 部署规范。
- `o-mall-v2/artifacts/web` 展示接近参考商城风格，而不是默认占位页。
- Web 至少通过：
  - `pnpm --filter @o-mall/web run typecheck`
  - `pnpm --filter @o-mall/web run build`
- 未真实发布前，文档只能写“可发布/发布命令”，不能写“已经发布完成”。
