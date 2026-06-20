import { Link } from "wouter";
import { HERO, HOME_STATS, FEATURE_CARDS, QUICK_NAV, SCIENCE_BANNER } from "../data/catalog";
import { useCatalog } from "../state/catalog";
import { ProductCard } from "../components/ProductCard";
import { SectionHeader } from "../components/SectionHeader";
import { TrustBadges } from "../components/TrustBadges";
import { useShopUi } from "../state/shop-ui";

export function Home() {
  const { products } = useCatalog();
  const { openSheet } = useShopUi();
  const featured = products.slice(0, 4);

  return (
    <div className="page">
      {/* Hero */}
      <section className="hero" style={{ backgroundImage: `url(${HERO.image})` }}>
        <div className="hero-mask">
          <span className="hero-chip">{HERO.chip}</span>
          <h1 className="hero-title">{HERO.title}</h1>
          <div className="hero-rule" />
          <p className="hero-sub">{HERO.subtitle}</p>
          <div className="hero-actions">
            <Link href={HERO.href} className="btn btn-gold">
              {HERO.cta}
            </Link>
            <button className="btn hero-ai-btn" onClick={() => openSheet({ type: "ai", title: "AI 健康顾问" })}>
              AI 帮我选
            </button>
          </div>
        </div>
      </section>

      {/* 科学数据条 */}
      <div className="statbar">
        {HOME_STATS.map((s) => (
          <div key={s.label} className="statbar-item">
            <span className="statbar-val">{s.value}</span>
            <span className="statbar-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* 精选专区 */}
      <section className="section">
        <SectionHeader title="精选专区" />
        <div className="feature-grid">
          {FEATURE_CARDS.map((f) => (
            <Link
              key={f.id}
              href={f.href}
              className="feature-card"
              style={{ backgroundImage: `url(${f.image})` }}
            >
              <div className="feature-mask">
                <h3>{f.title}</h3>
                <p>{f.subtitle}</p>
                <span className="feature-cta">{f.cta}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 圆形快捷导航 → 内容展示页 */}
      <section className="section">
        <SectionHeader title="探索健康" />
        <nav className="quicknav">
          {QUICK_NAV.map((q) => (
            <Link key={q.href} href={q.href} className="quicknav-item">
              <span className="quicknav-ico" style={{ background: q.bg, color: q.color }} aria-hidden="true">
                {q.icon}
              </span>
              <span className="quicknav-label">{q.label}</span>
            </Link>
          ))}
        </nav>
      </section>

      {/* 热销好物 */}
      <section className="section">
        <SectionHeader title="热销好物" action="全部" href="/products" />
        <div className="grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 科学护肝 banner */}
      <section className="section">
        <Link href={SCIENCE_BANNER.href} className="science">
          <div className="science-body">
            <span className="science-chip">{SCIENCE_BANNER.chip}</span>
            <h3 className="science-title">{SCIENCE_BANNER.title}</h3>
            <p className="science-sub">{SCIENCE_BANNER.sub}</p>
            <span className="science-btn">{SCIENCE_BANNER.cta} →</span>
          </div>
          <div className="science-stats">
            {SCIENCE_BANNER.stats.map((s) => (
              <div key={s.label} className="science-stat">
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </Link>
      </section>

      {/* 信任徽章 */}
      <TrustBadges />
    </div>
  );
}
