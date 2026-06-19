import { TECH } from "../data/content";

export function Tech() {
  return (
    <div className="page">
      <header className="content-header gold">
        <span className="chip">{TECH.banner.chip}</span>
        <h1>{TECH.banner.title}</h1>
        <p>{TECH.banner.sub}</p>
        <div className="stat3" style={{ marginTop: "0.9rem" }}>
          {TECH.banner.stats.map((s) => (
            <div key={s.label} className="stat3-item" style={{ background: "rgba(255,255,255,0.18)" }}>
              <b style={{ color: "#fff" }}>{s.value}</b>
              <span style={{ color: "rgba(255,255,255,0.85)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </header>

      {TECH.techs.map((t) => (
        <section key={t.name} className="tech-card">
          <div className="tech-card-head">
            <span className="tech-ico" aria-hidden="true">
              🔬
            </span>
            <div>
              <b>{t.name}</b>
              <p>{t.intro}</p>
            </div>
          </div>
          <div className="pill-row" style={{ marginTop: "0.7rem", ["--theme" as string]: "var(--c-accent)" }}>
            {t.highlights.map((h) => (
              <span key={h} className="pill">
                {h}
              </span>
            ))}
          </div>
          <div className="maturity">
            <div className="maturity-label">
              <span>技术成熟度</span>
              <span>{t.maturity}%</span>
            </div>
            <div className="maturity-track">
              <div className="maturity-fill" style={{ width: `${t.maturity}%` }} />
            </div>
          </div>
          <p className="tech-detail">{t.detail}</p>
        </section>
      ))}

      <section className="cblock">
        <h3>生产工艺流程</h3>
        <div className="process">
          {TECH.process.map((p, i) => (
            <div key={p} className="process-node">
              <div className="process-circle">
                <b>{i + 1}</b>
                <span>{p}</span>
              </div>
              {i < TECH.process.length - 1 && (
                <span className="process-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="cblock">
        <h3>技术指标</h3>
        <div>
          {TECH.indicators.map((it) => (
            <div key={it.label} className="param-row">
              <span className="param-k">{it.label}</span>
              <span className="param-v">{it.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cblock">
        <h3>核心专利</h3>
        {TECH.patents.map((p) => (
          <div key={p.no} className="patent">
            <span className="patent-no">{p.no}</span>
            <span>{p.name}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
