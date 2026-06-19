import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Product, Category } from "../types";
import { PRODUCTS, CATEGORIES } from "../data/catalog";
import { fetchCatalog } from "../data/remote";

interface CatalogValue {
  products: Product[];
  categories: Category[];
  /** 数据来源：本地兜底 or Supabase */
  source: "local" | "remote";
  loading: boolean;
}

// 初始值＝本地打包数据：首屏永远有内容，永不白屏
const CatalogContext = createContext<CatalogValue>({
  products: PRODUCTS,
  categories: CATEGORIES,
  source: "local",
  loading: false,
});

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CatalogValue>({
    products: PRODUCTS,
    categories: CATEGORIES,
    source: "local",
    loading: true,
  });

  useEffect(() => {
    let alive = true;
    fetchCatalog()
      .then((res) => {
        if (!alive) return;
        if (res && res.products.length) {
          setState({ products: res.products, categories: res.categories, source: "remote", loading: false });
        } else {
          setState((s) => ({ ...s, loading: false })); // 回退保留本地数据
        }
      })
      .catch(() => {
        if (alive) setState((s) => ({ ...s, loading: false }));
      });
    return () => {
      alive = false;
    };
  }, []);

  return <CatalogContext.Provider value={state}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): CatalogValue {
  return useContext(CatalogContext);
}

export function useProduct(id: string | undefined): Product | undefined {
  const { products } = useCatalog();
  return id ? products.find((p) => p.id === id) : undefined;
}

export function useCategory(id: string | undefined): Category | undefined {
  const { categories } = useCatalog();
  return id ? categories.find((c) => c.id === id) : undefined;
}
