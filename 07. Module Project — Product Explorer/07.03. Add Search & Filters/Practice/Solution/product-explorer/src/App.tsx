import { useState } from "react";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import { products } from "./products";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const normalizedQuery = query.trim().toLowerCase();
  const visibleProducts = products.filter(product =>
    product.name.toLowerCase().includes(normalizedQuery) &&
    (category === "all" || product.category === category) &&
    (!inStockOnly || product.inStock));

  function handleClearFilters() {
    setQuery("");
    setCategory("all");
    setInStockOnly(false);
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to products</a>
      <main id="main-content" tabIndex={-1}>
        <header><p className="eyebrow">Everyday finds</p><h1>Product Explorer</h1>
          <p>Find useful things for your day.</p></header>
        <ProductFilters onClear={handleClearFilters} query={query} category={category} inStockOnly={inStockOnly}
          onQueryChange={setQuery} onCategoryChange={setCategory} onInStockChange={setInStockOnly} />
        <p role="status">Products found: {visibleProducts.length}</p>
        <section aria-labelledby="products-heading">
          <h2 id="products-heading">Products</h2>
          <ProductGrid products={visibleProducts} />
        </section>
      </main>
    </>
  );
}
