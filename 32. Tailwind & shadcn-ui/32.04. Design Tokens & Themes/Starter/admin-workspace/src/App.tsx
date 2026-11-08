import { useState } from "react";
import { products } from "./catalog";
import { ProductCard } from "./ProductCard";

export default function App() {
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const visibleProducts = products.filter((product) => product.name.toLowerCase().includes(search));

  const unavailableCount = products.filter((product) => product.stock === 0).length;
  const lowStockCount = products.filter((product) => product.stock > 0 && product.stock < 5).length;

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <header>
          <p className="text-sm font-semibold tracking-widest text-blue-800">CATALOG STUDIO</p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">Know what is ready.</h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">Review the catalog, check availability and keep the next update clear.</p>
        </header>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside aria-labelledby="summary-heading" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold tracking-widest text-blue-800">WORKSPACE OVERVIEW</p>
            <h2 id="summary-heading" className="mt-3 text-xl font-semibold">Catalog health</h2>
            <dl className="mt-5 space-y-4">
              <div className="flex items-center justify-between gap-3"><dt className="text-sm text-slate-600">All products</dt><dd className="text-xl font-semibold tabular-nums">{products.length}</dd></div>
              <div className="flex items-center justify-between gap-3"><dt className="text-sm text-slate-600">Low stock</dt><dd className="text-xl font-semibold tabular-nums text-amber-800">{lowStockCount}</dd></div>
              <div className="flex items-center justify-between gap-3"><dt className="text-sm text-slate-600">Unavailable</dt><dd className="text-xl font-semibold tabular-nums text-rose-800">{unavailableCount}</dd></div>
            </dl>
            <p className="mt-6 border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-600">These counts cover the whole catalog. Use the search to narrow the product list.</p>
          </aside>
          <section aria-labelledby="catalog-heading" className="min-w-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 id="catalog-heading" className="text-xl font-semibold">Product catalog</h2>
              <div className="mt-5 flex flex-wrap items-end gap-3">
                <div className="min-w-0 flex-1 basis-64">
                  <label htmlFor="product-search" className="mb-2 block text-sm font-semibold text-slate-700">Search products</label>
                  <input id="product-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try lamp or travel" className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-900 placeholder:text-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" />
                </div>
                <button type="button" onClick={() => setQuery("")} disabled={query.length === 0} className="min-h-11 rounded-lg bg-blue-800 px-4 font-semibold text-white enabled:hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-45">Clear search</button>
              </div>
            </div>
            <p role="status" className="my-5 text-sm text-slate-600">{visibleProducts.length} of {products.length} products shown</p>
            {visibleProducts.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-slate-600">No products match this search. Try another name or clear the search.</p>
            ) : (
              <ul className="grid gap-4 xl:grid-cols-2" aria-label="Products">
                {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
