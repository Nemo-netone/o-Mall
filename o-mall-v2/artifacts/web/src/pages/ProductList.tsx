import { useState } from "react";
import { useSearch } from "wouter";
import { CATEGORIES, PRODUCTS } from "../data/catalog";
import { ProductCard } from "../components/ProductCard";

export function ProductList() {
  const search = useSearch();
  const initialCat = new URLSearchParams(search).get("cat") ?? "all";
  const [cat, setCat] = useState<string>(initialCat);

  const items = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.categoryId === cat);

  return (
    <div className="page">
      <h2 className="page-title">全部商品</h2>

      <div className="chips-row">
        <button
          className={cat === "all" ? "chip-btn active" : "chip-btn"}
          onClick={() => setCat("all")}
        >
          全部
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={cat === c.id ? "chip-btn active" : "chip-btn"}
            onClick={() => setCat(c.id)}
          >
            {c.title}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="empty">该分类暂无商品</p>
      ) : (
        <div className="grid">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
