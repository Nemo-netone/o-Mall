# API 合同规范

## 1. 范围

新增或修改后端路由、前端 API 调用、OpenAPI schema、响应/错误格式时使用本规范。

## 2. 当前签名

当前路由：

```http
GET /health
```

当前响应：

```json
{
  "status": "ok",
  "timestamp": "2026-06-18T00:00:00.000Z"
}
```

## 3. 合同

- OpenAPI 真源：`o-mall-v2/lib/api-spec/openapi.json`。
- 后端实现：`o-mall-v2/artifacts/api-server/src/index.ts`。
- 公共 API 路径应先写入或同步写入 OpenAPI。
- 前端开发环境优先通过 `/api/*` 代理调用后端。
- 部署后如使用独立域名，需要显式配置 API base。

## 4. 校验和错误矩阵

| 条件 | 预期行为 |
| --- | --- |
| 请求有效 | 返回匹配 OpenAPI 的 2xx JSON |
| 输入非法 | 返回 400 JSON，包含稳定错误码/消息 |
| 资源不存在 | 返回 404 JSON，包含稳定错误码/消息 |
| 服务器或数据库失败 | 返回 500 JSON，不泄露密钥和内部连接串 |

## 5. 正例 / 基础 / 反例

- 正例：同时更新 `openapi.json`、后端路由、前端调用和 README。
- 基础：后端单路由改动也至少补 OpenAPI 和手动验证方式。
- 反例：前端依赖一个没有文档记录的响应字段。

## 6. 必要检查

- TypeScript API 改动后至少跑 `pnpm typecheck`。
- 新路由至少记录一个 HTTP 验证方式，例如：

```powershell
Invoke-WebRequest http://localhost:3000/health
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
