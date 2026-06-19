import { useState } from "react";
import { KNOWLEDGE_CATS, HOT_TAGS, ARTICLES } from "../data/content";
import type { Article } from "../data/content";

export function Knowledge() {
  const [tab, setTab] = useState(0);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Article | null>(null);

  const filtered = ARTICLES.filter((a) => {
    const matchTab = tab === 0 || a.category === KNOWLEDGE_CATS[tab];
    const matchQ =
      query.length === 0 ||
      a.title.includes(query) ||
      a.subtitle.includes(query) ||
      a.tags.some((t) => t.includes(query));
    return matchTab && matchQ;
  });

  if (open) {
    const related = ARTICLES.filter((a) => a.id !== open.id).slice(0, 3);
    return (
      <div className="page">
        <header className="content-header">
          <span className="chip">{open.category}</span>
          <h1 style={{ fontSize: "1.25rem", lineHeight: 1.35 }}>{open.title}</h1>
          <p>{open.subtitle}</p>
        </header>

        <article className="cblock">
          <div className="article-meta" style={{ marginBottom: "0.6rem" }}>
            <span>📅 {open.date}</span>
            <span>👁 {open.reads}阅读</span>
            <span className="mins-pill">{open.mins}min</span>
          </div>
          <div className="pill-row" style={{ marginBottom: "0.8rem" }}>
            {open.tags.map((t) => (
              <span key={t} className="pill">
                #{t}
              </span>
            ))}
          </div>
          <div className="article-body">
            {open.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>

        <section className="cblock">
          <h3>相关阅读</h3>
          {related.map((a) => (
            <button key={a.id} className="related-row" onClick={() => setOpen(a)}>
              <span className="related-thumb" aria-hidden="true">
                📖
              </span>
              <div className="row-main">
                <b>{a.title}</b>
                <span>
                  {a.reads} · {a.mins}min
                </span>
              </div>
            </button>
          ))}
        </section>

        <button className="btn btn-ghost" onClick={() => setOpen(null)} style={{ width: "100%" }}>
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

      {/* 搜索 */}
      <div className="search-wrap">
        <span aria-hidden="true">🔍</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索文章标题、标签"
          aria-label="搜索文章"
        />
      </div>

      {/* 热标签 */}
      <div className="know-tabs">
        {HOT_TAGS.map((t) => (
          <button key={t} className="chip-btn" onClick={() => setQuery(t.slice(1))}>
            {t}
          </button>
        ))}
      </div>

      {/* 分类 */}
      <div className="know-tabs">
        {KNOWLEDGE_CATS.map((c, i) => (
          <button key={c} className={i === tab ? "chip-btn active" : "chip-btn"} onClick={() => setTab(i)}>
            {c}
          </button>
        ))}
      </div>

      {/* 文章列表 */}
      {filtered.length === 0 ? (
        <p className="empty" style={{ padding: "1.5rem 0", textAlign: "center" }}>
          没有匹配的文章
        </p>
      ) : (
        filtered.map((a) => (
          <button key={a.id} className="article" onClick={() => setOpen(a)}>
            <span className="article-thumb" aria-hidden="true">
              📖
            </span>
            <div className="article-main">
              <span className="article-cat">{a.category}</span>
              <div className="article-title">{a.title}</div>
              <div className="article-sub">{a.subtitle}</div>
              <div className="article-meta">
                <span>
                  {a.date} · {a.reads}阅读
                </span>
                <span className="mins-pill">{a.mins}min</span>
              </div>
            </div>
          </button>
        ))
      )}
    </div>
  );
}
