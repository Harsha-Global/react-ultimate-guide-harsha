import type { EventFilters } from "./events.ts";
export function readFilters(params: URLSearchParams): EventFilters {
  const category = params.get("category");
  const sort = params.get("sort");
  const page = Number(params.get("page") ?? "1");
  return {
    q: (params.get("q") ?? "").trim().toLowerCase(),
    category:
      category === "art" || category === "food" || category === "outdoors"
        ? category
        : "all",
    sort: sort === "price" ? "price" : "title",
    page: Number.isSafeInteger(page) && page >= 1 ? page : 1,
  };
}
export function writeFilters(filters: EventFilters) {
  return new URLSearchParams({
    q: filters.q,
    category: filters.category,
    sort: filters.sort,
    page: String(filters.page),
  });
}
