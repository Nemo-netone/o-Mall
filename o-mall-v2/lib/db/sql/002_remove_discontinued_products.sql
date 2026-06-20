-- 删除已经下架且当前业务没有售卖的商品。
-- 需要用 Supabase SQL Editor、service_role、DATABASE_URL 或 Management API 执行。

delete from reviews
where product_id in ('p4', 'p5');

delete from products
where id in ('p4', 'p5');
