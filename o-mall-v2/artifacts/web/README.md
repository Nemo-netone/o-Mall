# @o-mall/web

O-Mall 前端 Web 应用

## 技术栈

- **React 18** - UI 库
- **Vite 6** - 构建工具
- **TypeScript** - 类型安全
- **Wouter** - 轻量级路由 (2KB)

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm --filter @o-mall/web run dev

# 或从根目录
cd o-mall-v2
pnpm dev  # 同时启动 API 和前端
```

访问 http://localhost:5173

## 构建

```bash
pnpm --filter @o-mall/web run build
```

## API 代理

开发环境下，`/api` 请求会自动代理到 `http://localhost:3000`

```typescript
// 示例
fetch('/api/health')     // -> http://localhost:3000/api/health
fetch('/api/ai/chat')    // -> http://localhost:3000/api/ai/chat
```
