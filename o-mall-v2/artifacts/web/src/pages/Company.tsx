import { COMPANY } from "../data/content";

export function Company() {
  return (
    <div className="page">
      <header className="content-header">
        <span className="chip">企业简介</span>
        <h1>{COMPANY.title}</h1>
        <p>肝安人安 · 肽养身心</p>
      </header>

      <section className="cblock">
        <h3>关于我们</h3>
        {COMPANY.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div className="stat3">
          {COMPANY.stats.map((s) => (
            <div key={s.label} className="stat3-item">
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cblock">
        <h3>合作企业</h3>
        <div className="list-rows">
          {COMPANY.partners.map((p, i) => (
            <div key={p.name} className="list-row">
              <span className="list-no">{i + 1}</span>
              <div className="row-main">
                <b>{p.name}</b>
                <span>{p.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cblock">
        <h3>专家顾问</h3>
        {COMPANY.advisors.map((a) => (
          <div key={a.name} className="person">
            <span className="person-avatar" aria-hidden="true">
              {a.name.slice(0, 1)}
            </span>
            <div className="person-main">
              <div className="person-name">
                {a.name}
                {a.tag && <span className="person-tag">{a.tag}</span>}
              </div>
              <div className="person-title">{a.title}</div>
              <div className="person-desc">{a.desc}</div>
            </div>
          </div>
        ))}
      </section>

      <section className="cblock">
        <h3>团队核心成员</h3>
        {COMPANY.team.map((m) => (
          <div key={m.name} className="person">
            <span className="person-avatar" aria-hidden="true">
              {m.name.slice(0, 1)}
            </span>
            <div className="person-main">
              <div className="person-name">
                {m.name}
                {m.field && <span className="person-tag">{m.field}</span>}
              </div>
              <div className="person-title">{m.title}</div>
              <div className="person-desc">{m.desc}</div>
            </div>
          </div>
        ))}
      </section>

      <section className="cblock">
        <h3>联系我们</h3>
        {COMPANY.contact.map((c) => (
          <div key={c.label} className="contact-row">
            <span aria-hidden="true">{c.icon}</span>
            <span className="ck">{c.label}</span>
            <span>{c.value}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
