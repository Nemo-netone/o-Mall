import { Link } from "wouter";
import { COUPONS, ORDER_PREVIEW } from "../data/catalog";
import { useCatalog } from "../state/catalog";
import { useShopUi } from "../state/shop-ui";
import { AiAssistant } from "./AiAssistant";

function SheetContent() {
  const {
    sheet,
    closeSheet,
    claimedCoupons,
    claimCoupon,
    addresses,
    selectedAddress,
    selectAddress,
    favorites,
    showToast,
  } = useShopUi();
  const { products } = useCatalog();
  if (!sheet) return null;

  if (sheet.type === "ai") {
    return <AiAssistant productName={sheet.productName} />;
  }

  if (sheet.type === "coupons") {
    return (
      <>
        <p className="sheet-sub">领取后将在结算页自动用于演示优惠，本 MVP 不产生真实订单。</p>
        <div className="coupon-list">
          {COUPONS.map((coupon) => {
            const claimed = claimedCoupons.includes(coupon.id);
            return (
              <div key={coupon.id} className="coupon-card">
                <div>
                  <b>{coupon.value}</b>
                  <span>{coupon.title}</span>
                  <small>{coupon.desc}</small>
                </div>
                <button className="mini-btn" disabled={claimed} onClick={() => claimCoupon(coupon.id)}>
                  {claimed ? "已领取" : "领取"}
                </button>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  if (sheet.type === "contact") {
    return (
      <div className="contact-panel">
        <p className="sheet-sub">{sheet.productName ? `咨询商品：${sheet.productName}` : "客服将在工作时间内回复。"}</p>
        <a href="tel:400-800-2026" className="contact-action">
          <span>电话咨询</span>
          <b>400-800-2026</b>
        </a>
        <a href="mailto:sales@o-mall.example" className="contact-action">
          <span>企业采购邮箱</span>
          <b>sales@o-mall.example</b>
        </a>
        <div className="contact-action muted-card">
          <span>微信客服</span>
          <b>OMALL-HEALTH</b>
        </div>
      </div>
    );
  }

  if (sheet.type === "address") {
    return (
      <div className="address-list">
        {addresses.map((address) => (
          <button
            key={address.id}
            className={address.id === selectedAddress.id ? "address-option active" : "address-option"}
            onClick={() => selectAddress(address.id)}
          >
            <span className="address-tag">{address.tag}</span>
            <b>
              {address.name} {address.phone}
            </b>
            <small>{address.line}</small>
          </button>
        ))}
        <button className="mini-btn full" onClick={closeSheet}>
          使用当前地址
        </button>
      </div>
    );
  }

  if (sheet.type === "favorites") {
    const favoriteProducts = products.filter((product) => favorites.includes(product.id));
    return favoriteProducts.length ? (
      <div className="sheet-list">
        {favoriteProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="sheet-product" onClick={closeSheet}>
            <img src={product.image} alt={product.name} />
            <span>{product.name}</span>
          </Link>
        ))}
      </div>
    ) : (
      <p className="sheet-empty">还没有收藏商品，去详情页点收藏即可加入。</p>
    );
  }

  if (sheet.type === "orders") {
    return (
      <div className="sheet-list">
        {ORDER_PREVIEW.map((order) => (
          <div key={order.id} className="order-preview">
            <div>
              <b>{order.title}</b>
              <span>{order.status}</span>
            </div>
            <small>{order.amount}</small>
          </div>
        ))}
      </div>
    );
  }

  if (sheet.type === "history") {
    return (
      <div className="sheet-list">
        {products.slice(0, 4).map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="sheet-product" onClick={closeSheet}>
            <img src={product.image} alt={product.name} />
            <span>{product.name}</span>
          </Link>
        ))}
      </div>
    );
  }

  if (sheet.type === "service") {
    return (
      <div className="sheet-list">
        <div className="service-row">
          <b>退换货服务</b>
          <span>7 天无理由演示入口，真实售后以后接后端。</span>
        </div>
        <div className="service-row">
          <b>物流查询</b>
          <span>模拟订单会展示 48 小时内发货提示。</span>
        </div>
        <button className="mini-btn full" onClick={() => closeSheet()}>
          我知道了
        </button>
      </div>
    );
  }

  if (sheet.type === "share") {
    return (
      <div className="sheet-list">
        <p className="sheet-sub">分享活动为静态演示，可用于展示商城转化路径。</p>
        <div className="share-code">OMALL2026</div>
        <button
          className="mini-btn full"
          onClick={() => {
            void navigator.clipboard?.writeText("OMALL2026");
            showToast("分享码已复制");
          }}
        >
          复制分享码
        </button>
      </div>
    );
  }

  return (
    <div className="sheet-list">
      <p className="sheet-sub">会员权益包括专属折扣、优先发货、健康顾问和新品试用。</p>
      <button
        className="mini-btn full"
        onClick={() => {
          showToast("已开通演示会员");
          closeSheet();
        }}
      >
        开通演示会员
      </button>
    </div>
  );
}

export function GlobalOverlays() {
  const { toast, sheet, closeSheet } = useShopUi();

  return (
    <>
      {toast && (
        <div key={toast.id} className={`toast ${toast.tone}`} role="status" aria-live="polite">
          {toast.message}
        </div>
      )}

      {sheet && (
        <div className="sheet-backdrop" onClick={closeSheet}>
          <section
            className={sheet.type === "ai" ? "glass-sheet ai-sheet" : "glass-sheet"}
            onClick={(event) => event.stopPropagation()}
            aria-label={sheet.title ?? "操作面板"}
          >
            <div className="sheet-handle" />
            <div className="sheet-head">
              <h3>{sheet.title ?? "操作面板"}</h3>
              <button className="icon-action" onClick={closeSheet} aria-label="关闭">
                ×
              </button>
            </div>
            <SheetContent />
          </section>
        </div>
      )}
    </>
  );
}
