import { Link } from "wouter";
import { VIP_BENEFITS } from "../data/catalog";
import { useCart } from "../state/cart";
import { useShopUi, type SheetType } from "../state/shop-ui";
import { TrustBadges } from "../components/TrustBadges";

const ORDER_ICONS = [
  { label: "待付款", icon: "¥", badge: 2, status: "待付款" },
  { label: "待发货", icon: "□", badge: 1, status: "待发货" },
  { label: "待收货", icon: "↗", badge: 1, status: "待收货" },
  { label: "已完成", icon: "✓", status: "已完成" },
];

const SERVICES = [
  { label: "我的优惠券", icon: "券", type: "coupons" },
  { label: "我的收藏", icon: "★", type: "favorites" },
  { label: "浏览记录", icon: "时", type: "history" },
  { label: "地址管理", icon: "址", type: "address" },
  { label: "售后服务", icon: "售", type: "service" },
  { label: "客服中心", icon: "聊", type: "contact" },
  { label: "分享有礼", icon: "礼", type: "share" },
  { label: "会员权益", icon: "VIP", type: "vip" },
] as const;

function Tile({
  icon,
  label,
  badge,
  onClick,
}: {
  icon: string;
  label: string;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button className="oicon" onClick={onClick}>
      <span className="oicon-circle" aria-hidden="true">
        {icon}
      </span>
      <span>{label}</span>
      {badge ? <span className="navbadge">{badge}</span> : null}
    </button>
  );
}

export function Profile() {
  const { count } = useCart();
  const { favorites, claimedCoupons, openSheet } = useShopUi();

  return (
    <div className="page">
      <section className="profile-hero">
        <div className="profile-user">
          <span className="profile-avatar" aria-hidden="true">
            ◎
          </span>
          <div className="profile-user-info">
            <div className="profile-name">
              健康会员<span className="vip-pill">VIP</span>
            </div>
            <div className="profile-sign">科学配比 · 肽养身心</div>
          </div>
          <button
            className="btn btn-gold"
            style={{ padding: "0.4rem 0.9rem", fontSize: "0.8rem" }}
            onClick={() => openSheet({ type: "vip", title: "会员权益" })}
          >
            开通会员
          </button>
        </div>
        <div className="profile-stats">
          <Link href="/cart" className="profile-stat">
            <b>{count}</b>
            <span>购物车</span>
          </Link>
          <button className="profile-stat" onClick={() => openSheet({ type: "favorites", title: "我的收藏" })}>
            <b>{favorites.length}</b>
            <span>收藏</span>
          </button>
          <button className="profile-stat" onClick={() => openSheet({ type: "coupons", title: "我的优惠券" })}>
            <b>{claimedCoupons.length || 3}</b>
            <span>优惠券</span>
          </button>
          <div className="profile-stat">
            <b>320</b>
            <span>积分</span>
          </div>
        </div>
      </section>

      <section className="cblock" style={{ marginTop: "1rem" }}>
        <div className="cblock-head">
          <h3>我的订单</h3>
          <button className="more-link as-button" onClick={() => openSheet({ type: "orders", title: "全部订单" })}>
            全部订单 →
          </button>
        </div>
        <div className="order-icons">
          {ORDER_ICONS.map((o) => (
            <Tile
              key={o.label}
              icon={o.icon}
              label={o.label}
              badge={o.badge}
              onClick={() => openSheet({ type: "orders", title: o.label, status: o.status })}
            />
          ))}
        </div>
      </section>

      <section className="cblock">
        <h3>我的服务</h3>
        <div className="service-grid">
          {SERVICES.map((s) => (
            <Tile
              key={s.label}
              icon={s.icon}
              label={s.label}
              onClick={() => openSheet({ type: s.type as SheetType, title: s.label })}
            />
          ))}
        </div>
      </section>

      <section className="vip-card">
        <div className="vip-card-head">
          <span className="vip-pill">VIP</span>
          <b>会员权益中心</b>
        </div>
        <div className="vip-grid">
          {VIP_BENEFITS.map((v) => (
            <button key={v.label} className="vip-item" onClick={() => openSheet({ type: "vip", title: v.label })}>
              <span className="vip-item-ico" aria-hidden="true">
                {v.icon}
              </span>
              <b>{v.label}</b>
              <span>{v.sub}</span>
            </button>
          ))}
        </div>
      </section>

      <div style={{ marginTop: "1rem" }}>
        <TrustBadges />
      </div>
    </div>
  );
}
