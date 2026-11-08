import { useEffect, useState } from "react";
import { getProducts } from "./api";
import type { Product } from "./types";
export default function RaceLab() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [completedQuery, setCompletedQuery] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setPending(true);
    setError("");
    getProducts(new URLSearchParams({ q: query }))
      .then((result) => {
        setProducts(result.items);
        setCompletedQuery(query);
      })
      .catch(() => setError("The request failed."))
      .finally(() => setPending(false));
  }, [query]);
  return (
    <section className="inventory-panel" style={{ padding: 32 }}>
      <p className="eyebrow">Request timing investigation</p>
      <h1 tabIndex={-1}>Which search owns these results?</h1>
      <p>
        In the API terminal, use the supplied race timing mode. Choose L, then
        Lamp before the first response arrives.
      </p>
      <label>
        Search draft
        <input
          aria-label="Search draft"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div className="actions">
        <button onClick={() => setQuery("l")}>Search L</button>
        <button onClick={() => setQuery("lamp")}>Search Lamp</button>
        <button onClick={() => setQuery("")}>Clear search</button>
      </div>
      <p role="status">
        {pending
          ? "Waiting for a response…"
          : `Showing response for: ${completedQuery || "all products"}`}
      </p>
      {error && <p role="alert">{error}</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}
