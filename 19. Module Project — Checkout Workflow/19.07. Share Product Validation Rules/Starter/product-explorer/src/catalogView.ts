export type CatalogView = {
  q: string;
  category: string;
  sort: string;
  page: number;
};
export function readCatalogView(search: URLSearchParams): CatalogView {
  const rawPage = Number(search.get("page"));
  const category = search.get("category") ?? "";
  const sort = search.get("sort") ?? "featured";
  return {
    q: (search.get("q") ?? "").trim().slice(0, 80),
    category: ["Home", "Travel", "Audio"].includes(category) ? category : "",
    sort: ["featured", "name", "price-asc", "price-desc"].includes(sort)
      ? sort
      : "featured",
    page: Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1,
  };
}
export function catalogParams(view: CatalogView): URLSearchParams {
  const search = new URLSearchParams();
  if (view.q) search.set("q", view.q);
  if (view.category) search.set("category", view.category);
  if (view.sort !== "featured") search.set("sort", view.sort);
  if (view.page > 1) search.set("page", String(view.page));
  search.set("limit", "3");
  return search;
}
