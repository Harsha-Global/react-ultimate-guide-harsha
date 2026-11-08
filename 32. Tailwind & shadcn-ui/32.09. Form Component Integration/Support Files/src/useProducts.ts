import { useEffect, useState } from "react";
import type { Product } from "./catalog";
import { getProducts } from "./catalogApi";

type CatalogState = { status: "loading" } | { status: "error" } | { status: "ready"; products: Product[] };
export function useProducts() {
  const [state, setState] = useState<CatalogState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });
    getProducts(controller.signal).then((products) => {
      if (!controller.signal.aborted) setState({ status: "ready", products });
    }).catch(() => { if (!controller.signal.aborted) setState({ status: "error" }); });
    return () => controller.abort();
  }, [attempt]);
  function acceptProduct(product: Product) {
    setState((current) => current.status === "ready" ? { ...current, products: current.products.map((item) => item.id === product.id ? product : item) } : current);
  }
  return { state, acceptProduct, retry: () => setAttempt((value) => value + 1) };
}
