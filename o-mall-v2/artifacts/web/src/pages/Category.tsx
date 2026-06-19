import { Link } from "wouter";
import { useCatalog } from "../state/catalog";
import { ProductCard } from "../components/ProductCard";
import { SectionHeader } from "../components/SectionHeader";

export function Category() {
  const { products, categories } = useCatalog();
  return (
    <div className="page">
      <header className="content-header">
        <span className="chip">商品分类</span>
        <h1>按需选购</h1>
        <p>肽饮 · 护肝 · 营养 · 草本 · 礼盒</p>
      </header>

      <section className="section" style={{ marginTop: 0 }}>
        <SectionHeader title="全部分类" />
        <div className="quicknav">
          {categories.map((c) => (
            <Link key={c.id} href={`/products?cat=${c.id}`} className="quicknav-item">
              <span className="quicknav-ico" style={{ background: "var(--c-jade)" }} aria-hidden="true">
                {c.icon}
              </span>
              <span className="quicknav-label">{c.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader title="全部商品" action="筛选" href="/products" />
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
