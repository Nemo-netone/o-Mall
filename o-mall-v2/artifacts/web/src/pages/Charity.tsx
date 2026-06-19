import { CHARITY } from "../data/content";

export function Charity() {
  const { banner, stats, wheat, actions, provinces, progress, farmers, footer, headerSub } = CHARITY;
  const pct = Math.round((progress.current / progress.target) * 100);

  return (
    <div className="page">
      <header className="content-header">
        <span className="chip">爱心助农</span>
        <h1>爱心助农</h1>
        <p>{headerSub}</p>
      </header>

      {/* banner */}
      <div className="green-banner">
        {banner.titleLines.map((t) => (
          <h2 key={t} className="green-banner-title">
            {t}
          </h2>
        ))}
        <p className="green-banner-sub">{banner.sub}</p>
        <div className="green-banner-tags">
          {banner.tags.map((t) => (
            <span key={t}>✓ {t}</span>
          ))}
        </div>
      </div>

      {/* 助农数据概览 */}
      <section className="cblock">
        <h3>助农数据概览</h3>
        <div className="grid2">
          {stats.map((s) => (
            <div key={s.label} className="stat-cell">
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 优质冬小麦原料基地 */}
      <section className="cblock">
        <img className="wheat-img" src={wheat.image} alt={wheat.title} loading="lazy" />
        <h3 style={{ marginTop: "0.8rem" }}>{wheat.title}</h3>
        <p>{wheat.desc}</p>
      </section>

      {/* 助农行动 */}
      <section className="cblock">
        <h3>助农行动</h3>
        {actions.map((a) => (
          <div key={a.title} className="action-row">
            <span className="action-ico" aria-hidden="true">
              {a.icon}
            </span>
            <div className="row-main">
              <b>{a.title}</b>
              <span>{a.detail}</span>
            </div>
          </div>
        ))}
      </section>

      {/* 合作基地分布 */}
      <section className="cblock">
        <h3>合作基地分布</h3>
        {provinces.map((p) => (
          <div key={p.name} className="province-row">
            <div className="row-main">
              <b>{p.name}</b>
              <span>{p.cities}</span>
            </div>
            <span className="province-count">{p.count}</span>
            <span className="province-unit">个</span>
          </div>
        ))}
      </section>

      {/* 本月助农进度 */}
      <section className="cblock">
        <div className="cblock-head">
          <h3>本月助农进度</h3>
          <span className="more-link">
            {progress.current.toLocaleString()} / {progress.target.toLocaleString()}份
          </span>
        </div>
        <div className="maturity-track" style={{ height: 10 }}>
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="hint">{progress.note}</p>
        <div className="stat3" style={{ marginTop: "0.8rem" }}>
          {progress.stats.map((s) => (
            <div key={s.label} className="stat3-item">
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 来自麦农的故事 */}
      <section className="cblock">
        <h3>来自麦农的故事</h3>
        {farmers.map((f) => (
          <div key={f.name} className="farmer">
            <div className="farmer-head">
              <span className="person-avatar" aria-hidden="true">
                {f.name.slice(0, 1)}
              </span>
              <div className="row-main">
                <div className="person-name">
                  {f.name}
                  <span className="person-tag">合作{f.years}年</span>
                </div>
                <span>{f.area}</span>
              </div>
            </div>
            <div className="story-bubble">{f.story}</div>
          </div>
        ))}
      </section>

      <div className="warm-footer">❤ {footer}</div>
    </div>
  );
}
