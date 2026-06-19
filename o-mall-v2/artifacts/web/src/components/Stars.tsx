/** 星级展示：实心 ★ + 空心 ☆ 凑满 5 */
export function Stars({ rating }: { rating: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span className="stars" aria-label={`${rating} 星`}>
      {"★".repeat(r)}
      {"☆".repeat(5 - r)}
    </span>
  );
}
