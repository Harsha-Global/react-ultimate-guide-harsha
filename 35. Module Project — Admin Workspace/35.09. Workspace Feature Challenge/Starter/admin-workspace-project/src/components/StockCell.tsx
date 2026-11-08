export function StockCell({ units }: { units: number }) {
  const label = units === 0 ? "Unavailable" : units < 5 ? "Low stock" : "In stock";
  const tone = units === 0 ? "bg-danger-surface text-danger" : units < 5 ? "bg-warning-surface text-warning" : "bg-success-surface text-success";
  return (
    <div className="flex flex-col items-end gap-1">
      <span className="font-semibold tabular-nums">{units} units</span>
      <span className={`whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold ${tone}`}>{label}</span>
    </div>
  );
}
