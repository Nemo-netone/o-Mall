import { BRAND } from "../data/catalog";

/** 品牌印章：竖排「国肽 / 民安」，金边米底 */
export function BrandSeal({ lg = false }: { lg?: boolean }) {
  return (
    <div className={lg ? "brand-seal lg" : "brand-seal"} aria-hidden="true">
      <span>{BRAND.seal[0]}</span>
      <span>{BRAND.seal[1]}</span>
    </div>
  );
}

/** 品牌名 + 副标题 */
export function BrandLockup() {
  return (
    <div className="brand-lockup">
      <span className="brand-name">{BRAND.name}</span>
      <span className="brand-sub">{BRAND.sub}</span>
    </div>
  );
}
