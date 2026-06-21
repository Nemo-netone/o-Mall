import { CHARITY } from "../data/content";

export function Charity() {
  const { banner, stats, wheat, actions, headerSub } = CHARITY;

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
    </div>
  );
}
