import { useState } from "react";
import { FUNCTIONS_PAGE } from "../data/content";
import { AppIcon, type AppIconName } from "../components/AppIcon";

const SCENE_ICONS: AppIconName[] = ["shield", "sparkle", "leaf"];
const DOSE_ICONS: AppIconName[] = ["droplet", "truck", "package", "flask"];

export function Functions() {
  const { fHero, scenes, doseForms, brands, brandsNote, specs, qa } = FUNCTIONS_PAGE;
  const [si, setSi] = useState(0);
  const [openQa, setOpenQa] = useState<number | null>(0);
  const fn = scenes[si]!;

  return (
    <div className="page">
      <header className="content-header">
        <span className="chip">产品功能</span>
        <h1>产品功能</h1>
        <p>高F值小麦低聚肽 · 三大功能场景</p>
      </header>

      {/* F 值 hero */}
      <div className="gold-banner f-hero">
        <h2>{fHero.value}</h2>
        <p>{fHero.sub}</p>
        <div className="f-bar">
          <div className="f-bar-fill" />
        </div>
        <small>{fHero.note}</small>
      </div>

      {/* 功能场景 tabs */}
      <div className="pill-row" style={{ ["--theme" as string]: "var(--c-accent)", marginBottom: "0.9rem" }}>
        {scenes.map((s, i) => (
          <button key={s.label} className={i === si ? "seg-pill active" : "seg-pill"} onClick={() => setSi(i)}>
            <AppIcon name={SCENE_ICONS[i] ?? "sparkle"} size={16} />
            {s.label}
          </button>
        ))}
      </div>

      {/* 场景详情 */}
      <section className="cblock">
        <p className="cblock-sub" style={{ color: "var(--c-primary)", fontWeight: 700 }}>
          {fn.tagline}
        </p>
        <div className="grid2">
          <div className="scene-cell">
            <span className="scene-label">适宜人群</span>
            <span className="scene-value">{fn.people}</span>
          </div>
          <div className="scene-cell">
            <span className="scene-label">建议用法</span>
            <span className="scene-value">{fn.dose}</span>
          </div>
        </div>
        <div className="cycle-row">
          <AppIcon name="clock" size={17} />
          使用周期：{fn.cycle}
        </div>
        <h4 style={{ margin: "0.2rem 0 0.6rem" }}>功能效果</h4>
        <ol className="steps">
          {fn.effects.map((e, i) => (
            <li key={i} className="step">
              <span className="step-no" style={{ background: "var(--c-accent)" }}>
                {i + 1}
              </span>
              <p>{e}</p>
            </li>
          ))}
        </ol>
        <div className="products-row">
          <AppIcon name="package" size={17} />
          推荐产品：{fn.products.join(" / ")}
        </div>
      </section>

      {/* 四大剂型 */}
      <section className="cblock">
        <h3>四大剂型 · 覆盖全场景</h3>
        <div className="grid2">
          {doseForms.map((d, index) => (
            <div key={d.name} className="dose-cell">
              <span className="dose-ico" aria-hidden="true">
                <AppIcon name={DOSE_ICONS[index] ?? "package"} size={22} />
              </span>
              <b>{d.name}</b>
              <span className="dose-scene">{d.scene}</span>
              <span className="dose-desc">{d.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* F 值竞品对比 */}
      <section className="cblock">
        <h3>F 值竞品对比</h3>
        {brands.map((b) => (
          <div key={b.name} className="brand-row">
            <div className={b.primary ? "brand-name primary" : "brand-name"}>{b.name}</div>
            <div className="brand-bar-area">
              <div className="brand-bar-bg">
                <div
                  className="brand-bar-fill"
                  style={{ width: `${(b.fValue / 50) * 100}%`, background: b.primary ? "var(--c-accent)" : "#bdbdb2" }}
                />
              </div>
              <span className="brand-bar-val" style={{ color: b.primary ? "var(--c-accent)" : "var(--c-muted)" }}>
                {b.fValue}
              </span>
            </div>
            <div className="brand-sub">
              {b.purity}% · {b.mw}
            </div>
          </div>
        ))}
        <p className="hint">{brandsNote}</p>
      </section>

      {/* 核心规格参数 */}
      <section className="cblock">
        <h3>核心规格参数</h3>
        <div>
          {specs.map(([k, v]) => (
            <div key={k} className={k === "F值" ? "param-row hl" : "param-row"} style={{ ["--theme" as string]: "var(--c-accent)" }}>
              <span className="param-k">{k}</span>
              <span className="param-v">{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 常见问答 */}
      <section className="cblock">
        <h3>常见问答</h3>
        {qa.map((item, i) => (
          <div key={i} className="qa-item">
            <button className="qa-q" onClick={() => setOpenQa(openQa === i ? null : i)}>
              <span className="qa-badge">Q</span>
              <span className="qa-question">{item.q}</span>
              <span className="qa-caret">{openQa === i ? "▲" : "▼"}</span>
            </button>
            {openQa === i && <div className="qa-answer">{item.a}</div>}
          </div>
        ))}
      </section>
    </div>
  );
}
