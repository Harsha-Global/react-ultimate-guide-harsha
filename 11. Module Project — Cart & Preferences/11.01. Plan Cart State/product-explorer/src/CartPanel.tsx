import type { CartLine } from "./cart";

type CartPanelProps = Readonly<{
  lines: readonly CartLine[];
  itemCount: number;
}>;

export default function CartPanel({ lines, itemCount }: CartPanelProps) {
  return (
    <section className="cart-panel" aria-labelledby="cart-heading">
      <div className="cart-heading">
        <h2 id="cart-heading">Your cart</h2>
        <span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>
      </div>
      {lines.length === 0 && <p>Your cart is empty. Choose a product to begin.</p>}
    </section>
  );
}
