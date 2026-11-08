import type { Product } from "./catalog";
import { formatPrice } from "./catalog";
import { ProductActions } from "./components/ProductActions";

export function ProductCard({ product, onEdit, disabled }: { product: Product; onEdit: () => void; disabled: boolean }) {
  const status = product.stock === 0 ? "Unavailable" : product.stock < 5 ? "Low stock" : "In stock";
  const statusClasses = product.stock === 0
    ? "bg-danger-surface text-danger ring-danger/25"
    : product.stock < 5
      ? "bg-warning-surface text-warning ring-warning/25"
      : "bg-success-surface text-success ring-success/25";

  return (
    <li className="flex flex-col items-start gap-4 rounded-2xl sm:flex-row sm:flex-wrap sm:items-center border border-border bg-card p-5 shadow-sm">
      <img src={product.image} alt="" width={80} height={80} className="size-20 rounded-xl object-cover" />
      <div className="w-full min-w-0 sm:w-auto sm:flex-1 sm:basis-44">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground">{product.category}</p>
        <h3 className="mt-1 text-lg font-semibold text-foreground">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{product.stock} units available</p>
      </div>
      <div className="mt-auto flex w-full flex-wrap items-center justify-between gap-4 sm:w-auto">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${statusClasses}`}>{status}</span>
        <p className="min-w-20 text-right font-semibold tabular-nums text-foreground">{formatPrice(product.priceMinor)}</p>
      </div>
      <div className="w-full border-t border-border pt-4"><ProductActions product={product} onEdit={onEdit} disabled={disabled} /></div>
    </li>
  );
}
