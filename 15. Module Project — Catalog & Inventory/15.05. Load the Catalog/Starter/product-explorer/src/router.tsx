import { createBrowserRouter } from "react-router";
import App from "./App";
import Catalog from "./Catalog";
import ProductPage from "./ProductPage";

import CartPage from "./CartPage";
import Inventory from "./Inventory";

import RouteError from "./RouteError";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: RouteError,
    HydrateFallback: () => (
      <div className="boot-screen">
        <p className="wordmark">shopfront.</p>
        <p role="status">Preparing your collection…</p>
      </div>
    ),
    children: [
      {
        ErrorBoundary: RouteError,
        children: [
          { index: true, Component: Catalog },
          { path: "products/:productId", Component: ProductPage },
          { path: "cart", Component: CartPage },
          { path: "inventory", Component: Inventory },
          {
            path: "*",
            Component: () => (
              <section className="empty-state">
                <h1 tabIndex={-1}>Page not found</h1>
                <p>That address does not match a ShopFront page.</p>
                <a href="/">Browse the collection</a>
              </section>
            ),
          },
        ],
      },
    ],
  },
]);
