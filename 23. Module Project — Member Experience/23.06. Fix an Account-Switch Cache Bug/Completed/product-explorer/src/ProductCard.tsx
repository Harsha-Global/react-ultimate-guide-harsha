import { Link } from "react-router";
import type { Product } from "./types";
export default function ProductCard({
  product,
  returnSearch = "",
}: {
  product: Product;
  returnSearch?: string;
}) {
  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/products/${product.id}${returnSearch}`} aria-label={`View ${product.name}`}>
        <img src={product.image} alt={product.name} width="600" height="600" />
        <span className={product.inStock ? "stock-tag" : "stock-tag unavailable"}>
          {product.inStock ? "In stock" : "Currently unavailable"}
        </span>
      </Link>
      <div className="product-meta">
        <p className="eyebrow">{product.category}</p>
        <div className="product-title">
          <h2>
            <Link to={`/products/${product.id}${returnSearch}`}>
              {product.name}
            </Link>
          </h2>
          <span className="price">${product.price.toFixed(2)}</span>
        </div>
        <p>{product.description}</p>
      </div>
    </article>
  );
}
