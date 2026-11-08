import { useQuery } from "@tanstack/react-query";
import { allProductsOptions } from "./productQueries";
import { QueryFeedback } from "./QueryFeedback";
import { Link } from "react-router";
import { useShop } from "./App";
import CartPanel from "./CartPanel";
import DeliveryPreferences from "./DeliveryPreferences";
import { cartItemCount, cartSubtotal } from "./cart";
export default function CartPage() {
  const query = useQuery(allProductsOptions());
  const products = query.data?.items ?? [];
  const { cart, add, changeQuantity, remove, delivery, saveDelivery } =
    useShop();
  const available = products.filter((p) => p.inStock);
  if (!query.data) return <QueryFeedback query={query} />;
  return (
    <>
      <QueryFeedback query={query} />
      <title>Your bag | ShopFront</title>
      <div className="page-heading">
        <p className="eyebrow">Your considered choices</p>
        <h1 tabIndex={-1}>A few good things.</h1>
      </div>
      <div className="cart-layout">
        <CartPanel
          lines={cart}
          products={products}
          itemCount={cartItemCount(cart)}
          subtotal={cartSubtotal(cart, available)}
          onIncrease={add}
          onDecrease={changeQuantity}
          onRemove={remove}
        />
        <div>
          <DeliveryPreferences initialValues={delivery} onSave={saveDelivery} />
          <Link className="button checkout-link" to="/checkout">
            Review checkout
          </Link>
        </div>
      </div>
    </>
  );
}
