import { shouldRevalidateAfterAction } from "./loaders";
import { createBrowserRouter } from "react-router";
import { RequireSession, RequireAdmin } from "./Guards";
import App from "./App";
import Catalog from "./Catalog";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import RouteError from "./RouteError";
import { allProductsLoader, productLoader, catalogLoader } from "./loaders";
import { deleteProductAction } from "./actions";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        ErrorBoundary: RouteError,
        HydrateFallback: () => (<div className="boot-screen">
        <p className="wordmark">shopfront.</p>
        <p role="status">Preparing your collection…</p>
      </div>),
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
                    { path: "login", lazy: async () => ({ Component: (await import("./LoginPage")).default }) },
                    { Component: RequireSession, children: [
                            { path: "checkout", lazy: async () => ({ Component: (await import("./CheckoutPage")).default }), loader: allProductsLoader },
                            { path: "orders", lazy: async () => ({ Component: (await import("./OrdersPage")).default }) },
                        ] },
                    { Component: RequireSession, children: [{ Component: RequireAdmin, children: [
                                    {
                                        path: "inventory",
                                        lazy: async () => ({ Component: (await import("./Inventory")).default }),
                                        loader: allProductsLoader,
                                        shouldRevalidate: shouldRevalidateAfterAction,
                                    },
                                    {
                                        path: "inventory/:productId/edit",
                                        lazy: async () => ({ Component: (await import("./ProductEditor")).default }),
                                        loader: productLoader,
                                        shouldRevalidate: shouldRevalidateAfterAction,
                                    },
                                    { path: "inventory/:productId/delete", action: deleteProductAction },
                                ] }] },
                    {
                        path: "*",
                        Component: () => (<section className="empty-state">
                <h1 tabIndex={-1}>Page not found</h1>
                <p>That address does not match a ShopFront page.</p>
                <a href="/">Browse the collection</a>
              </section>),
                    },
                ],
            },
        ],
    },
]);
