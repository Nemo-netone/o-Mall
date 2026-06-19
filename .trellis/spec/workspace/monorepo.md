# Monorepo 规范

## 范围

涉及包结构、命令、共享依赖、workspace 配置时使用本规范。

## Workspace 合同

- 包管理器：pnpm。
- workspace 包范围：
  - `o-mall-v2/artifacts/*`
  - `o-mall-v2/lib/*`
- 活跃包名使用 `@o-mall/*`。
- 不要把 `shopTwo-main` 里的 `@workspace/*` 包名带进来。

## 命令

```powershell
pnpm install
pnpm typecheck
pnpm build
pnpm dev
pnpm dev:web
```

## 依赖规则

- 多包共享依赖优先放到 `pnpm-workspace.yaml` 的 catalog。
- 保持 CloudBase 静态托管包体积优化意识；后续腾讯云 Linux x64 服务器部署再补服务端优化。
- 不因为参考项目用了某个依赖就照搬；借鉴思路，不照搬依赖树。

## 正例 / 基础 / 反例

- 正例：多个包都需要的合同放在 `lib/*`。
- 基础：只在一个应用里使用的功能留在对应 `artifacts/*`。
- 反例：从 `shopTwo-main` 直接 import 或复制生成文件。

## 必要检查

- 包结构或 TS 改动：`pnpm typecheck`。
- 依赖和构建相关改动：依赖可用时跑 `pnpm build`。
