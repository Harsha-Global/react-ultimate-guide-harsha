import { Link, useParams, useLocation } from "react-router";
import { products } from "./products";
import { useState } from "react";
import { useShop } from "./App";
export default function ProductPage() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);
  const { cart, add } = useShop();
  const { search } = useLocation();
  const [message, setMessage] = useState("");
  if (!product)
    return (
      <section className="empty-state">
        <h1 tabIndex={-1}>Product not found</h1>
        <Link to="/">Back to collection</Link>
      </section>
    );
  const quantity =
    cart.find((line) => line.productId === product.id)?.quantity ?? 0;
  const canAdd = product.inStock && quantity < product.maxQuantity;
  return (
    <>
      <title>{`${product.name} | ShopFront`}</title>
      <Link className="back-link" to={`/${search}`}>
        ← Back to collection
      </Link>
      <div className="product-detail">
        <div className="detail-image">
          <img
            src={product.image}
            alt={product.name}
            width="720"
            height="720"
          />
        </div>
        <section className="detail-copy">
          <p className="eyebrow">The {product.category.toLowerCase()} edit</p>
          <h1 tabIndex={-1}>{product.name}</h1>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>
          <p
            className={
              product.inStock ? "availability" : "availability unavailable"
            }
          >
            {product.inStock
              ? "In stock · Ready for your everyday"
              : "Currently unavailable"}
          </p>
          <button
            className="wide"
            disabled={!canAdd}
            onClick={() => {
              add(product);
              setMessage(`${product.name} added to your bag.`);
            }}
          >
            {!product.inStock
              ? "Currently unavailable"
              : !canAdd
                ? "Bag limit reached"
                : "Add to bag"}
          </button>
          <p className="muted">
            Limit {product.maxQuantity} per bag. Availability can change.
          </p>
          <p className="feedback" role="status">
            {message}
          </p>
          <div className="detail-footnote">
            <strong>Considered from the start.</strong>
            <p>Simple, useful essentials selected for the way you live.</p>
          </div>
        </section>
      </div>
    </>
  );
}
