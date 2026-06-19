-- O-Mall 初始化 schema（应用到 Supabase / PostgreSQL）
-- 与 lib/db/src/schema/index.ts 的 Drizzle 定义保持一致。
-- 应用方式（确认后任选其一）：
--   A. Supabase 控制台 → SQL Editor 粘贴执行
--   B. Management API：POST /v1/projects/<ref>/database/query
--   C. drizzle-kit push（需 DATABASE_URL 连接串）

create table if not exists categories (
  id text primary key,
  title text not null,
  subtitle text not null default '',
  icon text not null default '',
  sort int not null default 0
);

create table if not exists products (
  id text primary key,
  name text not null,
  badge text,
  summary text not null default '',
  spec text not null default '',
  tags jsonb not null default '[]'::jsonb,
  price int not null default 0,
  original_price int,
  image text not null default '',
  category_id text references categories(id),
  theme text not null default '#1d4d3a',
  sales text,
  repurchase text,
  features jsonb not null default '[]'::jsonb,
  suitable jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  certs jsonb not null default '[]'::jsonb,
  ingredient_table jsonb not null default '[]'::jsonb,
  params jsonb not null default '[]'::jsonb,
  usage text not null default '',
  ingredients text not null default '',
  sort int not null default 0
);

create table if not exists reviews (
  id bigserial primary key,
  product_id text not null references products(id),
  user_name text not null,
  rating int not null,
  text text not null,
  date text not null,
  tag text
);

create table if not exists content_pages (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- 行级安全：开启并仅放开「公开只读」（写入只能用 service_role / 后台）
alter table categories enable row level security;
alter table products enable row level security;
alter table reviews enable row level security;
alter table content_pages enable row level security;

drop policy if exists "public read categories" on categories;
drop policy if exists "public read products" on products;
drop policy if exists "public read reviews" on reviews;
drop policy if exists "public read content" on content_pages;

create policy "public read categories" on categories for select using (true);
create policy "public read products" on products for select using (true);
create policy "public read reviews" on reviews for select using (true);
create policy "public read content" on content_pages for select using (true);
