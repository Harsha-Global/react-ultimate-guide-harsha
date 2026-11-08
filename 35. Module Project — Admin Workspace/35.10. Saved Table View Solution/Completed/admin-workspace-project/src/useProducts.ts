import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "./catalogApi";

type CatalogResult = Awaited<ReturnType<typeof getProducts>>;
type CatalogState = { status: "loading" } | { status: "error" } | { status: "ready"; result: CatalogResult };
export function useProducts(query: string) {
  const client = useQueryClient();
  const result = useQuery({
    queryKey: ["catalog", query],
    queryFn: ({ signal }) => getProducts(query, signal),
    staleTime: 30_000,
  });
  const state: CatalogState = result.data
    ? { status: "ready", result: result.data }
    : result.isPending ? { status: "loading" } : { status: "error" };
  return {
    state,
    refreshing: result.isFetching && result.data !== undefined,
    refreshFailed: result.isError && result.data !== undefined,
    retry: () => { void result.refetch(); },
    refreshCatalog: () => client.invalidateQueries({ queryKey: ["catalog"] }),
  };
}
