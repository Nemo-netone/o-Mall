import { Link, useLocation } from "wouter";
import { useState, type FormEvent, type ReactNode } from "react";
import { useCart } from "../state/cart";
import { useCatalog } from "../state/catalog";
import { useShopUi } from "../state/shop-ui";
import { BrandSeal, BrandLockup } from "./Brand";
import { GlobalOverlays } from "./GlobalOverlays";

const NAV = [
  { href: "/", label: "首页", icon: "⌂" },
  { href: "/category", label: "分类", icon: "◇" },
  { href: "/cart", label: "购物车", icon: "▣" },
  { href: "/profile", label: "我的", icon: "◎" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [location, navigate] = useLocation();
  const { count } = useCart();
  const { source, loading } = useCatalog();
  const { openSheet } = useShopUi();
  const [query, setQuery] = useState("");

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    const next = query.trim();
    navigate(next ? `/products?q=${encodeURIComponent(next)}` : "/products");
  };

  return (
    <div className="app">
      <header className="topbar">
        <Link href="/" className="topbar-brand">
          <BrandSeal />
          <BrandLockup />
        </Link>
        <form className="topbar-search" onSubmit={submitSearch}>
          <span aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索护肝、肽饮、礼盒"
            aria-label="搜索商品"
          />
        </form>
        <span className="source-pill">{loading ? "同步中" : source === "remote" ? "Supabase" : "本地数据"}</span>
        <Link href="/cart" className="topbar-cart" aria-label="购物车">
          ▣{count > 0 && <span className="badge">{count}</span>}
        </Link>
      </header>

      <main className="main">{children}</main>

      <nav className="bottomnav">
        {NAV.slice(0, 2).map((n) => {
          const active = n.href === "/" ? location === "/" : location.startsWith(n.href);
          return (
            <Link key={n.href} href={n.href} className={active ? "navitem active" : "navitem"}>
              <span className="navicon" aria-hidden="true">
                {n.icon}
              </span>
              <span className="navlabel">{n.label}</span>
              {n.href === "/cart" && count > 0 && <span className="navbadge">{count}</span>}
            </Link>
          );
        })}
        <button
          className="navitem ai-navitem"
          onClick={() => openSheet({ type: "ai", title: "AI 健康顾问" })}
          aria-label="打开 AI 健康顾问"
        >
          <span className="ai-nav-orb" aria-hidden="true">
            AI
          </span>
          <span className="ai-navlabel">问AI</span>
        </button>
        {NAV.slice(2).map((n) => {
          const active = n.href === "/" ? location === "/" : location.startsWith(n.href);
          return (
            <Link key={n.href} href={n.href} className={active ? "navitem active" : "navitem"}>
              <span className="navicon" aria-hidden="true">
                {n.icon}
              </span>
              <span className="navlabel">{n.label}</span>
              {n.href === "/cart" && count > 0 && <span className="navbadge">{count}</span>}
            </Link>
          );
        })}
      </nav>
      <GlobalOverlays />
    </div>
  );
}
