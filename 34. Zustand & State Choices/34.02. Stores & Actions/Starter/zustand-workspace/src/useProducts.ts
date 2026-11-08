import { useEffect, useState } from "react";
import { getProducts } from "./catalogApi";

type CatalogResult = Awaited<ReturnType<typeof getProducts>>;
type CatalogState = { status: "loading" } | { status: "error" } | { status: "ready"; result: CatalogResult };
type TaggedState = { key: string; value: CatalogState };
export function useProducts(query: string) {
  const [attempt, setAttempt] = useState(0);
  const key = JSON.stringify([query, attempt]);
  const [stored, setStored] = useState<TaggedState>({ key: "", value: { status: "loading" } });
  useEffect(() => {
    const controller = new AbortController();
    setStored({ key, value: { status: "loading" } });
    getProducts(query, controller.signal).then((result) => {
      if (!controller.signal.aborted) setStored({ key, value: { status: "ready", result } });
    }).catch(() => { if (!controller.signal.aborted) setStored({ key, value: { status: "error" } }); });
    return () => controller.abort();
  }, [query, key]);
  const state: CatalogState = stored.key === key ? stored.value : { status: "loading" };
  return { state, retry: () => setAttempt((value) => value + 1) };
}
