import type { SortingState } from "@tanstack/react-table";
export function buildCatalogQuery(query: string, sorting: SortingState): string {
  const params = new URLSearchParams();
  const search = query.trim().toLowerCase();
  if (search) params.set("q", search);
  const sort = sorting[0];
  if (sort && ["name", "category", "priceMinor", "stock"].includes(sort.id)) {
    params.set("sort", sort.id);
    params.set("dir", sort.desc ? "desc" : "asc");
  }
  return params.toString();
}
