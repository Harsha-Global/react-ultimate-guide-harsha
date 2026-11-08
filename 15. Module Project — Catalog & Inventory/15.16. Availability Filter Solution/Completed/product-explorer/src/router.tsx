import { shouldRevalidateAfterAction } from "./loaders";
import { saveProductAction, deleteProductAction } from "./actions";
import { createBrowserRouter } from "react-router";
import App from "./App";
import Catalog from "./Catalog";
import ProductPage from "./ProductPage";

import CartPage from "./CartPage";
import Inventory from "./Inventory";
import ProductEditor from "./ProductEditor";

import RouteError from "./RouteError";
import { allProductsLoader, productLoader, catalogLoader } from "./loaders";
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
          { index: true, Component: Catalog, loader: catalogLoader },
          {
            path: "products/:productId",
            Component: ProductPage,
            loader: productLoader,
          },
          { path: "cart", Component: CartPage, loader: allProductsLoader },
          {
            path: "inventory",
            Component: Inventory,
            loader: allProductsLoader,
            shouldRevalidate: shouldRevalidateAfterAction,
          },

          {
            path: "inventory/:productId/delete",
            action: deleteProductAction,
          },

          {
            path: "inventory/:productId/edit",
            Component: ProductEditor,
            loader: productLoader,
            action: saveProductAction,
            shouldRevalidate: shouldRevalidateAfterAction,
                      },
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
