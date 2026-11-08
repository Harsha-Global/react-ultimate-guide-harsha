import { useId, useMemo } from "react";
import { createColumnHelper, tableFeatures, useTable, rowSortingFeature, columnFilteringFeature, rowPaginationFeature, rowSelectionFeature } from "@tanstack/react-table";
import type { SortingState, ColumnFiltersState, OnChangeFn, PaginationState, RowSelectionState } from "@tanstack/react-table";
import { SelectionCheckbox } from "./SelectionCheckbox";
import { Button } from "./ui/button";
import type { Product } from "../catalog";
import { formatPrice } from "../catalog";
import { StockCell } from "./StockCell";
import { ProductActions } from "./ProductActions";

const features = tableFeatures({ rowSortingFeature, columnFilteringFeature, rowPaginationFeature, rowSelectionFeature });
const columnHelper = createColumnHelper<typeof features, Product>();

type ProductTableProps = {
  products: Product[];
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  onEdit: (product: Product) => void;
  disabled: boolean;
  busy: boolean;
  ready: boolean;
  total: number;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  columnFilters: ColumnFiltersState;
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
  onResetSearch: () => void;
};

export function ProductTable({ products, onEdit, disabled, sorting, onSortingChange, columnFilters, onColumnFiltersChange, onResetSearch, busy, ready, total, pagination, onPaginationChange, rowSelection, onRowSelectionChange }: ProductTableProps) {
  const helpId = useId();
  const columns = useMemo(() => columnHelper.columns([
    columnHelper.display({
      id: "select",
      header: ({ table }) => <SelectionCheckbox label="Select this page" checked={table.getRowModel().rows.length > 0 && table.getIsAllPageRowsSelected()} mixed={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()} disabled={!ready || total === 0} onChange={table.getToggleAllPageRowsSelectedHandler()} />,
      cell: ({ row }) => <SelectionCheckbox label={`Select ${row.original.name}`} checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />,
    }),
    columnHelper.accessor("name", {
      header: "Product",
      cell: (info) => <div className="flex items-center gap-3">
        <img src={info.row.original.image} alt="" width={48} height={48} className="size-12 rounded-lg object-cover" />
        <div><p className="font-semibold">{info.getValue()}</p><p className="mt-1 font-mono text-xs text-muted-foreground">{info.row.original.id}</p></div>
      </div>,
    }),
    columnHelper.accessor("category", { header: "Category" }),
    columnHelper.accessor("priceMinor", {
      header: "Price (USD)",
      cell: (info) => <span className="block text-right font-semibold tabular-nums">{formatPrice(info.getValue())}</span>,
    }),
    columnHelper.accessor("stock", {
      header: "Stock",
      cell: (info) => <StockCell units={info.getValue()} />,
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <ProductActions product={row.original} onEdit={() => onEdit(row.original)} disabled={disabled} />,
    }),
  ]), [onEdit, disabled, ready, total]);

  const table = useTable({
    features,
    columns,
    data: products,
    state: { sorting, columnFilters, pagination, rowSelection },
    manualSorting: true,
    manualPagination: true,
    rowCount: total,
    onPaginationChange,
    onRowSelectionChange,
    enableRowRangeSelection: false,
    manualFiltering: true,
    onSortingChange,
    onColumnFiltersChange,
    sortDescFirst: false,
    enableMultiSort: false,
    getRowId: (product) => product.id,
  });

  const rows = table.getRowModel().rows;
  const selectedCount = Object.keys(rowSelection).length;
  const previousEnabled = ready && table.getCanPreviousPage();
  const nextEnabled = ready && table.getCanNextPage();

  return (<>
    <p role="status" aria-atomic="true" className="my-5 text-sm text-muted-foreground">
      {ready ? `${rows.length} shown of ${total} matching products. ${total === 0 ? "No matching pages." : `Page ${pagination.pageIndex + 1} of ${table.getPageCount()}.`} ${selectedCount} selected across pages.` : busy ? "Loading catalog…" : "Catalog unavailable."}
    </p>
    <div className="my-4 flex flex-wrap items-center gap-3">
      <p className="text-sm">{selectedCount} selected across pages</p>
      <Button type="button" size="sm" variant="outline" onClick={() => table.resetRowSelection(true)} disabled={selectedCount === 0}>Clear selection</Button>
      <p className="basis-full text-xs text-muted-foreground">Selection stays across pages and sorting. Changing search or saving a product clears it.</p>
    </div>
    {ready && rows.length === 0 && <div className="rounded-2xl border border-dashed border-input bg-card p-8">
      <p>{total === 0 ? "No products match this search. Try another name or reset the search." : "This page is empty. Return to the first page."}</p>
      {total === 0 ? <Button type="button" className="mt-4" onClick={onResetSearch}>Show all products</Button> : <Button type="button" className="mt-4" onClick={() => table.setPageIndex(0)}>First page</Button>}
    </div>}
    <p id={helpId} className="my-4 text-sm text-muted-foreground">Activate a column button to cycle ascending, descending and original order. Select this page affects only the displayed rows.</p>
    <div role="region" aria-busy={busy} aria-label="Product inventory table" tabIndex={0} className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
      <table aria-describedby={helpId} aria-rowcount={ready ? total + 1 : undefined} className="w-full min-w-[55rem] text-left text-sm">
        <caption className="p-5 text-left text-base font-semibold">
          <span className="block max-w-64">Product inventory</span>
          <span className="mt-1 block max-w-64 text-xs font-normal text-muted-foreground">Scroll horizontally on narrow screens.</span>
        </caption>
        <thead className="border-y border-border bg-muted">
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id} aria-rowindex={1}>
              {group.headers.map((header) => <th key={header.id} scope="col" aria-sort={header.column.getIsSorted() === "asc" ? "ascending" : header.column.getIsSorted() === "desc" ? "descending" : undefined} className={`px-5 py-4 font-semibold ${header.column.id === "priceMinor" || header.column.id === "stock" ? "text-right" : "text-left"}`}>
                {header.isPlaceholder ? null : header.column.getCanSort() ? <button type="button" onClick={header.column.getToggleSortingHandler()} className="relative inline-flex min-h-11 items-center gap-2 rounded px-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                  <table.FlexRender header={header} /><span aria-hidden="true">{header.column.getIsSorted() === "asc" ? "↑" : header.column.getIsSorted() === "desc" ? "↓" : "↕"}</span>
                  <span className="sr-only">: {header.column.getNextSortingOrder() === "asc" ? "sort ascending" : header.column.getNextSortingOrder() === "desc" ? "sort descending" : "clear sorting"}</span>
                </button> : <table.FlexRender header={header} />}
              </th>)}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, index) => (
            <tr key={row.id} aria-rowindex={pagination.pageIndex * pagination.pageSize + index + 2} className="hover:bg-muted/50">
              {row.getAllCells().map((cell) => cell.column.id === "name" ? <th key={cell.id} scope="row" className="px-5 py-4 text-left align-middle font-normal">
                <table.FlexRender cell={cell} />
              </th> : <td key={cell.id} className="px-5 py-4 align-middle">
                <table.FlexRender cell={cell} />
              </td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <nav aria-label="Catalog pages" className="mt-5 flex flex-wrap items-center gap-3">
      <Button type="button" variant="outline" aria-disabled={!previousEnabled} className="aria-disabled:opacity-50" onClick={() => { if (previousEnabled) table.previousPage(); }}>Previous page</Button>
      <p className="text-sm">{ready ? (total === 0 ? "No matching pages" : `Page ${pagination.pageIndex + 1} of ${table.getPageCount()}`) : busy ? "Loading page information…" : "Page information unavailable"}</p>
      <Button type="button" variant="outline" aria-disabled={!nextEnabled} className="aria-disabled:opacity-50" onClick={() => { if (nextEnabled) table.nextPage(); }}>Next page</Button>
      <label className="flex items-center gap-2 text-sm">Rows per page
        <select value={pagination.pageSize} onChange={(event) => onPaginationChange({ pageIndex: 0, pageSize: Number(event.target.value) })} className="min-h-11 rounded border border-input bg-card px-3 focus-visible:outline-2 focus-visible:outline-ring">
          <option value={2}>2</option><option value={4}>4</option>
        </select>
      </label>
    </nav>
  </>);
}
