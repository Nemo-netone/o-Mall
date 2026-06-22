# Monorepo 规范

## 范围

涉及包结构、命令、共享依赖、workspace 配置时使用本规范。

## Workspace 合同

- 包管理器：pnpm。
- workspace 包范围：
  - `o-mall-v2/artifacts/*`
  - `o-mall-v2/lib/*`
- CloudBase 函数目录 `o-mall-v2/functions/*` 不属于 pnpm workspace 包，但属于当前项目部署资产。
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
- workspace 子包使用 catalog 依赖时，部署构建命令应从 `o-mall-v2/` 根执行，例如 `pnpm --filter @o-mall/web run build`，不要在 `artifacts/web` 子目录重新 `pnpm install`。

## 正例 / 基础 / 反例

- 正例：多个包都需要的合同放在 `lib/*`。
- 基础：只在一个应用里使用的功能留在对应 `artifacts/*`。
- 基础：CloudBase HTTP 函数放在 `functions/*`，通过 `cloudbaserc.json` 管理，不从前端包 import。
- 反例：从 `shopTwo-main` 直接 import 或复制生成文件。
- 反例：Vercel/CloudBase 构建命令进入子包后重新安装，导致 workspace catalog 解析不一致。

## 必要检查

- 包结构或 TS 改动：`pnpm typecheck`。
- 依赖和构建相关改动：依赖可用时跑 `pnpm build`。
