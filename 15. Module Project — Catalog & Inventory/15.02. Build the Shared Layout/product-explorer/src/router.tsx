import { createBrowserRouter } from "react-router";
import App from "./App";
import CheckpointPage from "./CheckpointPage";
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
          { index: true, element: <CheckpointPage title="Collection" /> },
          { path: "products/:productId", element: <CheckpointPage title="Product details" /> },
          { path: "cart", element: <CheckpointPage title="Your bag" /> },
          { path: "inventory", element: <CheckpointPage title="Inventory" /> },
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
