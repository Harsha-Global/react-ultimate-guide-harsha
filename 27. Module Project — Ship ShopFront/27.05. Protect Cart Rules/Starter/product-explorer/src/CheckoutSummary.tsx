import { Link } from "react-router";
import { useCart } from "./CartProvider";
import { cartItemCount, cartSubtotal } from "./cart";
import type { Product } from "./types";
export function hasCartIssue(cart: ReturnType<typeof useCart>["cart"], products: Product[]) {
    return cart.some((line) => {
        const product = products.find((p) => p.id === line.productId);
        return !product || !product.inStock || line.quantity > product.maxQuantity;
    });
}
export function CheckoutSummary({ products, disabled = false, }: {
    products: Product[];
    disabled?: boolean;
}) {
    const { cart, add, changeQuantity, remove } = useCart();
    const available = products.filter((p) => p.inStock);
    const count = cartItemCount(cart);
    return (<aside className="checkout-summary" aria-label="Checkout summary">
      <p className="eyebrow">Your considered choices</p>
      <div className="summary-heading">
        <h2>Order summary</h2>
        <span>
          {count} {count === 1 ? "item" : "items"}
        </span>
      </div>
      {cart.length === 0 ? (<div className="empty-state">
          <p>Your bag is empty.</p>
          <Link className="button" to="/">
            Explore the collection
          </Link>
        </div>) : (<>
          <ul className="summary-lines">
            {cart.map((line) => {
                const product = products.find((p) => p.id === line.productId);
                return (<li key={line.productId}>
                  {product ? (<>
                      <img src={product.image} alt=""/>
                      <div>
                        <strong>{product.name}</strong>
                        <p>${product.price.toFixed(2)} each</p>
                        <div className="summary-quantity">
                          <button type="button" aria-label={`Decrease ${product.name} quantity`} disabled={disabled || line.quantity <= 1} onClick={() => changeQuantity(product, line.quantity - 1)}>
                            −
                          </button>
                          <span>{line.quantity}</span>
                          <button type="button" aria-label={`Increase ${product.name} quantity`} disabled={disabled || !product.inStock || line.quantity >= product.maxQuantity} onClick={() => add(product)}>
                            +
                          </button>
                        </div>
                        <button className="text-button" type="button" disabled={disabled} onClick={() => remove(product.id)}>
                          Remove {product.name}
                        </button>
                        {(!product.inStock ||
                            line.quantity > product.maxQuantity) && (<p className="field-error">
                            Availability changed. Update your bag.
                          </p>)}
                      </div>
                      <strong className="line-total">
                        ${(product.price * line.quantity).toFixed(2)}
                      </strong>
                    </>) : (<div>
                      <p>This product is no longer available.</p>
                      <button type="button" disabled={disabled} onClick={() => remove(line.productId)}>
                        Remove unavailable item
                      </button>
                    </div>)}
                </li>);
            })}
          </ul>
          <div className="summary-subtotal">
            <span>Available item subtotal</span>
            <strong>${cartSubtotal(cart, available).toFixed(2)}</strong>
          </div>
          <p className="muted">
            Delivery and tax are not included. No order is placed.
          </p>
          {hasCartIssue(cart, products) && (<p className="field-error" role="alert">
              Review the unavailable items or quantities before continuing.
            </p>)}
        </>)}
    </aside>);
}
