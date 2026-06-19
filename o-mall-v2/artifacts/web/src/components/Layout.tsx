import { Link, useLocation } from "wouter";
import type { ReactNode } from "react";
import { useCart } from "../state/cart";
import { BrandSeal, BrandLockup } from "./Brand";

const NAV = [
  { href: "/", label: "首页", icon: "🏠" },
  { href: "/category", label: "分类", icon: "🗂️" },
  { href: "/cart", label: "购物车", icon: "🛒" },
  { href: "/profile", label: "我的", icon: "👤" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { count } = useCart();

  return (
    <div className="app">
      <header className="topbar">
        <Link href="/" className="topbar-brand">
          <BrandSeal />
          <BrandLockup />
        </Link>
        <Link href="/cart" className="topbar-cart" aria-label="购物车">
          🛒{count > 0 && <span className="badge">{count}</span>}
        </Link>
      </header>

      <main className="main">{children}</main>

      <nav className="bottomnav">
        {NAV.map((n) => {
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
    </div>
  );
}
