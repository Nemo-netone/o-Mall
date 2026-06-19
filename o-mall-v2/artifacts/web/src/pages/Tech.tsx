import { useState } from "react";
import { TECH } from "../data/content";

export function Tech() {
  const [idx, setIdx] = useState(TECH.defaultIdx);
  const tech = TECH.techs[idx]!;

  return (
    <div className="page">
      <header className="content-header">
        <span className="chip">首创技术</span>
        <h1>首创技术</h1>
        <p>{TECH.headerSub}</p>
      </header>

      {/* 金色 banner */}
      <div className="gold-banner">
        <h3>{TECH.banner.title}</h3>
        <p>{TECH.banner.sub}</p>
        <div className="gold-banner-stats">
          {TECH.banner.stats.map((s) => (
            <div key={s.label} className="gbs-item">
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 技术选择 */}
      <div className="seg-tabs" style={{ ["--theme" as string]: "var(--c-accent)" }}>
        {TECH.techs.map((t, i) => (
          <button key={t.name} className={i === idx ? "seg-tab active" : "seg-tab"} onClick={() => setIdx(i)}>
            {t.name}
          </button>
        ))}
      </div>

      {/* 技术详情 */}
      <section className="tech-card" style={{ ["--theme" as string]: "var(--c-accent)" }}>
        <div className="tech-card-head">
          <span className="tech-ico" aria-hidden="true">
            {tech.icon}
          </span>
          <div>
            <b>{tech.name}</b>
            <p>{tech.intro}</p>
          </div>
        </div>
        <div className="pill-row" style={{ margin: "0.4rem 0 0.9rem" }}>
          {tech.highlights.map((h) => (
            <span key={h} className="pill">
              ✓ {h}
            </span>
          ))}
        </div>
        <div className="maturity">
          <div className="maturity-label">
            <span>技术成熟度</span>
            <span>{tech.maturity}%</span>
          </div>
          <div className="maturity-track">
            <div className="maturity-fill" style={{ width: `${tech.maturity}%` }} />
          </div>
        </div>
        <p className="tech-detail">{tech.detail}</p>
      </section>

      {/* 生产工艺流程 */}
      <section className="cblock">
        <h3>生产工艺流程</h3>
        <div className="process">
          {TECH.flow.map((p, i) => (
            <div key={p} className="process-node">
              <div className="process-circle">
                <b>{i + 1}</b>
                <span>{p}</span>
              </div>
              {i < TECH.flow.length - 1 && (
                <span className="process-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 关键技术指标 */}
      <section className="cblock">
        <h3>关键技术指标</h3>
        <div>
          {TECH.indicators.map((it) => (
            <div key={it.label} className={it.highlight ? "param-row hl" : "param-row"} style={{ ["--theme" as string]: "var(--c-accent)" }}>
              <span className="param-k">{it.label}</span>
              <span className="param-v">{it.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 核心专利与论文 */}
      <section className="cblock">
        <h3>核心专利与论文</h3>
        {TECH.patents.map((p) => (
          <div key={p.title} className="patent">
            <span className="patent-no">{p.type}</span>
            <div>
              <div className="patent-title">{p.title}</div>
              <div className="patent-meta">
                {p.no} · {p.year}年
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
