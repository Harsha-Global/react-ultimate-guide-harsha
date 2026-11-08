import { useMemo } from "react";
import { createColumnHelper, tableFeatures, useTable, rowSortingFeature, createSortedRowModel, columnFilteringFeature, createFilteredRowModel, sortFn_text, sortFn_basic } from "@tanstack/react-table";
import type { SortingState, ColumnFiltersState, OnChangeFn } from "@tanstack/react-table";
import { Button } from "./ui/button";
import type { Product } from "../catalog";
import { formatPrice } from "../catalog";
import { StockCell } from "./StockCell";
import { ProductActions } from "./ProductActions";

const features = tableFeatures({ rowSortingFeature, sortedRowModel: createSortedRowModel(), columnFilteringFeature, filteredRowModel: createFilteredRowModel() });
const columnHelper = createColumnHelper<typeof features, Product>();

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  disabled: boolean;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  columnFilters: ColumnFiltersState;
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>;
  onResetSearch: () => void;
};

export function ProductTable({ products, onEdit, disabled, sorting, onSortingChange, columnFilters, onColumnFiltersChange, onResetSearch }: ProductTableProps) {
  const columns = useMemo(() => columnHelper.columns([
    columnHelper.accessor("name", {
      header: "Product",
      sortFn: sortFn_text,
      filterFn: (row, _columnId, value: unknown) => typeof value === "string" && row.original.name.toLowerCase().includes(value.trim().toLowerCase()),
      cell: (info) => <div className="flex items-center gap-3">
        <img src={info.row.original.image} alt="" width={48} height={48} className="size-12 rounded-lg object-cover" />
        <div><p className="font-semibold">{info.getValue()}</p><p className="mt-1 font-mono text-xs text-muted-foreground">{info.row.original.id}</p></div>
      </div>,
    }),
    columnHelper.accessor("category", { header: "Category", sortFn: sortFn_text }),
    columnHelper.accessor("priceMinor", {
      header: "Price (USD)",
      sortFn: sortFn_basic,
      cell: (info) => <span className="block text-right font-semibold tabular-nums">{formatPrice(info.getValue())}</span>,
    }),
    columnHelper.accessor("stock", {
      header: "Stock",
      sortFn: sortFn_basic,
      cell: (info) => <StockCell units={info.getValue()} />,
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <ProductActions product={row.original} onEdit={() => onEdit(row.original)} disabled={disabled} />,
    }),
  ]), [onEdit, disabled]);

  const table = useTable({
    features,
    columns,
    data: products,
    state: { sorting, columnFilters },
    onSortingChange,
    onColumnFiltersChange,
    sortDescFirst: false,
    enableMultiSort: false,
    getRowId: (product) => product.id,
  });

  const rows = table.getRowModel().rows;

  return (<>
    <p role="status" className="my-5 text-sm text-muted-foreground">{rows.length} of {products.length} products shown</p>
    {rows.length === 0 ? <div className="rounded-2xl border border-dashed border-input bg-card p-8">
      <p>No products match this search. Try another name or reset the search.</p>
      <Button type="button" className="mt-4" onClick={onResetSearch}>Show all products</Button>
    </div> : <div role="region" aria-label="Product inventory table" tabIndex={0} className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
      <table className="w-full min-w-[50rem] text-left text-sm">
        <caption className="p-5 text-left text-base font-semibold">
          <span className="block max-w-64">Product inventory</span>
          <span className="mt-1 block max-w-64 text-xs font-normal text-muted-foreground">Scroll horizontally on narrow screens.</span>
        </caption>
        <thead className="border-y border-border bg-muted">
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
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
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-muted/50">
              {row.getAllCells().map((cell) => <td key={cell.id} className="px-5 py-4 align-middle">
                <table.FlexRender cell={cell} />
              </td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>}
  </>);
}
