// O-Mall 数据库 schema（Drizzle / PostgreSQL，适配 Supabase）
// 这是 schema 的权威定义；线上 Supabase 表结构与此保持一致。
// 注：reviews 的用户名列用 user_name（user 是 Postgres 保留字）。
import { pgTable, text, integer, bigserial, jsonb, timestamp } from "drizzle-orm/pg-core";

/** 商品分类 */
export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull().default(""),
  icon: text("icon").notNull().default(""),
  sort: integer("sort").notNull().default(0),
});

/** 商品（价格单位：元；price=0 表示企业专供/询价） */
export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  badge: text("badge"),
  summary: text("summary").notNull().default(""),
  spec: text("spec").notNull().default(""),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  price: integer("price").notNull().default(0),
  originalPrice: integer("original_price"),
  image: text("image").notNull().default(""),
  categoryId: text("category_id").references(() => categories.id),
  theme: text("theme").notNull().default("#1d4d3a"),
  sales: text("sales"),
  repurchase: text("repurchase"),
  features: jsonb("features").$type<{ icon: string; title: string; desc: string }[]>().notNull().default([]),
  suitable: jsonb("suitable").$type<string[]>().notNull().default([]),
  steps: jsonb("steps").$type<string[]>().notNull().default([]),
  certs: jsonb("certs").$type<string[]>().notNull().default([]),
  ingredientTable: jsonb("ingredient_table").$type<{ name: string; amount: string; effect: string }[]>().notNull().default([]),
  params: jsonb("params").$type<{ label: string; value: string; highlight?: boolean }[]>().notNull().default([]),
  usage: text("usage").notNull().default(""),
  ingredients: text("ingredients").notNull().default(""),
  sort: integer("sort").notNull().default(0),
});

/** 用户评价 */
export const reviews = pgTable("reviews", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  productId: text("product_id")
    .notNull()
    .references(() => products.id),
  userName: text("user_name").notNull(),
  rating: integer("rating").notNull(),
  text: text("text").notNull(),
  date: text("date").notNull(),
  tag: text("tag"),
});

/** 内容展示页数据（company/tech/charity/functions/knowledge/assessment 等，整页 JSON） */
export const contentPages = pgTable("content_pages", {
  key: text("key").primaryKey(),
  data: jsonb("data").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
