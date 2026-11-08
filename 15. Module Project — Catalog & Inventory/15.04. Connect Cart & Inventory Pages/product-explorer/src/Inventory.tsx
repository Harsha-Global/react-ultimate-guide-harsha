import { products } from "./products";
export default function Inventory() {
  return (
    <>
      <title>Inventory | ShopFront</title>
      <div className="page-heading">
        <p className="eyebrow">ShopFront studio</p>
        <h1 tabIndex={-1}>Your collection, cared for.</h1>
        <p>Keep product information clear, useful and up to date.</p>
      </div>
      <section className="inventory-panel">
        <div className="inventory-heading">
          <h2>Products</h2>
          <span role="status">{products.length} in your collection</span>
        </div>
        <ul className="inventory-list">
          {products.map((p) => (
            <li key={p.id}>
              <img src={p.image} alt="" width="80" height="80" />
              <div className="inventory-name">
                <h3>{p.name}</h3>
                <p>
                  {p.category} · {p.id}
                </p>
              </div>
              <span className="price">${p.price.toFixed(2)}</span>
              <span
                className={
                  p.inStock ? "availability" : "availability unavailable"
                }
              >
                {p.inStock ? "In stock" : "Unavailable"}
              </span>
            </li>
          ))}
        </ul>
        {products.length === 0 && (
          <p className="empty-state">Your collection is empty.</p>
        )}
      </section>
      <p className="muted">
        Local inventory workspace for this course project.
      </p>
    </>
  );
}
