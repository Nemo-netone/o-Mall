import { TRUST_BADGES } from "../data/catalog";

/** 信任徽章一行：正品保障 / 科研支持 / 严选原料 / 无忧售后 */
export function TrustBadges() {
  return (
    <div className="trust-row">
      {TRUST_BADGES.map((b) => (
        <div key={b.title} className="trust-item">
          <span className="trust-ico" aria-hidden="true">
            {b.icon}
          </span>
          <strong>{b.title}</strong>
          <span>{b.sub}</span>
        </div>
      ))}
    </div>
  );
}
