import { supabase } from "../lib/supabase";
import type { Product, Category, Review } from "../types";
import { DISCONTINUED_PRODUCT_IDS } from "./catalog";

/** 从 Supabase 拉取商品/分类/评价并映射为前端类型；任何失败/未配置返回 null（由上层回退本地数据）。 */
export async function fetchCatalog(): Promise<{ products: Product[]; categories: Category[] } | null> {
  if (!supabase) return null;
  try {
    const [catsRes, prodsRes, revsRes] = await Promise.all([
      supabase.from("categories").select("*").order("sort"),
      supabase.from("products").select("*").order("sort"),
      supabase.from("reviews").select("*").order("id"),
    ]);
    if (catsRes.error || prodsRes.error || revsRes.error) return null;
    const cats = catsRes.data ?? [];
    const prods = prodsRes.data ?? [];
    const revs = revsRes.data ?? [];
    if (!prods.length || !cats.length) return null;

    const reviewsByProduct = new Map<string, Review[]>();
    for (const r of revs) {
      const arr = reviewsByProduct.get(r.product_id) ?? [];
      arr.push({ user: r.user_name, rating: r.rating, text: r.text, date: r.date, tag: r.tag ?? undefined });
      reviewsByProduct.set(r.product_id, arr);
    }

    const categories: Category[] = cats.map((c) => ({
      id: c.id,
      title: c.title,
      subtitle: c.subtitle,
      icon: c.icon,
    }));

    const products: Product[] = prods
      .filter((p) => !DISCONTINUED_PRODUCT_IDS.has(p.id))
      .map((p) => ({
        id: p.id,
        name: p.name,
        badge: p.badge ?? undefined,
        summary: p.summary,
        spec: p.spec,
        tags: p.tags ?? [],
        price: p.price,
        originalPrice: p.original_price ?? undefined,
        image: p.image,
        categoryId: p.category_id,
        theme: p.theme,
        sales: p.sales ?? undefined,
        repurchase: p.repurchase ?? undefined,
        features: p.features ?? [],
        suitable: p.suitable ?? [],
        steps: p.steps ?? [],
        certs: p.certs ?? [],
        ingredientTable: p.ingredient_table ?? [],
        params: p.params ?? [],
        usage: p.usage,
        ingredients: p.ingredients,
        reviews: reviewsByProduct.get(p.id) ?? [],
      }));

    return { products, categories };
  } catch {
    return null;
  }
}
