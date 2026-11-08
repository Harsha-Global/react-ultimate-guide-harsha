import { CatalogToolbar } from "./components/CatalogToolbar";
import { WorkspaceHeader } from "./components/WorkspaceHeader";
import { WorkspaceStatus } from "./components/WorkspaceStatus";
import { WorkspaceControls } from "./components/WorkspaceControls";
import { useWorkspaceStore } from "./workspaceStore";
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

export default function App() {
  const summaryOpen = useWorkspaceStore((state) => state.summaryOpen);
  const { preference, chooseTheme } = useTheme();
  const [locale, setLocale] = useState<DisplayLocale>("en-US");
  const [zone, setZone] = useState<DisplayZone>("UTC");
  const searchInput = useRef<HTMLInputElement>(null);
  const { query, setQuery, sorting, changeSorting, columnFilters, changeFilters, pagination, changePagination, resetPage } = useCatalogView();
  const [selection, setSelection] = useState<{ query: string; rows: RowSelectionState }>({ query, rows: {} });
  const rowSelection = selection.query === query ? selection.rows : {};
  useEffect(() => { setSelection({ query, rows: {} }); }, [query]);
  const changeSelection: OnChangeFn<RowSelectionState> = (updater) => {
    setSelection((current) => {
      const rows = current.query === query ? current.rows : {};
      return { query, rows: typeof updater === "function" ? updater(rows) : updater };
    });
  };
  const { state, retry, refreshCatalog, refreshing, refreshFailed } = useProducts(buildCatalogQuery(query, sorting, pagination));
  const [editing, setEditing] = useState<Product | null>(null);
  const [notice, setNotice] = useState("");
  const products = state.status === "ready" ? state.result.items : [];

  const unavailableCount = state.status === "ready" ? state.result.summary.unavailable : 0;
  const lowStockCount = state.status === "ready" ? state.result.summary.low : 0;

  function resetSearch() {
    setQuery("");
    searchInput.current?.focus();
  }

  function finishEdit(product?: Product) {
    if (product) { resetPage(); changeSelection({}); void refreshCatalog(); setNotice(`Saved ${product.name}.`); }
    setEditing(null);
    searchInput.current?.focus();
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-8 text-foreground">
      <div className="mx-auto max-w-7xl">
        <a href="#catalog-heading" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-card focus:p-4">Skip to catalog</a>
        <WorkspaceHeader themeControl={<div className="mt-6 max-w-56">
            <label htmlFor="theme-preference" className="mb-2 block text-sm font-semibold">Theme</label>
            <select id="theme-preference" value={preference} onChange={(event) => chooseTheme(event.target.value)} className="min-h-11 w-full rounded-lg border border-input bg-card px-3 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>} />
        <div className={`mt-8 grid items-start gap-8 ${summaryOpen ? "lg:grid-cols-[16rem_minmax(0,1fr)]" : "grid-cols-1"}`}>
          <aside id="workspace-summary" hidden={!summaryOpen} aria-labelledby="summary-heading" className="rounded-2xl border border-border bg-card p-6 shadow-sm">
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
            <div className="flex flex-wrap items-center justify-between gap-4"><h2 id="catalog-heading" tabIndex={-1} className="text-xl font-semibold">Product catalog</h2><WorkspaceControls /></div><WorkspaceStatus />
            <CatalogToolbar query={query} onQuery={setQuery} searchRef={searchInput} onReset={resetSearch} sorted={sorting.length > 0} onClearSorting={() => changeSorting([])} />
          </div>
          {refreshing && <p role="status" className="mt-4 text-sm text-muted-foreground">Refreshing this view. The previous result remains visible.</p>}
          {refreshFailed && <div className="my-4 rounded-lg bg-warning-surface p-4 text-warning"><p role="alert">The latest refresh failed. These are the last successfully loaded rows for this view.</p><Button type="button" variant="outline" className="mt-3" onClick={retry}>Retry refresh</Button></div>}
          {notice && <p role="status" className="mt-5 rounded-lg bg-success-surface p-3 text-success">{notice}</p>}
          {editing && <ProductEditor key={editing.id} product={editing} onSaved={finishEdit} onCancel={() => finishEdit()} />}
          {state.status === "error" ? <div className="my-5 rounded-xl bg-danger-surface p-5"><p role="alert" className="text-danger">Could not load the catalog. Check the service and retry.</p><Button type="button" variant="outline" className="mt-3" onClick={() => { retry(); searchInput.current?.focus(); }}>Retry catalog</Button></div> : null}
          <ProductTable locale={locale} pagination={pagination} onPaginationChange={changePagination} rowSelection={rowSelection} onRowSelectionChange={changeSelection} busy={state.status === "loading" || refreshing} ready={state.status === "ready"} total={state.status === "ready" ? state.result.total : 0} products={products} sorting={sorting} onSortingChange={changeSorting} columnFilters={columnFilters} onColumnFiltersChange={changeFilters} onResetSearch={resetSearch} disabled={editing !== null || refreshing} onEdit={(product) => { setNotice(""); setEditing(product); }} />
        </section>
        </div>
      </div>
    </main>
  );
}
