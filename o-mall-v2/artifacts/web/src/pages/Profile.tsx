import { Link } from "wouter";
import { VIP_BENEFITS } from "../data/catalog";
import { useCart } from "../state/cart";
import { useShopUi, type SheetType } from "../state/shop-ui";
import { TrustBadges } from "../components/TrustBadges";
import { AppIcon, type AppIconName } from "../components/AppIcon";

const ORDER_ICONS = [
  { label: "待付款", icon: "wallet", badge: 2, status: "待付款" },
  { label: "待发货", icon: "package", badge: 1, status: "待发货" },
  { label: "待收货", icon: "truck", badge: 1, status: "待收货" },
  { label: "已完成", icon: "check", status: "已完成" },
] satisfies { label: string; icon: AppIconName; badge?: number; status: string }[];

const SERVICES = [
  { label: "AI顾问", icon: "sparkle", type: "ai" },
  { label: "我的优惠券", icon: "ticket", type: "coupons" },
  { label: "我的收藏", icon: "heart", type: "favorites" },
  { label: "浏览记录", icon: "clock", type: "history" },
  { label: "地址管理", icon: "pin", type: "address" },
  { label: "售后服务", icon: "shield", type: "service" },
  { label: "客服中心", icon: "headset", type: "contact" },
  { label: "分享有礼", icon: "gift", type: "share" },
  { label: "会员权益", icon: "user", type: "vip" },
] as const;

const VIP_ICONS: Record<string, AppIconName> = {
  肽产品: "droplet",
  护肝产品: "shield",
  健康管理: "heart",
  专属折扣: "ticket",
  极速发货: "truck",
  售后无忧: "headset",
};

function Tile({
  icon,
  label,
  badge,
  onClick,
}: {
  icon: AppIconName;
  label: string;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button className="oicon" onClick={onClick}>
      <span className="oicon-circle" aria-hidden="true">
        <AppIcon name={icon} size={20} />
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
            <AppIcon name="user" size={28} />
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
                <AppIcon name={VIP_ICONS[v.label] ?? "gift"} size={20} />
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
