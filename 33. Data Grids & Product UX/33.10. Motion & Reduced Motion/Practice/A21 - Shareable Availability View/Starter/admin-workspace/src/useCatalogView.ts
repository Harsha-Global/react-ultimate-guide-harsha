// TODO A21: Extend the shared-view contract with validated availability filtering.
import { useQueryStates } from "nuqs";
import type { ColumnFiltersState, OnChangeFn, PaginationState, SortingState } from "@tanstack/react-table";
import { viewParsers } from "./viewParsers";

export function useCatalogView() {
  const [view, setView] = useQueryStates(viewParsers, { history: "replace", scroll: false });
  const query = view.q;
  const sorting: SortingState = view.sort ? [{ id: view.sort, desc: view.dir === "desc" }] : [];
  const columnFilters: ColumnFiltersState = query ? [{ id: "name", value: query }] : [];
  const pagination: PaginationState = { pageIndex: view.page - 1, pageSize: view.size };

  function setQuery(q: string) { void setView({ q, page: 1 }, { history: "replace" }); }
  const changeFilters: OnChangeFn<ColumnFiltersState> = (updater) => {
    const next = typeof updater === "function" ? updater(columnFilters) : updater;
    const value = next.find((filter) => filter.id === "name")?.value;
    setQuery(typeof value === "string" ? value : "");
  };
  const changeSorting: OnChangeFn<SortingState> = (updater) => {
    const next = typeof updater === "function" ? updater(sorting) : updater;
    const first = next[0];
    const sort = viewParsers.sort.parse(first?.id ?? "") ?? "";
    void setView({ sort, dir: sort && first?.desc ? "desc" : "asc", page: 1 }, { history: "push" });
  };
  const changePagination: OnChangeFn<PaginationState> = (updater) => {
    const next = typeof updater === "function" ? updater(pagination) : updater;
    void setView({ page: next.pageIndex + 1, size: next.pageSize === 4 ? 4 : 2 }, { history: "push" });
  };
  function resetPage() { void setView({ page: 1 }, { history: "replace" }); }
  return { query, setQuery, sorting, changeSorting, columnFilters, changeFilters, pagination, changePagination, resetPage };
}
