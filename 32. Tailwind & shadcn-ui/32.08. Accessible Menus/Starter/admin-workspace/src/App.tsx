import { useRef, useState } from "react";
import { products } from "./catalog";
import { ProductCard } from "./ProductCard";
import { useTheme } from "./useTheme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function App() {
  const { preference, chooseTheme } = useTheme();
  const searchInput = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();
  const visibleProducts = products.filter((product) => product.name.toLowerCase().includes(search));

  const unavailableCount = products.filter((product) => product.stock === 0).length;
  const lowStockCount = products.filter((product) => product.stock > 0 && product.stock < 5).length;

  function resetSearch() {
    setQuery("");
    searchInput.current?.focus();
  }

  return (
    <main className="min-h-screen bg-background p-4 sm:p-8 text-foreground">
      <div className="mx-auto max-w-7xl">
        <header>
          <p className="text-sm font-semibold tracking-widest text-primary">CATALOG STUDIO</p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">Know what is ready.</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">Review the catalog, check availability and keep the next update clear.</p>
          <div className="mt-6 max-w-56">
            <label htmlFor="theme-preference" className="mb-2 block text-sm font-semibold">Theme</label>
            <select id="theme-preference" value={preference} onChange={(event) => chooseTheme(event.target.value)} className="min-h-11 w-full rounded-lg border border-input bg-card px-3 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </header>
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside aria-labelledby="summary-heading" className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <p className="text-xs font-semibold tracking-widest text-primary">WORKSPACE OVERVIEW</p>
            <h2 id="summary-heading" className="mt-3 text-xl font-semibold">Catalog health</h2>
            <dl className="mt-5 space-y-4">
              <div className="flex items-center justify-between gap-3"><dt className="text-sm text-muted-foreground">All products</dt><dd className="text-xl font-semibold tabular-nums">{products.length}</dd></div>
              <div className="flex items-center justify-between gap-3"><dt className="text-sm text-muted-foreground">Low stock</dt><dd className="text-xl font-semibold tabular-nums text-warning">{lowStockCount}</dd></div>
              <div className="flex items-center justify-between gap-3"><dt className="text-sm text-muted-foreground">Unavailable</dt><dd className="text-xl font-semibold tabular-nums text-danger">{unavailableCount}</dd></div>
            </dl>
            <p className="mt-6 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">These counts cover the whole catalog. Use the search to narrow the product list.</p>
          </aside>
          <section aria-labelledby="catalog-heading" className="min-w-0">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 id="catalog-heading" className="text-xl font-semibold">Product catalog</h2>
              <div className="mt-5 flex flex-wrap items-end gap-3">
                <div className="min-w-0 flex-1 basis-64">
                  <Label htmlFor="product-search" className="mb-2 block text-sm font-semibold text-foreground">Search products</Label>
                  <Input ref={searchInput} id="product-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try lamp or travel" />
                </div>
                <Button type="button" variant="outline" onClick={resetSearch} disabled={query.length === 0}>Clear search</Button>
              </div>
            </div>
            <p role="status" className="my-5 text-sm text-muted-foreground">{visibleProducts.length} of {products.length} products shown</p>
            {visibleProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-input bg-card p-8">
                <p className="text-muted-foreground">No products match this search. Try another name or reset the search.</p>
                <Button type="button" size="sm" className="mt-4" onClick={resetSearch}>Show all products</Button>
              </div>
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
