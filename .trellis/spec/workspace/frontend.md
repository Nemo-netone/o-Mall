# 前端规范

## 范围

涉及 `o-mall-v2/artifacts/web`、可见 UI、路由、API 调用、响应式体验时使用本规范。

## 当前前端

- 框架：React 18。
- 构建工具：Vite 6。
- 路由：Wouter。
- 入口：`o-mall-v2/artifacts/web/src/main.tsx`。
- App 壳：`o-mall-v2/artifacts/web/src/App.tsx`。

## UI 方向

- 先做真实商城体验，不做营销落地页。
- 优先商品浏览、详情、产品内容展示、购物车、下单模拟和移动端可读性。
- 商城页面应实用、清晰、便于购买。
- 不照搬参考项目；只借鉴结构和交互思路。
- CloudBase 静态托管阶段使用 hash 路由，避免详情页刷新 404。
- 静态展示图片放在 `o-mall-v2/artifacts/web/public/images/`，不要运行时引用 `shopTwo-main`。

## API 合同

- 开发环境前端请求优先使用 `/api/*`。
- 引入类型生成或共享合同时，前端类型必须和 OpenAPI/共享合同一致。
- 数据页面必须处理加载、空状态、错误状态。

## 必要检查

```powershell
pnpm --filter @o-mall/web run typecheck
pnpm --filter @o-mall/web run build
```

## 常见错误

- 不要在组件里硬编码生产 API 域名。
- 不要只做桌面布局。
- 后端路由不存在时，不要在页面上宣称功能已完成。
