import { Route, Link } from "wouter";

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <h1>O-Mall 商城</h1>
        <div className="nav-links">
          <Link href="/">首页</Link>
          <Link href="/products">商品</Link>
          <Link href="/about">关于</Link>
        </div>
      </nav>

      <main className="main">
        <Route path="/">
          <Home />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </main>
    </div>
  );
}

function Home() {
  return (
    <div className="page">
      <h2>欢迎来到 O-Mall</h2>
      <p>现代化的电商平台</p>
      <div className="features">
        <div className="feature-card">
          <h3>🚀 高性能</h3>
          <p>基于 React + Vite 构建，极速加载体验</p>
        </div>
        <div className="feature-card">
          <h3>🔒 安全可靠</h3>
          <p>严格的供应链安全防护，24小时发布窗口</p>
        </div>
        <div className="feature-card">
          <h3>📦 易于扩展</h3>
          <p>Monorepo 架构，模块化设计</p>
        </div>
      </div>
    </div>
  );
}

function Products() {
  return (
    <div className="page">
      <h2>商品列表</h2>
      <p>商品功能开发中...</p>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <h2>关于我们</h2>
      <p>O-Mall 是一个基于现代化技术栈的电商平台</p>
      <ul>
        <li>前端：React + Vite + TypeScript</li>
        <li>后端：Express + PostgreSQL + Drizzle ORM</li>
        <li>架构：pnpm Monorepo</li>
      </ul>
    </div>
  );
}

export default App;
