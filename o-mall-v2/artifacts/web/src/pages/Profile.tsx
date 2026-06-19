import { Link } from "wouter";
import { VIP_BENEFITS } from "../data/catalog";
import { useCart } from "../state/cart";
import { TrustBadges } from "../components/TrustBadges";

const ORDER_ICONS = [
  { label: "待付款", icon: "💳", badge: 2, href: "/cart" },
  { label: "待发货", icon: "📦", badge: 1, href: "/cart" },
  { label: "待收货", icon: "🚚", badge: 1, href: "/cart" },
  { label: "已完成", icon: "✅", href: "/cart" },
];

// href 以 mailto: 开头的走 <a>，其余走站内 <Link>
const SERVICES = [
  { label: "我的优惠券", icon: "🏷️", href: "/products" },
  { label: "我的收藏", icon: "⭐", href: "/products" },
  { label: "浏览记录", icon: "🕘", href: "/products" },
  { label: "地址管理", icon: "📍", href: "/checkout" },
  { label: "售后服务", icon: "🎧", href: "/functions" },
  { label: "客服中心", icon: "💬", href: "mailto:sales@o-mall.example" },
  { label: "分享有礼", icon: "🎁", href: "/charity" },
  { label: "联系客服", icon: "📞", href: "mailto:sales@o-mall.example" },
];

/** 宫格图标：内部链接用 Link，mailto 用 a */
function Tile({ href, icon, label, badge }: { href: string; icon: string; label: string; badge?: number }) {
  const inner = (
    <>
      <span className="oicon-circle" aria-hidden="true">
        {icon}
      </span>
      <span>{label}</span>
      {badge ? <span className="navbadge">{badge}</span> : null}
    </>
  );
  if (href.startsWith("mailto:")) {
    return (
      <a className="oicon" href={href}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className="oicon">
      {inner}
    </Link>
  );
}

export function Profile() {
  const { count } = useCart();

  return (
    <div className="page">
      {/* 渐变头部 */}
      <section className="profile-hero">
        <div className="profile-user">
          <span className="profile-avatar" aria-hidden="true">
            👤
          </span>
          <div className="profile-user-info">
            <div className="profile-name">
              健康会员<span className="vip-pill">VIP</span>
            </div>
            <div className="profile-sign">科学配比 · 肽养身心</div>
          </div>
          <Link href="/functions" className="btn btn-gold" style={{ padding: "0.4rem 0.9rem", fontSize: "0.8rem" }}>
            开通会员
          </Link>
        </div>
        <div className="profile-stats">
          <Link href="/cart" className="profile-stat">
            <b>{count}</b>
            <span>购物车</span>
          </Link>
          <Link href="/products" className="profile-stat">
            <b>0</b>
            <span>收藏</span>
          </Link>
          <div className="profile-stat">
            <b>320</b>
            <span>积分</span>
          </div>
          <div className="profile-stat">
            <b>3</b>
            <span>优惠券</span>
          </div>
        </div>
      </section>

      {/* 我的订单 */}
      <section className="cblock" style={{ marginTop: "1rem" }}>
        <div className="cblock-head">
          <h3>我的订单</h3>
          <Link href="/cart" className="more-link">
            全部订单 →
          </Link>
        </div>
        <div className="order-icons">
          {ORDER_ICONS.map((o) => (
            <Tile key={o.label} href={o.href} icon={o.icon} label={o.label} badge={o.badge} />
          ))}
        </div>
      </section>

      {/* 服务 */}
      <section className="cblock">
        <h3>我的服务</h3>
        <div className="service-grid">
          {SERVICES.map((s) => (
            <Tile key={s.label} href={s.href} icon={s.icon} label={s.label} />
          ))}
        </div>
      </section>

      {/* VIP 权益 */}
      <section className="vip-card">
        <div className="vip-card-head">
          <span className="vip-pill">VIP</span>
          <b>会员权益中心</b>
        </div>
        <div className="vip-grid">
          {VIP_BENEFITS.map((v) => (
            <div key={v.label} className="vip-item">
              <span className="vip-item-ico" aria-hidden="true">
                {v.icon}
              </span>
              <b>{v.label}</b>
              <span>{v.sub}</span>
            </div>
          ))}
        </div>
      </section>

      <div style={{ marginTop: "1rem" }}>
        <TrustBadges />
      </div>
    </div>
  );
}
