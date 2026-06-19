import { Link } from "wouter";
import { VIP_BENEFITS } from "../data/catalog";
import { useCart } from "../state/cart";
import { TrustBadges } from "../components/TrustBadges";

const ORDER_ICONS = [
  { label: "待付款", icon: "💳", badge: 2 },
  { label: "待发货", icon: "📦", badge: 1 },
  { label: "待收货", icon: "🚚", badge: 1 },
  { label: "已完成", icon: "✅" },
];

const SERVICES = [
  { label: "我的优惠券", icon: "🏷️" },
  { label: "我的收藏", icon: "⭐" },
  { label: "浏览记录", icon: "🕘" },
  { label: "地址管理", icon: "📍" },
  { label: "售后服务", icon: "🎧" },
  { label: "客服中心", icon: "💬" },
  { label: "分享有礼", icon: "🎁" },
  { label: "联系客服", icon: "📞" },
];

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
          <div className="profile-stat">
            <b>{count}</b>
            <span>购物车</span>
          </div>
          <div className="profile-stat">
            <b>0</b>
            <span>收藏</span>
          </div>
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
        <h3>我的订单</h3>
        <div className="order-icons">
          {ORDER_ICONS.map((o) => (
            <div key={o.label} className="oicon">
              <span className="oicon-circle" aria-hidden="true">
                {o.icon}
              </span>
              <span>{o.label}</span>
              {o.badge ? <span className="navbadge">{o.badge}</span> : null}
            </div>
          ))}
        </div>
      </section>

      {/* 服务 */}
      <section className="cblock">
        <h3>我的服务</h3>
        <div className="service-grid">
          {SERVICES.map((s) => (
            <div key={s.label} className="oicon">
              <span className="oicon-circle" aria-hidden="true">
                {s.icon}
              </span>
              <span>{s.label}</span>
            </div>
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
