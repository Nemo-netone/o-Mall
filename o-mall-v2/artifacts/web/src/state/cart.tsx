import { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import type { CartLine, Product } from "../types";

interface CartContextValue {
  lines: CartLine[];
  /** 购物车内商品总件数 */
  count: number;
  /** 已勾选且非询价商品的金额合计 */
  selectedTotal: number;
  add: (product: Product, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  toggleSelect: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const add = useCallback((product: Product, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.product.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.product.id === product.id ? { ...l, qty: l.qty + qty } : l,
        );
      }
      return [...prev, { product, qty, selected: true }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) =>
      prev.map((l) => (l.product.id === id ? { ...l, qty: Math.max(1, qty) } : l)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.product.id !== id));
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setLines((prev) =>
      prev.map((l) => (l.product.id === id ? { ...l, selected: !l.selected } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);

  const selectedTotal = useMemo(
    () =>
      lines
        .filter((l) => l.selected && l.product.price > 0)
        .reduce((s, l) => s + l.product.price * l.qty, 0),
    [lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({ lines, count, selectedTotal, add, setQty, remove, toggleSelect, clear }),
    [lines, count, selectedTotal, add, setQty, remove, toggleSelect, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart 必须在 CartProvider 内使用");
  }
  return ctx;
}
