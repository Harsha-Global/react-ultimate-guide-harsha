import { shouldRevalidateAfterAction } from "./loaders";
import { createBrowserRouter } from "react-router";
import OrdersPage from "./OrdersPage";
import LoginPage from "./LoginPage";
import { RequireSession, RequireAdmin } from "./Guards";
import App from "./App";
import Catalog from "./Catalog";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import Inventory from "./Inventory";
import RouteError from "./RouteError";
import { allProductsLoader, productLoader, catalogLoader } from "./loaders";
import ProductEditor from "./ProductEditor";
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
                    { path: "login", Component: LoginPage },
                    { Component: RequireSession, children: [
                            { path: "checkout", Component: CheckoutPage, loader: allProductsLoader },
                            { path: "orders", Component: OrdersPage },
                        ] },
                    { Component: RequireSession, children: [{ Component: RequireAdmin, children: [
                                    {
                                        path: "inventory",
                                        Component: Inventory,
                                        loader: allProductsLoader,
                                        shouldRevalidate: shouldRevalidateAfterAction,
                                    },
                                    {
                                        path: "inventory/:productId/edit",
                                        Component: ProductEditor,
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
