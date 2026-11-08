import type { Product } from "./catalog";
import { formatPrice } from "./catalog";

export function ProductCard({ product }: { product: Product }) {
  const status = product.stock === 0 ? "Unavailable" : product.stock < 5 ? "Low stock" : "In stock";
  const statusClasses = product.stock === 0
    ? "bg-rose-50 text-rose-800 ring-rose-200"
    : product.stock < 5
      ? "bg-amber-50 text-amber-900 ring-amber-200"
      : "bg-green-50 text-green-800 ring-green-200";

  return (
    <li className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <img src={product.image} alt="" width={80} height={80} className="size-20 rounded-xl object-cover" />
      <div className="min-w-0 flex-1 basis-44">
        <p className="text-xs font-semibold tracking-wide text-slate-500">{product.category}</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900">{product.name}</h3>
        <p className="mt-1 text-sm text-slate-600">{product.stock} units available</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${statusClasses}`}>{status}</span>
        <p className="min-w-20 text-right font-semibold tabular-nums text-slate-900">{formatPrice(product.priceMinor)}</p>
      </div>
    </li>
  );
}
