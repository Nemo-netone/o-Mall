import { useEffect } from "react";
import { useLocation } from "wouter";

/** 路由切换后把页面滚动回顶部（SPA hash 路由默认会保留上一页的滚动位置） */
export function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);
  return null;
}
