import { useLoaderData } from "react-router";
import type { allProductsLoader } from "./loaders";
import { useState } from "react";
import ProductCard from "./ProductCard";
export default function Catalog() {
  const { items: products } = useLoaderData<typeof allProductsLoader>();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const visibleProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.trim().toLowerCase()) &&
      (!category || p.category === category),
  );
  return (
    <>
      <title>Collection | ShopFront</title>
      <section className="collection-intro">
        <div>
          <p className="eyebrow">The everyday collection</p>
          <h1 tabIndex={-1}>
            Good things,
            <br />
            <span>chosen with care.</span>
          </h1>
          <p>
            Thoughtful essentials for your home, your work,
            <br className="desktop-only" /> and wherever the day takes you.
          </p>
        </div>
        <div className="collection-note">
          <span className="collection-number">01 /</span>
          <p>
            A small collection.
            <br />A little more considered.
          </p>
        </div>
      </section>
      <section aria-label="Product filters" className="filter-bar">
        <label>
          Search the collection
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try a lamp or backpack"
          />
        </label>
        <label>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            <option>Home</option>
            <option>Travel</option>
            <option>Audio</option>
          </select>
        </label>
      </section>
      <div className="results-heading">
        <p>{visibleProducts.length} considered essentials</p>
        <span>Find your everyday favourite</span>
      </div>
      <div className="product-grid">
        {visibleProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {visibleProducts.length === 0 && (
        <section className="empty-state">
          <h2>No matching products</h2>
          <p>Try another search or clear your filters.</p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("");
            }}
          >
            Clear filters
          </button>
        </section>
      )}
    </>
  );
}
