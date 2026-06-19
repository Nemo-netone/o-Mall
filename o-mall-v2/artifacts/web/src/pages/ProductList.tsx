import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { useCatalog } from "../state/catalog";
import { ProductCard } from "../components/ProductCard";

export function ProductList() {
  const { products, categories } = useCatalog();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const urlCat = params.get("cat") ?? "all";
  const urlQuery = params.get("q") ?? "";
  const [cat, setCat] = useState<string>(urlCat);
  const [query, setQuery] = useState(urlQuery);
  const [sort, setSort] = useState("popular");

  // 分类与 URL 参数保持同步（从首页/分类页带 ?cat= 进入时也能命中）
  useEffect(() => {
    setCat(urlCat);
    setQuery(urlQuery);
  }, [urlCat, urlQuery]);

  const items = (cat === "all" ? products : products.filter((p) => p.categoryId === cat))
    .filter((p) => {
      const key = query.trim().toLowerCase();
      if (!key) return true;
      return [p.name, p.summary, p.spec, ...p.tags].some((text) => text.toLowerCase().includes(key));
    })
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "new") return b.id.localeCompare(a.id);
      return Number.parseInt((b.sales ?? "0").replace(/\D/g, ""), 10) - Number.parseInt((a.sales ?? "0").replace(/\D/g, ""), 10);
    });
  const activeCat = cat === "all" ? null : categories.find((c) => c.id === cat);

  return (
    <div className="page">
      <header className="content-header">
        <span className="chip">商品中心</span>
        <h1>{activeCat ? activeCat.title : "甄选好物"}</h1>
        <p>{activeCat ? activeCat.subtitle : "高F值小麦低聚肽 · 护肝养生"}</p>
      </header>

      <div className="list-tools">
        <label className="search-wrap product-search">
          <span aria-hidden="true">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索商品名、功效或规格" />
        </label>
        <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="排序方式">
          <option value="popular">综合推荐</option>
          <option value="new">新品优先</option>
          <option value="price-asc">价格从低到高</option>
          <option value="price-desc">价格从高到低</option>
        </select>
      </div>

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

      <div className="list-count">共 {items.length} 件商品{query ? ` · 已筛选“${query}”` : ""}</div>

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
