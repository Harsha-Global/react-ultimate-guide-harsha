import { availabilityValues } from "./viewParsers";
import { useEffect, useRef, useState } from "react";
import type { RowSelectionState, OnChangeFn } from "@tanstack/react-table";
import { DisplayPreferences } from "./components/DisplayPreferences";
import type { DisplayLocale, DisplayZone } from "./displayFormats";
import type { Product } from "./catalog";
import { buildCatalogQuery } from "./catalogQuery";
import { useCatalogView } from "./useCatalogView";
import { useProducts } from "./useProducts";
import { ProductEditor } from "./components/ProductEditor";
import { ProductTable } from "./components/ProductTable";
import { useTheme } from "./useTheme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function App() {
  const { preference, chooseTheme } = useTheme();
  const [locale, setLocale] = useState<DisplayLocale>("en-US");
  const [zone, setZone] = useState<DisplayZone>("UTC");
  const searchInput = useRef<HTMLInputElement>(null);
  const { availability, setAvailability, resetFilters, query, setQuery, sorting, changeSorting, columnFilters, changeFilters, pagination, changePagination, resetPage } = useCatalogView();
  const selectionScope = JSON.stringify([query, availability]);
  const [selection, setSelection] = useState<{ scope: string; rows: RowSelectionState }>({ scope: selectionScope, rows: {} });
  const rowSelection = selection.scope === selectionScope ? selection.rows : {};
  useEffect(() => { setSelection({ scope: selectionScope, rows: {} }); }, [selectionScope]);
  const changeSelection: OnChangeFn<RowSelectionState> = (updater) => {
    setSelection((current) => {
      const rows = current.scope === selectionScope ? current.rows : {};
      return { scope: selectionScope, rows: typeof updater === "function" ? updater(rows) : updater };
    });
  };
  const { state, retry } = useProducts(buildCatalogQuery(query, sorting, pagination, availability));
  const [editing, setEditing] = useState<Product | null>(null);
  const [notice, setNotice] = useState("");
  const products = state.status === "ready" ? state.result.items : [];

  const unavailableCount = state.status === "ready" ? state.result.summary.unavailable : 0;
  const lowStockCount = state.status === "ready" ? state.result.summary.low : 0;

  function resetSearch() {
    setQuery("");
    searchInput.current?.focus();
  }

  function resetAllFilters() { resetFilters(); searchInput.current?.focus(); }

  function finishEdit(product?: Product) {
    if (product) { resetPage(); changeSelection({}); retry(); setNotice(`Saved ${product.name}.`); }
    setEditing(null);
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
              <div className="flex items-center justify-between gap-3"><dt className="text-sm text-muted-foreground">All products</dt><dd className="text-xl font-semibold tabular-nums">{state.status === "ready" ? state.result.summary.all : "—"}</dd></div>
              <div className="flex items-center justify-between gap-3"><dt className="text-sm text-muted-foreground">Low stock</dt><dd className="text-xl font-semibold tabular-nums text-warning">{state.status === "ready" ? lowStockCount : "—"}</dd></div>
              <div className="flex items-center justify-between gap-3"><dt className="text-sm text-muted-foreground">Unavailable</dt><dd className="text-xl font-semibold tabular-nums text-danger">{state.status === "ready" ? unavailableCount : "—"}</dd></div>
            </dl>
            <p className="mt-6 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">These counts cover the whole catalog. Use the search to narrow the product list.</p>
            <DisplayPreferences locale={locale} zone={zone} onLocale={setLocale} onZone={setZone} />
          </aside>
        <section aria-labelledby="catalog-heading" className="min-w-0">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 id="catalog-heading" className="text-xl font-semibold">Product catalog</h2>
            <div className="mt-5 flex flex-wrap items-end gap-3">
              <div className="min-w-0 flex-1 basis-64">
                <Label htmlFor="product-search" className="mb-2 block text-sm font-semibold text-foreground">Search products</Label>
                <Input ref={searchInput} id="product-search" type="search" maxLength={60} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try lamp or travel" />
              </div>
              <label className="min-w-0 text-sm font-semibold">Availability
                <select value={availability} onChange={(event) => { const value = availabilityValues.find(item => item === event.target.value); if (value) setAvailability(value); }} className="mt-2 block min-h-11 max-w-full rounded-lg border border-input bg-card px-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                  <option value="all">All products</option><option value="available">Available (stock above zero)</option><option value="low">Low stock (1–4)</option><option value="unavailable">Unavailable (stock zero)</option>
                </select>
              </label>
              <Button type="button" variant="outline" onClick={resetSearch} disabled={query.length === 0}>Clear search</Button>
              <Button type="button" variant="outline" onClick={() => changeSorting([])} disabled={sorting.length === 0}>Clear sorting</Button>
            </div>
          </div>
          {notice && <p role="status" className="mt-5 rounded-lg bg-success-surface p-3 text-success">{notice}</p>}
          {editing && <ProductEditor key={editing.id} product={editing} onSaved={finishEdit} onCancel={() => finishEdit()} />}
          {state.status === "error" ? <div className="my-5 rounded-xl bg-danger-surface p-5"><p role="alert" className="text-danger">Could not load the catalog. Check the service and retry.</p><Button type="button" variant="outline" className="mt-3" onClick={() => { retry(); searchInput.current?.focus(); }}>Retry catalog</Button></div> : null}
          <ProductTable locale={locale} pagination={pagination} onPaginationChange={changePagination} rowSelection={rowSelection} onRowSelectionChange={changeSelection} busy={state.status === "loading"} ready={state.status === "ready"} total={state.status === "ready" ? state.result.total : 0} products={products} sorting={sorting} onSortingChange={changeSorting} columnFilters={columnFilters} onColumnFiltersChange={changeFilters} onResetSearch={resetAllFilters} disabled={editing !== null} onEdit={(product) => { setNotice(""); setEditing(product); }} />
        </section>
        </div>
      </div>
    </main>
  );
}
