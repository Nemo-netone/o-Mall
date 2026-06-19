import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// anon key 为公开值，由数据库 RLS（仅公开只读）保护；构建期由 .env 注入。
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** 未配置环境变量时为 null，调用方据此回退本地数据。 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey, { auth: { persistSession: false } }) : null;
