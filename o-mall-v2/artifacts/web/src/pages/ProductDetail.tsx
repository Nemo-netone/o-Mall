import { useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { formatPrice, ratingSummary } from "../data/catalog";
import { useCatalog, useProduct } from "../state/catalog";
import { useCart } from "../state/cart";
import { useShopUi } from "../state/shop-ui";
import { Stars } from "../components/Stars";
import { ProductCard } from "../components/ProductCard";
import { SectionHeader } from "../components/SectionHeader";
import { AppIcon, type AppIconName } from "../components/AppIcon";

type Tab = "usage" | "formula" | "reviews";

const DETAIL_FEATURE_ICONS: AppIconName[] = ["flask", "droplet", "shield"];

export function ProductDetail() {
  const { id } = useParams();
  const product = useProduct(id);
  const { products, categories } = useCatalog();
  const { add } = useCart();
  const { showToast, openSheet, isFavorite, toggleFavorite, selectedAddress } = useShopUi();
  const [, navigate] = useLocation();
  const [tab, setTab] = useState<Tab>("usage");
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="page empty-state">
        <h2>商品不存在</h2>
        <Link href="/products" className="btn btn-primary">
          返回商品列表
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const isInquiry = product.price <= 0;
  const favorite = isFavorite(product.id);
  const { avg, count, bars } = ratingSummary(product);
  const related = products.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id,
  ).slice(0, 4);

  return (
    <div className="page detail" style={{ ["--theme" as string]: product.theme }}>
      <Link href="/products" className="detail-back">
        ← 返回商品列表
      </Link>
      <div className="detail-actions-top">
        <button className={favorite ? "soft-action active" : "soft-action"} onClick={() => toggleFavorite(product)}>
          <AppIcon name={favorite ? "heart-filled" : "heart"} size={16} />
          {favorite ? "已收藏" : "收藏"}
        </button>
        <button
          className="soft-action"
          onClick={() => openSheet({ type: "contact", title: "联系客服", productId: product.id, productName: product.name })}
        >
          咨询客服
        </button>
        <button
          className="soft-action ai-soft-action"
          onClick={() => openSheet({ type: "ai", title: "问 AI 顾问", productId: product.id, productName: product.name })}
        >
          AI 搭配
        </button>
      </div>

      {/* Hero 卡 */}
      <div className="detail-hero">
        <div className="detail-hero-top">
          <div className="detail-hero-info">
            {product.badge && <span className="detail-badge">{product.badge}</span>}
            <h1 className="detail-name">{product.name}</h1>
            <p className="detail-summary">{product.summary}</p>
            <div className="feature-row">
              {product.features.map((f, index) => (
                <div key={f.title} className="feature-cell">
                  <span className="feature-ico" aria-hidden="true">
                    <AppIcon name={DETAIL_FEATURE_ICONS[index] ?? "sparkle"} size={19} />
                  </span>
                  <b>{f.title}</b>
                  <span>{f.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <img className="detail-hero-img" src={product.image} alt={product.name} />
        </div>

        {/* 价格条 + 销量徽章 */}
        <div className="price-bar">
          <div>
            <div className="price">
              <span className="price-now">{formatPrice(product.price)}</span>
              {product.originalPrice && <span className="price-old">¥{product.originalPrice}</span>}
            </div>
            <p className="price-bar-sub">
              {isInquiry ? "面向企业客户 · 支持配方定制" : `${product.spec} · 会员再享 9 折`}
            </p>
          </div>
          <div className="sales-badges">
            {product.sales && <span className="sales-badge">已售 {product.sales}</span>}
            {product.repurchase && <span className="sales-badge">复购 {product.repurchase}</span>}
          </div>
        </div>
      </div>

      <div className="deal-stack">
        <button className="deal-row" onClick={() => openSheet({ type: "coupons", title: "领取优惠券", productId: product.id })}>
          <span className="deal-k">优惠</span>
          <b>新人 ¥20 券、护肝专区 9 折券</b>
          <span>领取 ›</span>
        </button>
        <button className="deal-row" onClick={() => openSheet({ type: "address", title: "选择收货地址" })}>
          <span className="deal-k">配送</span>
          <b>{selectedAddress.line}</b>
          <span>切换 ›</span>
        </button>
        <div className="service-strip">
          <span>正品保障</span>
          <span>7天无理由</span>
          <span>满299免运费</span>
          <span>冷链/常温分仓</span>
          <button onClick={() => openSheet({ type: "ai", title: "AI 食用建议", productId: product.id, productName: product.name })}>
            AI 食用建议
          </button>
        </div>
      </div>

      {/* 购买数量（询价商品不显示） */}
      {!isInquiry && (
        <div className="qty-card">
          <span className="label">购买数量</span>
          <div className="stepper">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="减少">
              −
            </button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="增加">
              +
            </button>
          </div>
          <strong className="price-now">¥{product.price * qty}</strong>
        </div>
      )}

      {/* Tab 切换 */}
      <div className="tabs">
        <div className="tabs-head" role="tablist">
          <button role="tab" aria-selected={tab === "usage"} className={tab === "usage" ? "tab-btn active" : "tab-btn"} onClick={() => setTab("usage")}>
            使用说明
          </button>
          <button role="tab" aria-selected={tab === "formula"} className={tab === "formula" ? "tab-btn active" : "tab-btn"} onClick={() => setTab("formula")}>
            配方成分
          </button>
          <button role="tab" aria-selected={tab === "reviews"} className={tab === "reviews" ? "tab-btn active" : "tab-btn"} onClick={() => setTab("reviews")}>
            用户评价
          </button>
        </div>

        <div className="tab-body">
          {tab === "usage" && (
            <>
              <div className="tab-block">
                <h4>适用人群</h4>
                <div className="pill-row">
                  {product.suitable.map((s) => (
                    <span key={s} className="pill">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="tab-block">
                <h4>食用方法</h4>
                <ol className="steps">
                  {product.steps.map((s, i) => (
                    <li key={i} className="step">
                      <span className="step-no">{i + 1}</span>
                      <p>{s}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="tab-block">
                <h4>资质认证</h4>
                <div className="pill-row">
                  {product.certs.map((c) => (
                    <span key={c} className="pill">
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {tab === "formula" && (
            <>
              <div className="tab-block">
                <h4>配方成分</h4>
                <div className="ing-table">
                  <div className="ing-row ing-head">
                    <span className="ing-name">成分</span>
                    <span className="ing-amt">含量</span>
                    <span className="ing-eff">作用</span>
                  </div>
                  {product.ingredientTable.map((r) => (
                    <div key={r.name} className="ing-row">
                      <span className="ing-name">{r.name}</span>
                      <span className="ing-amt">{r.amount}</span>
                      <span className="ing-eff">{r.effect}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="tab-block">
                <h4>产品参数</h4>
                <div>
                  {product.params.map((p) => (
                    <div key={p.label} className={p.highlight ? "param-row hl" : "param-row"}>
                      <span className="param-k">{p.label}</span>
                      <span className="param-v">{p.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {tab === "reviews" && (
            <>
              <div className="rating-summary">
                <div className="rating-score">
                  <b>{avg}</b>
                  <Stars rating={Number(avg)} />
                  <small>{count} 条评价</small>
                </div>
                <div className="rating-bars">
                  {bars.map((b) => (
                    <div key={b.star} className="rating-bar">
                      <span>{b.star}星</span>
                      <span className="track">
                        <span className="fill" style={{ width: `${b.pct}%` }} />
                      </span>
                      <span>{b.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <ul className="reviews">
                {product.reviews.map((r, i) => (
                  <li key={`${r.user}-${i}`} className="review">
                    <div className="review-head">
                      <span className="review-avatar" aria-hidden="true">
                        {r.user.slice(0, 1)}
                      </span>
                      <span className="review-user">{r.user}</span>
                      {r.tag && <span className="review-tag">{r.tag}</span>}
                      <span className="review-date">{r.date}</span>
                    </div>
                    <Stars rating={r.rating} />
                    <p className="review-text">{r.text}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {category && (
        <p className="hint">
          所属分类：
          <Link href={`/products?cat=${category.id}`} style={{ color: "var(--c-primary-light)" }}>
            {category.title}
          </Link>
        </p>
      )}

      {/* 相关推荐：同类其他商品 */}
      {related.length > 0 && (
        <section className="section">
          <SectionHeader title="相关推荐" action="看更多" href={`/products?cat=${product.categoryId}`} />
          <div className="grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* 吸底操作栏 */}
      <div className="detail-bar">
        <Link href="/cart" className="detail-bar-ico" aria-label="购物车">
          <AppIcon name="cart" size={20} />
          <small>购物车</small>
        </Link>
        {isInquiry ? (
          <button
            className="btn btn-theme"
            style={{ flex: 2 }}
            onClick={() => openSheet({ type: "contact", title: "企业采购咨询", productId: product.id, productName: product.name })}
          >
            联系企业采购
          </button>
        ) : (
          <>
            <button
              className="btn btn-theme-ghost"
              onClick={() => {
                add(product, qty);
                showToast(`${product.name} 已加入购物车`);
              }}
            >
              加入购物车
            </button>
            <button
              className="btn btn-theme"
              onClick={() => {
                add(product, qty);
                showToast("已为你放入购物车，准备结算");
                navigate("/cart");
              }}
            >
              立即购买
            </button>
          </>
        )}
      </div>
    </div>
  );
}
