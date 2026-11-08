import ProductDetails from "./ProductDetails";
import { useState } from "react";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import { products } from "./products";
import CartPanel from "./CartPanel";
import { cartItemCount } from "./cart";
import type { CartLine } from "./cart";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [cart] = useState<CartLine[]>([]);
  const itemCount = cartItemCount(cart);
  const selectedProduct = products.find(product => product.id === selectedId);
  const normalizedQuery = query.trim().toLowerCase();
  const visibleProducts = products.filter(product =>
    product.name.toLowerCase().includes(normalizedQuery) &&
    (category === "all" || product.category === category) &&
    (!inStockOnly || product.inStock));

  const isSelectionVisible = visibleProducts.some(product => product.id === selectedId);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to products</a>
      <main id="main-content" tabIndex={-1}>
        <header><p className="eyebrow">Everyday finds</p><h1>Product Explorer</h1>
          <p>Find useful things for your day.</p></header>
        <ProductFilters query={query} category={category} inStockOnly={inStockOnly}
          onQueryChange={setQuery} onCategoryChange={setCategory} onInStockChange={setInStockOnly} />
        <p role="status">Products found: {visibleProducts.length}</p>
        <div className="explorer-layout">
        <section aria-labelledby="products-heading">
          <h2 id="products-heading">Products</h2>
          <ProductGrid products={visibleProducts} selectedId={selectedId} onSelect={setSelectedId} />
        </section>
        <ProductDetails product={selectedProduct} isVisible={isSelectionVisible} />
        </div>
        <CartPanel lines={cart} itemCount={itemCount} />
      </main>
    </>
  );
}
