import { CHARITY } from "../data/content";

export function Charity() {
  return (
    <div className="page">
      <header className="content-header">
        <span className="chip">{CHARITY.banner.chip}</span>
        <h1>{CHARITY.banner.title}</h1>
        <p>{CHARITY.banner.sub}</p>
      </header>

      <section className="cblock">
        <h3>计划理念</h3>
        <p>{CHARITY.intro}</p>
        <div className="stat3">
          {CHARITY.stats.map((s) => (
            <div key={s.label} className="stat3-item">
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cblock">
        <h3>助农项目</h3>
        <div className="list-rows">
          {CHARITY.projects.map((p) => (
            <div key={p.title} className="list-row">
              <span className="list-no" aria-hidden="true">
                🌾
              </span>
              <div className="row-main">
                <b>
                  {p.title} · <span style={{ color: "var(--c-primary-light)" }}>{p.place}</span>
                </b>
                <span>{p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cblock">
        <h3>公益足迹</h3>
        <div className="timeline">
          {CHARITY.activities.map((a) => (
            <div key={a.date} className="tl-item">
              <span className="tl-date">{a.date}</span>
              <b>{a.title}</b>
              <span>{a.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
