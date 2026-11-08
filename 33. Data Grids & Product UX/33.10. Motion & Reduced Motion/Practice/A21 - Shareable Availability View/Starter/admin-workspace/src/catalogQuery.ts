// TODO A21: Extend the shared-view contract with validated availability filtering.
import type { SortingState, PaginationState } from "@tanstack/react-table";
export function buildCatalogQuery(query: string, sorting: SortingState, pagination: PaginationState): string {
  const params = new URLSearchParams();
  const search = query.trim().toLowerCase();
  if (search) params.set("q", search);
  const sort = sorting[0];
  if (sort && ["name", "category", "priceMinor", "stock"].includes(sort.id)) {
    params.set("sort", sort.id);
    params.set("dir", sort.desc ? "desc" : "asc");
  }
  params.set("page", String(pagination.pageIndex + 1));
  params.set("pageSize", String(pagination.pageSize));
  return params.toString();
}
