import { Link } from "wouter";

/** 区块标题：金色竖条 + 标题 + 可选右侧链接 */
export function SectionHeader({
  title,
  action,
  href,
}: {
  title: string;
  action?: string;
  href?: string;
}) {
  return (
    <div className="section-head">
      <h2 className="section-title">{title}</h2>
      {action && href && (
        <Link href={href} className="more-link">
          {action} →
        </Link>
      )}
    </div>
  );
}
