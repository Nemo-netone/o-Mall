# API 合同规范

## 1. 范围

新增或修改后端路由、前端 API 调用、OpenAPI schema、响应/错误格式时使用本规范。

## 2. 当前签名

当前路由：

```http
GET /health
GET /api/health
POST /api/ai/chat
```

健康检查响应：

```json
{
  "status": "ok",
  "timestamp": "2026-06-22T00:00:00.000Z"
}
```

AI 聊天请求：

```json
{
  "question": "经常应酬怎么选？",
  "productName": "肽润肝清® 护肝醒酒冲剂",
  "history": [{ "role": "user", "content": "我经常熬夜" }],
  "catalog": [
    {
      "id": "p2",
      "name": "肽润肝清® 护肝醒酒冲剂",
      "summary": "应酬前后一袋，温水冲服，清爽不负担",
      "price": 135,
      "suitable": ["经常应酬人群"]
    }
  ]
}
```

AI 聊天响应：

```json
{
  "answer": "推荐：肽润肝清® 护肝醒酒冲剂（¥135）...",
  "productIds": ["p2"],
  "prompts": ["经常熬夜怎么选？"],
  "source": "proxy"
}
```

## 3. 合同

- OpenAPI 真源：`o-mall-v2/lib/api-spec/openapi.json`。
- 后端实现：`o-mall-v2/artifacts/api-server/src/index.ts`。
- CloudBase HTTP 云函数实现：`o-mall-v2/functions/omall-ai-chat/index.js`。
- 公共 API 路径应先写入或同步写入 OpenAPI。
- 前端开发环境优先通过 `/api/*` 代理调用后端。
- 部署后如使用独立域名，需要显式配置 API base。
- AI 供应商密钥只能使用服务端环境变量 `SILICONFLOW_API_KEY`，不得放入前端 `.env`、源码、README 或构建产物。
- `POST /api/ai/chat` 允许两种请求方式：
  - `question` + `history` + `catalog`：后端组装 system prompt。
  - `messages`：调用方直接传入完整消息数组，后端仍校验至少一个 user 消息。

## 4. 校验和错误矩阵

| 条件 | 预期行为 |
| --- | --- |
| 请求有效 | 返回匹配 OpenAPI 的 2xx JSON |
| 输入非法 | 返回 400 JSON，包含稳定错误码/消息 |
| `POST /api/ai/chat` 缺少 user 消息 | 400 `{ "error": { "code": "INVALID_REQUEST" } }` |
| `SILICONFLOW_API_KEY` 未配置 | 503 `{ "error": { "code": "AI_PROXY_NOT_CONFIGURED" } }` |
| AI 上游非 2xx | 502 `{ "error": { "code": "AI_UPSTREAM_ERROR" } }` |
| AI 上游响应为空 | 502 `{ "error": { "code": "AI_EMPTY_RESPONSE" } }` |
| 资源不存在 | 返回 404 JSON，包含稳定错误码/消息 |
| 服务器或数据库失败 | 返回 500 JSON，不泄露密钥和内部连接串 |

## 5. 正例 / 基础 / 反例

- 正例：同时更新 `openapi.json`、后端路由/云函数、前端调用和 README。
- 基础：后端单路由改动也至少补 OpenAPI 和手动验证方式。
- 反例：前端依赖一个没有文档记录的响应字段。
- 反例：把 `SILICONFLOW_API_KEY` 写成 `VITE_*` 前端环境变量。

## 6. 必要检查

- TypeScript API 改动后至少跑 `pnpm typecheck`。
- 新路由至少记录一个 HTTP 验证方式，例如：

```powershell
Invoke-WebRequest http://localhost:3000/health
```

AI 代理本地验证（需要只在本机设置 `SILICONFLOW_API_KEY`）：

```powershell
Invoke-WebRequest `
  -Method POST `
  -Uri http://localhost:3000/api/ai/chat `
  -ContentType "application/json" `
  -Body '{"question":"经常应酬怎么选？","catalog":[]}'
```

## 7. 错误 vs 正确

错误：

```ts
res.json({ ok: true });
```

正确：

```ts
res.json({ status: "ok", timestamp: new Date().toISOString() });
```
