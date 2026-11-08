import { useState } from "react";
import { products } from "./catalog";
import { ProductCard } from "./ProductCard";

export default function App() {
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const visibleProducts = products.filter((product) => product.name.toLowerCase().includes(search));

  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <header>
          <p className="text-sm font-semibold tracking-widest text-blue-800">CATALOG STUDIO</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Know what is ready.</h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">Review the catalog, check availability and keep the next update clear.</p>
        </header>
        <section aria-labelledby="catalog-heading" className="mt-8">
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
            <ul className="grid gap-4" aria-label="Products">
              {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
