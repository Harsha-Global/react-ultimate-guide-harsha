import type { Product } from "./types";

type ProductDetailsProps = {
  readonly product: Product | undefined;
  readonly isVisible: boolean;
};

export default function ProductDetails({ product, isVisible }: ProductDetailsProps) {
  return (
    <aside className="product-details" aria-labelledby="details-heading">
      <h2 id="details-heading">Product details</h2>
      {product ? <>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>${product.price.toLocaleString("en-US")} — {product.inStock ? "In stock" : "Out of stock"}</p>
        {!isVisible && <p>This selection is outside the current filters.</p>}
      </> : <p>Select a product to see its details.</p>}
    </aside>
  );
}
