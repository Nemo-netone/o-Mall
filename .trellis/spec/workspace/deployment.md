# CloudBase 部署规范

## 1. 范围

涉及 CloudBase 静态托管、构建产物、发布命令、环境 ID、后续腾讯云服务器部署时使用本规范。

当前阶段优先把 `o-mall-v2/artifacts/web` 发布为 CloudBase 静态站。Express API、PostgreSQL 和腾讯云 Linux 服务器部署后置。

AI 代理可以用 CloudBase HTTP 云函数部署，但它是后端代理能力，不改变静态商城优先的发布路线。

## 2. 当前签名

前端包：

```text
o-mall-v2/artifacts/web
```

构建目录：

```text
o-mall-v2/artifacts/web/dist
```

构建命令：

```powershell
cd E:\twentySixGitHub\ThreeStandard\o-Mall\o-mall-v2
pnpm --filter @o-mall/web run build
```

CloudBase 静态托管发布命令：

```powershell
cloudbase hosting deploy artifacts/web/dist
```

如果没有默认环境，显式指定：

```powershell
cloudbase hosting deploy artifacts/web/dist -e <env-id>
```

CloudBase HTTP 云函数配置：

```json
{
  "functionRoot": "functions",
  "functions": [
    {
      "name": "omall-ai-chat",
      "type": "HTTP",
      "runtime": "Nodejs20.19",
      "timeout": 20,
      "memorySize": 256
    }
  ]
}
```

云函数启动脚本：

```text
o-mall-v2/functions/omall-ai-chat/scf_bootstrap
```

## 3. 合同

- 目标平台：CloudBase 静态托管优先。
- 前端路由：静态站使用 hash 路由，例如 `/#/product/p2`，避免刷新详情页时依赖服务端 rewrite。
- 静态资源：商城图片放在 `o-mall-v2/artifacts/web/public/images/`，不要运行时引用 `shopTwo-main`。
- 构建产物：只发布 `artifacts/web/dist`，不要发布源码目录或密钥文件。
- AI 代理函数：使用 CloudBase HTTP 函数，`scf_bootstrap` 启动 Node Web Server，函数内监听 `9000`。
- AI 密钥：`SILICONFLOW_API_KEY` 只放 CloudBase 函数或自有后端环境变量，前端只配置 `VITE_AI_PROXY_URL=/api/ai/chat` 这类代理地址。
- API/数据库：当前 CloudBase 阶段先展示静态商城 MVP；后续接入 API 时再同步 OpenAPI、数据库和后端部署规范。
- 腾讯云 Linux：保留为后续可选部署路线，不再是当前第一发布目标。

## 4. 校验和错误矩阵

| 条件 | 预期行为 |
| --- | --- |
| `dist` 不存在 | 先运行 `pnpm --filter @o-mall/web run build` |
| CloudBase 未选择环境 | 使用 `-e <env-id>` 指定环境 |
| 详情页刷新 404 | 前端必须使用 hash 路由或配置静态托管 rewrite |
| 静态资源丢失 | 确认图片已进入 `artifacts/web/public/images/` 并随构建复制到 `dist/images/` |
| 需要真实 API | 不在静态页面硬编码生产 API，先补 OpenAPI 和后端部署方案 |
| HTTP 函数按事件函数部署 | `cloudbaserc.json` 中函数必须设置 `"type": "HTTP"` |
| HTTP 函数启动失败 | 确认 `scf_bootstrap` 存在、可执行、无 Windows CRLF，并且服务监听 9000 |
| AI 代理 503 | 在函数环境变量中配置 `SILICONFLOW_API_KEY` |

## 5. 正例 / 基础 / 反例

- 正例：本地构建通过后执行 `cloudbase hosting deploy artifacts/web/dist`。
- 基础：先发布可展示、可浏览、可看详情、可模拟购物车的静态 MVP。
- 基础：AI 代理使用 HTTP 云函数或自有后端；前端通过 `VITE_AI_PROXY_URL` 指向代理。
- 反例：把未接入的商品/购物车/订单 API 写成已经线上可用。
- 反例：把模型供应商 key 写到前端 `.env` 或构建命令里。

## 6. 必要检查

发布前至少执行：

```powershell
pnpm --filter @o-mall/web run typecheck
pnpm --filter @o-mall/web run build
```

发布后检查：

```powershell
cloudbase hosting list
```

HTTP 云函数部署前检查：

```powershell
git ls-files -s -- functions/omall-ai-chat/scf_bootstrap
```

`scf_bootstrap` 应是可执行文件；如果权限丢失，需要恢复可执行位后再部署。

也可以在 CloudBase 控制台打开静态网站域名，手动检查：

- 首页
- 商品列表
- 商品详情
- 产品功能内容页
- 购物车
- 确认订单模拟页

## 7. 错误 vs 正确

错误：

```text
把 shopTwo-main 当作生产静态资源来源。
```

正确：

```text
把需要的图片复制到 o-mall-v2/artifacts/web/public/images/，由当前项目独立构建和发布。
```
