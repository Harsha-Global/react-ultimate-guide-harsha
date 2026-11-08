export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to products</a>
      <main id="main-content" tabIndex={-1}>
        <header><p className="eyebrow">Everyday finds</p><h1>Product Explorer</h1>
          <p>Find useful things for your day.</p></header>
        <section aria-label="Project plan">
          <h2>What we will build</h2>
          <p>Browse products, narrow the list, and inspect a product.</p>
        </section>
      </main>
    </>
  );
}
