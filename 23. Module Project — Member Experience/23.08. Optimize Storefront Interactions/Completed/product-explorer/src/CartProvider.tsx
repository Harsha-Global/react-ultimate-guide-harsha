import { createContext, useContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import { addToCart, changeCartQuantity, removeFromCart } from "./cart";
import type { CartLine } from "./cart";
import type { Product } from "./types";
import { isCart } from "./storage";
type CartAction =
  | { type: "added"; product: Product }
  | { type: "quantityChanged"; product: Product; quantity: number }
  | { type: "removed"; productId: string }
  | { type: "cleared" };
export function cartReducer(cart: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "cleared":
      return [];
    case "added":
      return addToCart(cart, action.product);
    case "quantityChanged":
      return changeCartQuantity(cart, action.product, action.quantity);
    case "removed":
      return removeFromCart(cart, action.productId);
  }
}
function initialCart(): CartLine[] {
  try {
    const raw = localStorage.getItem("shopfront-cart-v1");
    if (raw === null) return [];
    const value: unknown = JSON.parse(raw);
    return isCart(value) ? value : [];
  } catch {
    return [];
  }
}
type CartContextValue = {
  cart: CartLine[];
  clear: () => void;
  add: (product: Product) => void;
  changeQuantity: (product: Product, quantity: number) => void;
  remove: (productId: string) => void;
};
const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, initialCart);
  useEffect(() => {
    try {
      localStorage.setItem("shopfront-cart-v1", JSON.stringify(cart));
    } catch {
      /* The current session still works when storage is unavailable. */
    }
  }, [cart]);
  const value: CartContextValue = {
    cart,
    clear: () => dispatch({ type: "cleared" }),
    add: (product) => dispatch({ type: "added", product }),
    changeQuantity: (product, quantity) =>
      dispatch({ type: "quantityChanged", product, quantity }),
    remove: (productId) => dispatch({ type: "removed", productId }),
  };
  return <CartContext value={value}>{children}</CartContext>;
}
export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("CartProvider is required above this view.");
  return value;
}
