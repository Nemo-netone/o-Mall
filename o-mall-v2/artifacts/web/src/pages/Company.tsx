import { useState } from "react";
import { COMPANY } from "../data/content";

function Person({ p }: { p: { name: string; title: string; desc: string; tag?: string } }) {
  return (
    <div className="person">
      <span className="person-avatar" aria-hidden="true">
        {p.name.slice(0, 1)}
      </span>
      <div className="person-main">
        <div className="person-name">
          {p.name}
          {p.tag && <span className="person-tag">{p.tag}</span>}
        </div>
        <div className="person-title">{p.title}</div>
        <div className="person-desc">{p.desc}</div>
      </div>
    </div>
  );
}

export function Company() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="page">
      <header className="content-header">
        <span className="chip">企业简介</span>
        <h1>一肽当先</h1>
        <p>{COMPANY.headerSub}</p>
      </header>

      {/* 企业简介 */}
      <section className="cblock">
        <h3>企业简介</h3>
        <p className="cblock-sub">{COMPANY.introSubtitle}</p>
        <div className="intro-para gold">{COMPANY.intro[0]}</div>
        <div className="intro-para green">{COMPANY.intro[1]}</div>
        <div className="stat3">
          {COMPANY.stats.map((s) => (
            <div key={s.label} className="stat3-item">
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 合作企业 */}
      <section className="cblock">
        <h3>已达成合作的企业</h3>
        <p className="cblock-sub">覆盖生产、加工、销售全链条，均已签订合作/供销协议</p>
        <div className="list-rows">
          {COMPANY.partnersMain.map((p, i) => (
            <div key={p.name} className="list-row">
              <span className="list-no">{i + 1}</span>
              <div className="row-main">
                <b>{p.name}</b>
                <span>{p.role}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="more-toggle" onClick={() => setShowMore((v) => !v)}>
          {showMore ? "收起 ▲" : `查看其他 ${COMPANY.partnersMore.length} 家合作企业 ▼`}
        </button>
        {showMore && (
          <div className="more-list">
            <p className="more-list-note">涉及产品应用、检测认证、跨境销售等多领域合作：</p>
            {COMPANY.partnersMore.map((name) => (
              <div key={name} className="more-list-row">
                ✓ {name}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 指导老师 / 专家顾问 */}
      <section className="cblock">
        <h3>指导老师</h3>
        {COMPANY.teachers.map((m) => (
          <Person key={m.name} p={m} />
        ))}
        <div className="cblock-divider">专家顾问</div>
        {COMPANY.experts.map((m) => (
          <Person key={m.name} p={m} />
        ))}
        <div className="note-box">ℹ {COMPANY.expertNote}</div>
      </section>
    </div>
  );
}
