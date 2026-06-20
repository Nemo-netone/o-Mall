// 一次性 seed 脚本：把 web 本地数据写入 Supabase（经 Management API，令牌鉴权）
// 运行：SUPABASE_ACCESS_TOKEN=sbp_xxx SUPABASE_PROJECT_REF=<ref> pnpm --filter @o-mall/db run seed
import { CATEGORIES, DISCONTINUED_PRODUCT_IDS, PRODUCTS } from "../../artifacts/web/src/data/catalog.ts";
import {
  COMPANY,
  TECH,
  CHARITY,
  FUNCTIONS_PAGE,
  ARTICLES,
  KNOWLEDGE_CATS,
  HOT_TAGS,
  ASSESS_SECTIONS,
  ASSESS_GRADE_DESC,
} from "../../artifacts/web/src/data/content.ts";

const REF = process.env.SUPABASE_PROJECT_REF || "fmgqjbxydgxwhjrrhwxi";
const PAT = process.env.SUPABASE_ACCESS_TOKEN || process.env.SUPABASE_PAT;
if (!PAT) {
  console.error("缺少 SUPABASE_ACCESS_TOKEN 或 SUPABASE_PAT 环境变量");
  process.exit(1);
}

const q = (s: unknown) => "'" + String(s).replace(/'/g, "''") + "'";
const qn = (s: unknown) => (s === undefined || s === null ? "NULL" : q(s));
const num = (n: unknown) => (n === undefined || n === null ? "NULL" : String(n));
const j = (o: unknown) => "'" + JSON.stringify(o).replace(/'/g, "''") + "'::jsonb";

const stmts: string[] = [];
const discontinuedIds = [...DISCONTINUED_PRODUCT_IDS];
if (discontinuedIds.length) {
  const ids = discontinuedIds.map(q).join(",");
  stmts.push(`delete from reviews where product_id in (${ids});`);
  stmts.push(`delete from products where id in (${ids});`);
}

// 分类
const catVals = CATEGORIES.map(
  (c, i) => `(${q(c.id)},${q(c.title)},${q(c.subtitle)},${q(c.icon)},${i})`,
).join(",\n");
stmts.push(
  `insert into categories (id,title,subtitle,icon,sort) values\n${catVals}\n` +
    `on conflict (id) do update set title=excluded.title,subtitle=excluded.subtitle,icon=excluded.icon,sort=excluded.sort;`,
);

// 商品
const prodVals = PRODUCTS.map(
  (p, i) =>
    `(${q(p.id)},${q(p.name)},${qn(p.badge)},${q(p.summary)},${q(p.spec)},${j(p.tags)},${num(p.price)},${num(p.originalPrice)},${q(p.image)},${q(p.categoryId)},${q(p.theme)},${qn(p.sales)},${qn(p.repurchase)},${j(p.features)},${j(p.suitable)},${j(p.steps)},${j(p.certs)},${j(p.ingredientTable)},${j(p.params)},${q(p.usage)},${q(p.ingredients)},${i})`,
).join(",\n");
stmts.push(
  `insert into products (id,name,badge,summary,spec,tags,price,original_price,image,category_id,theme,sales,repurchase,features,suitable,steps,certs,ingredient_table,params,usage,ingredients,sort) values\n${prodVals}\n` +
    `on conflict (id) do update set name=excluded.name,badge=excluded.badge,summary=excluded.summary,spec=excluded.spec,tags=excluded.tags,price=excluded.price,original_price=excluded.original_price,image=excluded.image,category_id=excluded.category_id,theme=excluded.theme,sales=excluded.sales,repurchase=excluded.repurchase,features=excluded.features,suitable=excluded.suitable,steps=excluded.steps,certs=excluded.certs,ingredient_table=excluded.ingredient_table,params=excluded.params,usage=excluded.usage,ingredients=excluded.ingredients,sort=excluded.sort;`,
);

// 评价（先清空再插，幂等）
const revRows: string[] = [];
for (const p of PRODUCTS) {
  for (const r of p.reviews) {
    revRows.push(`(${q(p.id)},${q(r.user)},${num(r.rating)},${q(r.text)},${q(r.date)},${qn(r.tag)})`);
  }
}
stmts.push("delete from reviews;");
if (revRows.length) {
  stmts.push(
    `insert into reviews (product_id,user_name,rating,text,date,tag) values\n${revRows.join(",\n")};`,
  );
}

// 内容页
const content: Record<string, unknown> = {
  company: COMPANY,
  tech: TECH,
  charity: CHARITY,
  functions: FUNCTIONS_PAGE,
  knowledge: { cats: KNOWLEDGE_CATS, hotTags: HOT_TAGS, articles: ARTICLES },
  assessment: { sections: ASSESS_SECTIONS, gradeDesc: ASSESS_GRADE_DESC },
};
const cpVals = Object.entries(content)
  .map(([k, v]) => `(${q(k)},${j(v)})`)
  .join(",\n");
stmts.push(
  `insert into content_pages (key,data) values\n${cpVals}\n` +
    `on conflict (key) do update set data=excluded.data,updated_at=now();`,
);

const sql = stmts.join("\n\n");

const res = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({ query: sql }),
});
const text = await res.text();
console.log("seed HTTP", res.status, "·", text || "(空=成功)");
if (!res.ok) process.exit(1);

// 校验计数
const countRes = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`, {
  method: "POST",
  headers: { Authorization: `Bearer ${PAT}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    query:
      "select (select count(*) from categories) as categories,(select count(*) from products) as products,(select count(*) from reviews) as reviews,(select count(*) from content_pages) as content_pages;",
  }),
});
console.log("计数:", await countRes.text());
