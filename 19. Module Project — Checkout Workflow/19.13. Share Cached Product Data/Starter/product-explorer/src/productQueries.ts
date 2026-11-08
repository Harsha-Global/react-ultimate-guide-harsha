import { queryOptions } from "@tanstack/react-query";
import { getProducts } from "./api";
import { catalogParams } from "./catalogView";
import type { CatalogView } from "./catalogView";
export const productKeys = {
  lists: () => ["products", "list"] as const,
  list: (view: CatalogView) => ["products", "list", view] as const,
};
export const catalogOptions = (view: CatalogView) =>
  queryOptions({
    queryKey: productKeys.list(view),
    queryFn: ({ signal }) => getProducts(catalogParams(view), signal),
  });
