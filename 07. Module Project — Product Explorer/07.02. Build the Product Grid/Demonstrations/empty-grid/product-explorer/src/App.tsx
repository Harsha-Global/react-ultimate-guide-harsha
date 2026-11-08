import ProductGrid from "./ProductGrid";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to products</a>
      <main id="main-content" tabIndex={-1}>
        <header><p className="eyebrow">Everyday finds</p><h1>Product Explorer</h1>
          <p>Find useful things for your day.</p></header>
        <section aria-labelledby="products-heading">
          <h2 id="products-heading">Products</h2>
          <ProductGrid products={[]} />
        </section>
      </main>
    </>
  );
}
