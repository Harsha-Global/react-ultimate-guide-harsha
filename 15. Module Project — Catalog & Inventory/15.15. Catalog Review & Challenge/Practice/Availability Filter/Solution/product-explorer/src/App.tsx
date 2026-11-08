import { useEffect, useRef } from "react";
import {
  Link,
  NavLink,
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigation,
  useOutletContext,
} from "react-router";
import {
  addToCart,
  cartItemCount,
  changeCartQuantity,
  removeFromCart,
} from "./cart";
import type { CartLine } from "./cart";
import type { DeliveryValues } from "./DeliveryPreferences";
import type { Product } from "./types";
import { useSavedValue } from "./useSavedValue";
import { emptyDelivery, isCart, isDelivery } from "./storage";

type ShopContext = {
  cart: CartLine[];
  add: (product: Product) => void;
  changeQuantity: (product: Product, quantity: number) => void;
  remove: (id: string) => void;
  delivery: DeliveryValues;
  saveDelivery: (value: DeliveryValues) => void;
};
export function useShop() {
  return useOutletContext<ShopContext>();
}
export default function App() {
  const [cart, setCart] = useSavedValue<CartLine[]>(
    "shopfront-cart-v1",
    [],
    isCart,
  );
  const [delivery, saveDelivery] = useSavedValue<DeliveryValues>(
    "shopfront-delivery-v1",
    emptyDelivery,
    isDelivery,
  );
  const location = useLocation();
  const navigation = useNavigation();
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    if (previousPath.current !== location.pathname) {
      document
        .querySelector<HTMLElement>("main h1")
        ?.focus({ preventScroll: true });
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);
  const context: ShopContext = {
    cart,
    delivery,
    saveDelivery,
    add: (product) => setCart((current) => addToCart(current, product)),
    changeQuantity: (product, quantity) =>
      setCart((current) => changeCartQuantity(current, product, quantity)),
    remove: (id) => setCart((current) => removeFromCart(current, id)),
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="brand-strip">Thoughtfully chosen. Made for everyday.</div>
      <header className="site-header">
        <div className="header-inner">
          <Link className="wordmark" to="/" aria-label="ShopFront home">
            shopfront<span aria-hidden="true">.</span>
          </Link>
          <nav aria-label="Main navigation">
            <NavLink to="/" end>
              Collection
            </NavLink>
            <NavLink to="/inventory">Inventory</NavLink>
            <NavLink to="/cart">
              Your bag <span className="bag-count">{cartItemCount(cart)}</span>
            </NavLink>
          </nav>
        </div>
      </header>
      <div className="navigation-status" role="status">
        {navigation.state !== "idle" ? "Updating your view…" : ""}
      </div>
      <main id="main" className="site-main">
        <Outlet context={context} />
      </main>
      <footer className="site-footer">
        <Link className="wordmark" to="/">
          shopfront<span>.</span>
        </Link>
        <p>Useful things. Considered choices.</p>
        <span>Home · Work · Travel</span>
      </footer>
      <ScrollRestoration />
    </>
  );
}
