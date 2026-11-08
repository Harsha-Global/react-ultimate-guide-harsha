import { queryOptions } from "@tanstack/react-query";
import { getProducts, getProduct } from "./api";
import { catalogParams } from "./catalogView";
import type { CatalogView } from "./catalogView";
export const productKeys = {
    lists: () => ["products", "list"] as const,
    all: () => ["products", "list", "all"] as const,
    list: (view: CatalogView) => ["products", "list", view] as const,
    detail: (id: string) => ["products", "detail", id] as const,
};
export const allProductsOptions = () => queryOptions({
    queryKey: productKeys.all(),
    queryFn: ({ signal }) => getProducts(new URLSearchParams(), signal),
});
export const catalogOptions = (view: CatalogView) => queryOptions({
    queryKey: productKeys.list(view),
    queryFn: ({ signal }) => getProducts(catalogParams(view), signal),
});
export const productOptions = (id: string) => queryOptions({
    queryKey: productKeys.detail(id),
    queryFn: ({ signal }) => getProduct(id, signal),
});
