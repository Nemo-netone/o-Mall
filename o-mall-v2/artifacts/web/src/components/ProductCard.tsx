import { Link } from "wouter";
import type { Product } from "../types";
import { formatPrice } from "../data/catalog";
import { useCart } from "../state/cart";
import { useShopUi } from "../state/shop-ui";
import { AppIcon } from "./AppIcon";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { showToast, isFavorite, toggleFavorite } = useShopUi();
  const favorite = isFavorite(product.id);

  return (
    <div className="card product-card">
      <Link href={`/product/${product.id}`} className="product-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && <span className="tag-badge">{product.badge}</span>}
      </Link>
      <button className={favorite ? "favorite-dot active" : "favorite-dot"} onClick={() => toggleFavorite(product)} aria-label="收藏商品">
        <AppIcon name={favorite ? "heart-filled" : "heart"} size={18} />
      </button>
      <div className="product-body">
        <Link href={`/product/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <p className="product-summary">{product.summary}</p>
        <div className="product-tags">
          {product.tags.slice(0, 3).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        <div className="product-foot">
          <div className="price">
            <span className="price-now">{formatPrice(product.price)}</span>
            {product.originalPrice && <span className="price-old">¥{product.originalPrice}</span>}
          </div>
          {product.price > 0 ? (
            <button
              className="btn-add"
              onClick={() => {
                add(product);
                showToast(`${product.name} 已加入购物车`);
              }}
            >
              加入购物车
            </button>
          ) : (
            <Link href={`/product/${product.id}`} className="btn-add btn-ghost">
              查看详情
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
