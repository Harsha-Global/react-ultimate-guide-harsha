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
import { useCart } from "./CartProvider";
import { cartItemCount } from "./cart";
import type { DeliveryValues } from "./DeliveryPreferences";
import { useSavedValue } from "./useSavedValue";
import { emptyDelivery, isDelivery } from "./storage";

type DeliveryContext = {
  delivery: DeliveryValues;
  saveDelivery: (value: DeliveryValues) => void;
};
export function useShop() {
  const cart = useCart();
  const delivery = useOutletContext<DeliveryContext>();
  return { ...cart, ...delivery };
}
export default function App() {
  const { cart } = useCart();
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
  const context: DeliveryContext = { delivery, saveDelivery };
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
