import { useMemo } from "react";
import { createColumnHelper, tableFeatures, useTable } from "@tanstack/react-table";
import type { Product } from "../catalog";
import { formatPrice } from "../catalog";
import { StockCell } from "./StockCell";
import { ProductActions } from "./ProductActions";

const features = tableFeatures({});
const columnHelper = createColumnHelper<typeof features, Product>();

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  disabled: boolean;
};

export function ProductTable({ products, onEdit, disabled }: ProductTableProps) {
  const columns = useMemo(() => columnHelper.columns([
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
  ]), [onEdit, disabled]);

  const table = useTable({
    features,
    columns,
    data: products,
    getRowId: (product) => product.id,
  });

  return (
    <div role="region" aria-label="Product inventory table" tabIndex={0} className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
      <table className="w-full min-w-[50rem] text-left text-sm">
        <caption className="p-5 text-left text-base font-semibold">
          <span className="block max-w-64">Product inventory</span>
          <span className="mt-1 block max-w-64 text-xs font-normal text-muted-foreground">Scroll horizontally on narrow screens.</span>
        </caption>
        <thead className="border-y border-border bg-muted">
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => <th key={header.id} scope="col" className={`px-5 py-4 font-semibold ${header.column.id === "priceMinor" || header.column.id === "stock" ? "text-right" : "text-left"}`}>
                {header.isPlaceholder ? null : <table.FlexRender header={header} />}
              </th>)}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-border">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-muted/50">
              {row.getAllCells().map((cell) => <td key={cell.id} className="px-5 py-4 align-middle">
                <table.FlexRender cell={cell} />
              </td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
