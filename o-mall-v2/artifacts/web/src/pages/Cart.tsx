import { Link, useLocation } from "wouter";
import { useCart } from "../state/cart";
import { formatPrice, RECOMMEND, getProduct } from "../data/catalog";
import { useShopUi } from "../state/shop-ui";

export function Cart() {
  const { lines, selectedTotal, setQty, remove, toggleSelect, add } = useCart();
  const { showToast, openSheet } = useShopUi();
  const [, navigate] = useLocation();

  const selectedCount = lines.filter((l) => l.selected).reduce((n, l) => n + l.qty, 0);
  const allSelected = lines.length > 0 && lines.every((l) => l.selected);
  const toggleAll = () => {
    const target = !allSelected;
    lines.forEach((l) => {
      if (l.selected !== target) toggleSelect(l.product.id);
    });
  };

  const addRecommend = () => {
    const p = getProduct(RECOMMEND.id);
    if (p) {
      add(p);
      showToast("搭配商品已加入购物车");
    }
  };

  if (lines.length === 0) {
    return (
      <div className="page empty-state">
        <p className="empty">购物车还是空的</p>
        <Link href="/products" className="btn btn-primary">
          去逛逛
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      {/* 信任 banner */}
      <div className="cart-banner">
        <div className="cart-banner-body">
          <b>肽护健康 · 安心选购</b>
          <p>品牌直供 · 科学验证 · 7天无理由</p>
          <div className="cart-banner-tags">
            <span className="chip">正品保障</span>
            <span className="chip">满299免运费</span>
            <span className="chip">会员9折</span>
          </div>
        </div>
        <span className="cart-seal" aria-hidden="true">
          肽
        </span>
      </div>

      <ul className="cart-list">
        {lines.map((l) => (
          <li key={l.product.id} className="cart-line">
            <label className="cart-check">
              <input type="checkbox" checked={l.selected} onChange={() => toggleSelect(l.product.id)} aria-label="选择" />
            </label>
            <img className="cart-img" src={l.product.image} alt={l.product.name} />
            <div className="cart-info">
              <Link href={`/product/${l.product.id}`} className="cart-name">
                {l.product.name}
              </Link>
              <span className="cart-spec">{l.product.spec}</span>
              <div className="cart-info-foot">
                <span className="price-now">{formatPrice(l.product.price)}</span>
                <div className="stepper">
                  <button onClick={() => setQty(l.product.id, l.qty - 1)} disabled={l.qty <= 1} aria-label="减少">
                    −
                  </button>
                  <span>{l.qty}</span>
                  <button onClick={() => setQty(l.product.id, l.qty + 1)} aria-label="增加">
                    +
                  </button>
                </div>
                <button
                  className="cart-remove"
                  onClick={() => {
                    remove(l.product.id);
                    showToast("商品已移除", "info");
                  }}
                  aria-label="移除"
                >
                  ×
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 搭配推荐 */}
      <div className="recommend">
        <img src={RECOMMEND.image} alt={RECOMMEND.name} />
        <div className="recommend-main">
          <span className="rec-label">搭配推荐 · 科学加乘</span>
          <b>{RECOMMEND.name}</b>
          <span>{RECOMMEND.detail}</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="price-now">¥{RECOMMEND.price}</div>
          <button className="btn-add" onClick={addRecommend}>
            加入
          </button>
        </div>
      </div>

      {/* 状态行 */}
      <div className="cart-status">
        <span>
          已选 <span className="accent">{selectedCount}</span> 件
        </span>
        <button className="inline-link" onClick={() => openSheet({ type: "coupons", title: "可用优惠券" })}>
          满 299 免运费 · 查看优惠券
        </button>
      </div>

      {/* 全选 + 结算 */}
      <div className="cart-bar">
        <label className="cart-bar-left">
          <input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="全选" />
          全选
        </label>
        <div className="cart-total">
          合计 <strong className="price-now">¥{selectedTotal}</strong>
        </div>
        <button className="btn btn-primary" disabled={selectedTotal <= 0} onClick={() => navigate("/checkout")}>
          去结算({selectedCount})
        </button>
      </div>
      <p className="hint">询价商品（企业专供）不计入结算金额。</p>
    </div>
  );
}
