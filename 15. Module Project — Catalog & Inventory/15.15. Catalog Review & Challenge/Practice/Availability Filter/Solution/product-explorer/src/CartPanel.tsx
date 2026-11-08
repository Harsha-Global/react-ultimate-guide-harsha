import type { CartLine } from "./cart";
import type { Product } from "./types";

type CartPanelProps = Readonly<{
  lines: readonly CartLine[];
  itemCount: number;
  subtotal: number;
  products: readonly Product[];
  onIncrease: (product: Product) => void;
  onDecrease: (product: Product, quantity: number) => void;
  onRemove: (productId: string) => void;
}>;

export default function CartPanel({
  lines,
  itemCount,
  subtotal,
  products,
  onIncrease,
  onDecrease,
  onRemove,
}: CartPanelProps) {
  return (
    <section className="cart-panel" aria-labelledby="cart-heading">
      <div className="cart-heading">
        <h2 id="cart-heading">Your cart</h2>
        <span>
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>
      {lines.length === 0 && (
        <p>Your cart is empty. Choose a product to begin.</p>
      )}
      {lines.length > 0 && (
        <ul className="cart-lines">
          {lines.map((line) => {
            const product = products.find((item) => item.id === line.productId);
            if (!product)
              return (
                <li key={line.productId}>
                  <span>
                    Unavailable product ({line.productId}) · Quantity:{" "}
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(line.productId)}
                  >
                    Remove unavailable item
                  </button>
                </li>
              );
            return (
              <li key={line.productId}>
                <div className="cart-product">
                  <img src={product.image} alt="" width="88" height="88" />
                  <div>
                    <strong>{product.name}</strong>
                    <p>${product.price.toFixed(2)}</p>
                    {(!product.inStock ||
                      line.quantity > product.maxQuantity) && (
                      <p className="field-error">
                        Availability changed. Reduce the quantity or remove this
                        item.
                      </p>
                    )}
                  </div>
                </div>
                <div className="quantity-controls">
                  <button
                    type="button"
                    disabled={line.quantity <= 1}
                    aria-label={`Decrease ${product.name} quantity`}
                    onClick={() => onDecrease(product, line.quantity - 1)}
                  >
                    −
                  </button>
                  <span>Quantity: {line.quantity}</span>
                  <button
                    type="button"
                    disabled={
                      !product.inStock || line.quantity >= product.maxQuantity
                    }
                    aria-label={`Increase ${product.name} quantity`}
                    onClick={() => onIncrease(product)}
                  >
                    +
                  </button>
                  <button type="button" onClick={() => onRemove(product.id)}>
                    Remove {product.name}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p className="cart-subtotal">
        Available item subtotal: ${subtotal.toFixed(2)}
      </p>
      <p className="cart-note">
        Unavailable products are excluded. Check quantity warnings before
        continuing. Tax and delivery are not included; no order is placed.
      </p>
    </section>
  );
}
