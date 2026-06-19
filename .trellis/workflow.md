# O-Mall Trellis 工作流

这是一套轻量 Trellis 规范，用来保证 O-Mall 重写始终围绕商城 MVP 和 CloudBase 优先发布目标推进。

## 阶段索引

### 阶段 1：明确范围

- 确认用户要改的是功能、文档、部署还是规范。
- 判断影响层：后端、前端、数据库、API 合同、部署、workspace 配置。
- 修改前读取相关 spec。

### 阶段 2：建立合同

涉及跨层行为时必须先明确合同。

- CloudBase 静态站优先明确构建目录、路由方式和静态资源来源。
- 有持久化数据时，先明确数据库表。
- 有接口暴露给前端或外部时，先明确 OpenAPI。
- README 和部署说明必须和实际命令、环境变量一致。

### 阶段 3：实现

- 活跃代码只放在 `o-mall-v2/`。
- `shopTwo-main/` 只读参考。
- 优先复用当前 workspace 模式。
- 不为了模仿参考项目而引入额外依赖。
- 前端静态 MVP 可以先用本地数据，避免被未完成 API 阻塞。

### 阶段 4：验证

- 运行和改动范围匹配的最便宜检查。
- 前端代码改动至少跑 `pnpm --filter @o-mall/web run typecheck`。
- 影响构建、部署或静态资源时再跑 `pnpm --filter @o-mall/web run build`。
- 文档改动要核对路径、命令和当前文件真实存在。

### 阶段 5：沉淀

- 学到稳定规则时更新 spec。
- 设置、命令、部署路径变化时更新 README。
- 未来 AI/开发者必须知道的边界写入 `AGENTS.md`。

## 技能路由

- 新功能或范围不清：先做 Trellis 规划。
- 写代码前：读 `spec/guides/index.md` 和相关 `spec/workspace/*.md`。
- 前端 UI：同时遵守前端体验和响应式设计要求。
- CloudBase 部署：读 `spec/workspace/deployment.md`。
- 纯文档：验证路径和命令，不凭印象写。

## 不要跳过

- 不要编辑 `shopTwo-main/`，除非用户明确要求。
- 不要让参考项目的 `@workspace/*` 包名混入重写项目；当前项目使用 `@o-mall/*`。
- 未真实部署前，不要把文档写成“已经部署完成”。
- 不要把密钥、数据库密码、生产连接串写入仓库。
