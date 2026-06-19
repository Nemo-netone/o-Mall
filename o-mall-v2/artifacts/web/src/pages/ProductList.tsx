import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { useCatalog } from "../state/catalog";
import { ProductCard } from "../components/ProductCard";

export function ProductList() {
  const { products, categories } = useCatalog();
  const search = useSearch();
  const urlCat = new URLSearchParams(search).get("cat") ?? "all";
  const [cat, setCat] = useState<string>(urlCat);

  // 分类与 URL 参数保持同步（从首页/分类页带 ?cat= 进入时也能命中）
  useEffect(() => {
    setCat(urlCat);
  }, [urlCat]);

  const items = cat === "all" ? products : products.filter((p) => p.categoryId === cat);
  const activeCat = cat === "all" ? null : categories.find((c) => c.id === cat);

  return (
    <div className="page">
      <header className="content-header">
        <span className="chip">商品中心</span>
        <h1>{activeCat ? activeCat.title : "甄选好物"}</h1>
        <p>{activeCat ? activeCat.subtitle : "高F值小麦低聚肽 · 护肝养生"}</p>
      </header>

      <div className="chips-row">
        <button className={cat === "all" ? "chip-btn active" : "chip-btn"} onClick={() => setCat("all")}>
          全部
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            className={cat === c.id ? "chip-btn active" : "chip-btn"}
            onClick={() => setCat(c.id)}
          >
            {c.title}
          </button>
        ))}
      </div>

      <div className="list-count">共 {items.length} 件商品</div>

      {items.length === 0 ? (
        <div className="empty-state">
          <p className="empty">该分类暂无商品</p>
          <Link href="/products" className="btn btn-ghost" onClick={() => setCat("all")}>
            查看全部商品
          </Link>
        </div>
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
