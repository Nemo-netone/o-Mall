# 前端规范

## 范围

涉及 `o-mall-v2/artifacts/web`、可见 UI、路由、API 调用、响应式体验时使用本规范。

## 当前前端

- 框架：React 18。
- 构建工具：Vite 6。
- 路由：Wouter。
- 入口：`o-mall-v2/artifacts/web/src/main.tsx`。
- App 壳：`o-mall-v2/artifacts/web/src/App.tsx`。
- 数据源：`src/state/catalog.tsx` 初始使用本地 `src/data/catalog.ts`，运行时尝试 `src/data/remote.ts` 读取 Supabase。
- AI 顾问：`src/data/ai.ts` 默认本地规则兜底；开发环境可走 `/api/ai/chat`，生产需显式配置 `VITE_AI_PROXY_URL`。

## UI 方向

- 先做真实商城体验，不做营销落地页。
- 优先商品浏览、详情、产品内容展示、购物车、下单模拟和移动端可读性。
- 商城页面应实用、清晰、便于购买。
- 不照搬参考项目；只借鉴结构和交互思路。
- CloudBase 静态托管阶段使用 hash 路由，避免详情页刷新 404。
- 静态展示图片放在 `o-mall-v2/artifacts/web/public/images/`，不要运行时引用 `shopTwo-main`。
- 商品列表、分类、首页和详情页读取 `useCatalog()`，不要直接在页面里再 import 远端客户端。
- Supabase 读库必须保留本地数据兜底：远端未配置、超时、报错、空数据都不能导致白屏。
- 结算页是模拟流程，所有文案都要避免暗示真实支付或真实下单已完成。

## API 合同

- 开发环境前端请求优先使用 `/api/*`。
- 引入类型生成或共享合同时，前端类型必须和 OpenAPI/共享合同一致。
- 数据页面必须处理加载、空状态、错误状态。
- 前端只允许保存 Supabase anon key 这类公开值；模型供应商 key、service_role、PAT、数据库密码不能写成 `VITE_*`。
- AI 代理地址只用 `VITE_AI_PROXY_URL` 指向自有后端或 CloudBase HTTP 云函数，例如 `/api/ai/chat`。

## 必要检查

```powershell
pnpm --filter @o-mall/web run typecheck
pnpm --filter @o-mall/web run build
```

## 常见错误

- 不要在组件里硬编码生产 API 域名。
- 不要只做桌面布局。
- 后端路由不存在时，不要在页面上宣称功能已完成。
- 不要删除 `CatalogProvider` 的本地初始数据；它是 Supabase 异常时不白屏的兜底。
- 不要让内容页读取 `content_pages` 但忘记处理未配置 Supabase 的回退路径。
- 不要把 CloudBase 静态站的 hash 路由改回 browser history，除非同时配置并验证静态托管 rewrite。
