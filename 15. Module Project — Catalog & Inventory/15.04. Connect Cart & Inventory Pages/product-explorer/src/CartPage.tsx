import { products } from "./products";
import { useShop } from "./App";
import CartPanel from "./CartPanel";
import DeliveryPreferences from "./DeliveryPreferences";
import { cartItemCount, cartSubtotal } from "./cart";
export default function CartPage() {
  const { cart, add, changeQuantity, remove, delivery, saveDelivery } =
    useShop();
  const available = products.filter((p) => p.inStock);
  return (
    <>
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
        <DeliveryPreferences initialValues={delivery} onSave={saveDelivery} />
      </div>
    </>
  );
}
