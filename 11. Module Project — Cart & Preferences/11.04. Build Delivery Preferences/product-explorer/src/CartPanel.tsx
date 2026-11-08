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

export default function CartPanel({ lines, itemCount, subtotal, products, onIncrease, onDecrease, onRemove }: CartPanelProps) {
  return (
    <section className="cart-panel" aria-labelledby="cart-heading">
      <div className="cart-heading">
        <h2 id="cart-heading">Your cart</h2>
        <span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>
      </div>
      {lines.length === 0 && <p>Your cart is empty. Choose a product to begin.</p>}
      {lines.length > 0 && <ul className="cart-lines">{lines.map(line => {
        const product = products.find(item => item.id === line.productId);
        if (!product) return null;
        return <li key={line.productId}>
          <span>{product.name}</span>
          <div className="quantity-controls">
            <button type="button" disabled={line.quantity <= 1} aria-label={`Decrease ${product.name} quantity`}
              onClick={() => onDecrease(product, line.quantity - 1)}>−</button>
            <span>Quantity: {line.quantity}</span>
            <button type="button" disabled={line.quantity >= product.maxQuantity} aria-label={`Increase ${product.name} quantity`}
              onClick={() => onIncrease(product)}>+</button>
            <button type="button" onClick={() => onRemove(product.id)}>Remove {product.name}</button>
          </div>
        </li>;
      })}</ul>}
      <p className="cart-subtotal">Subtotal: ${subtotal.toFixed(2)}</p>
      <p className="cart-note">Tax and delivery are not included in this practice cart.</p>
    </section>
  );
}
