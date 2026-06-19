import { useState } from "react";
import { Link } from "wouter";
import { useCart } from "../state/cart";
import { PAY_METHODS } from "../data/catalog";
import { useShopUi } from "../state/shop-ui";

const SHIP_FREE_AT = 299;

export function Checkout() {
  const { lines, selectedTotal, clear } = useCart();
  const { showToast, openSheet, selectedAddress, claimedCoupons } = useShopUi();
  const [submitted, setSubmitted] = useState(false);
  const [pay, setPay] = useState(PAY_METHODS[0]!.key);
  const selected = lines.filter((l) => l.selected && l.product.price > 0);

  // 费用明细
  const goods = selectedTotal;
  const discount = Math.round(goods * 0.1); // 会员 9 折优惠
  const shipping = goods - discount >= SHIP_FREE_AT ? 0 : goods > 0 ? 12 : 0;
  const payable = Math.max(0, goods - discount + shipping);

  if (submitted) {
    return (
      <div className="page empty-state">
        <div className="success-icon" aria-hidden="true">
          ✓
        </div>
        <h2>支付成功（模拟）</h2>
        <strong className="price-now" style={{ fontSize: "1.4rem" }}>
          ¥{payable}
        </strong>
        <div className="success-order">订单编号 OM2026{String(Date.now()).slice(-6)} · {PAY_METHODS.find((m) => m.key === pay)?.label}</div>
        <p className="muted" style={{ fontSize: "0.82rem" }}>
          🚚 预计 48 小时内发货　·　🎁 获得 {payable} 积分
        </p>
        <p className="muted" style={{ fontSize: "0.78rem" }}>
          这是 CloudBase 静态 MVP 的下单模拟，未接入真实支付与后端。
        </p>
        <Link href="/" className="btn btn-primary">
          返回首页
        </Link>
      </div>
    );
  }

  if (selected.length === 0) {
    return (
      <div className="page empty-state">
        <p className="empty">没有可结算的商品</p>
        <Link href="/cart" className="btn btn-primary">
          返回购物车
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h2 className="page-title">确认订单</h2>

      {/* 收货地址 */}
      <button className="checkout-card checkout-address" onClick={() => openSheet({ type: "address", title: "选择收货地址" })}>
        <div className="checkout-card-head">
          <span aria-hidden="true">⌖</span>收货地址
          <small>切换 ›</small>
        </div>
        <div className="address-row">
          <b>{selectedAddress.name}</b>
          <span className="phone">{selectedAddress.phone}</span>
          <p>{selectedAddress.line}</p>
        </div>
      </button>

      {/* 商品清单 */}
      <section className="checkout-card">
        <div className="checkout-card-head">
          <span aria-hidden="true">📦</span>商品清单
        </div>
        {selected.map((l) => (
          <div key={l.product.id} className="order-line">
            <img src={l.product.image} alt={l.product.name} />
            <span className="order-name">
              {l.product.name}
              <span className="order-spec">{l.product.spec}</span>
            </span>
            <span className="order-qty">×{l.qty}</span>
            <span className="price-now">¥{l.product.price * l.qty}</span>
          </div>
        ))}
      </section>

      {/* 支付方式 */}
      <section className="checkout-card">
        <div className="checkout-card-head">
          <span aria-hidden="true">💳</span>支付方式
        </div>
        <div className="pay-methods">
          {PAY_METHODS.map((m) => (
            <button key={m.key} className={pay === m.key ? "pay-method sel" : "pay-method"} onClick={() => setPay(m.key)}>
              <span className="pay-ico" style={{ background: m.color }} aria-hidden="true">
                {m.icon}
              </span>
              <span className="pay-label">{m.label}</span>
              <span className="pay-radio" />
            </button>
          ))}
        </div>
      </section>

      <button className="checkout-card coupon-entry" onClick={() => openSheet({ type: "coupons", title: "订单优惠券" })}>
        <span>优惠券</span>
        <b>{claimedCoupons.length ? `已领取 ${claimedCoupons.length} 张，可用于演示抵扣` : "领取新人券 / 包邮券"}</b>
        <span>›</span>
      </button>

      {/* 费用明细 */}
      <section className="checkout-card">
        <div className="checkout-card-head">
          <span aria-hidden="true">🧾</span>费用明细
        </div>
        <div className="fee-row">
          <span className="fee-k">商品合计</span>
          <span className="fee-v">¥{goods}</span>
        </div>
        <div className="fee-row discount">
          <span className="fee-k">会员优惠</span>
          <span className="fee-v">−¥{discount}</span>
        </div>
        <div className={shipping === 0 ? "fee-row free" : "fee-row"}>
          <span className="fee-k">运费</span>
          <span className="fee-v">{shipping === 0 ? "免运费" : `¥${shipping}`}</span>
        </div>
        <div className="fee-row total">
          <span className="fee-k">实付款</span>
          <span className="fee-v">¥{payable}</span>
        </div>
      </section>

      {/* 支付条 */}
      <div className="pay-bar">
        <div className="pay-amount">
          实付款<b>¥{payable}</b>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setSubmitted(true);
            clear();
            showToast("模拟支付成功");
          }}
        >
          立即支付（模拟）
        </button>
      </div>
    </div>
  );
}
