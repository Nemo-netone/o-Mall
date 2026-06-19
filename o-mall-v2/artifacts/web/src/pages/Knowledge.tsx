import { useState } from "react";
import { KNOWLEDGE_CATS, ARTICLES } from "../data/content";
import type { Article } from "../data/content";

export function Knowledge() {
  const [cat, setCat] = useState("全部");
  const [open, setOpen] = useState<Article | null>(null);

  const list = cat === "全部" ? ARTICLES : ARTICLES.filter((a) => a.cat === cat);

  if (open) {
    return (
      <div className="page">
        <header className="content-header">
          <span className="chip">{open.cat}</span>
          <h1 style={{ fontSize: "1.2rem" }}>{open.title}</h1>
          <p>
            {open.readTime} · {open.views} 阅读
          </p>
        </header>
        <section className="cblock article-body">
          {open.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
        <button className="btn btn-ghost" onClick={() => setOpen(null)}>
          ← 返回知识列表
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="content-header">
        <span className="chip">护肝知识</span>
        <h1>健康知识库</h1>
        <p>科学护肝 · 营养科普 · 肽科技解读</p>
      </header>

      <div className="know-tabs">
        {KNOWLEDGE_CATS.map((c) => (
          <button key={c} className={c === cat ? "chip-btn active" : "chip-btn"} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>

      {list.map((a) => (
        <button key={a.id} className="article" onClick={() => setOpen(a)}>
          <span className="article-thumb" aria-hidden="true">
            📖
          </span>
          <div className="article-main">
            <span className="article-cat">{a.cat}</span>
            <div className="article-title">{a.title}</div>
            <div className="article-meta">
              <span>⏱ {a.readTime}</span>
              <span>👁 {a.views}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
