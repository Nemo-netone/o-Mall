import { TRUST_BADGES } from "../data/catalog";
import { AppIcon, type AppIconName } from "./AppIcon";

const TRUST_ICONS: AppIconName[] = ["shield", "flask", "leaf", "headset"];

/** 信任徽章一行：正品保障 / 科研支持 / 严选原料 / 无忧售后 */
export function TrustBadges() {
  return (
    <div className="trust-row">
      {TRUST_BADGES.map((b, index) => (
        <div key={b.title} className="trust-item">
          <span className="trust-ico" aria-hidden="true">
            <AppIcon name={TRUST_ICONS[index] ?? "shield"} size={20} />
          </span>
          <strong>{b.title}</strong>
          <span>{b.sub}</span>
        </div>
      ))}
    </div>
  );
}
