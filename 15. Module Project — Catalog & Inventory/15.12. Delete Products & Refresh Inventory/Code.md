# Delete Products & Refresh Inventory — changed source

These files match the completed project exactly.

## api.ts

```ts
import type { Product } from "./types";
export type ProductInput = Pick<
  Product,
  "name" | "category" | "price" | "description" | "inStock" | "maxQuantity"
>;
export type ProductList = {
  items: Product[];
  total: number;
  page: number;
  pages: number;
};
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
export function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.id === "string" &&
    /^p[0-9]+$/.test(p.id) &&
    typeof p.name === "string" &&
    typeof p.category === "string" &&
    typeof p.price === "number" &&
    Number.isFinite(p.price) &&
    p.price > 0 &&
    typeof p.inStock === "boolean" &&
    typeof p.maxQuantity === "number" &&
    Number.isInteger(p.maxQuantity) &&
    p.maxQuantity >= 0 &&
    typeof p.image === "string" &&
    p.image.startsWith("/assets/") &&
    typeof p.description === "string"
  );
}
async function requestJson(
  path: string,
  options: RequestInit = {},
): Promise<unknown> {
  const response = await fetch(`/api${path}`, options);
  if (!response.ok) {
    if (response.status === 404)
      throw new Response("Product not found", { status: 404 });
    throw new ApiError(
      response.status,
      "The catalog request could not be completed.",
    );
  }
  if (response.status === 204) return null;
  return response.json();
}
export async function getProducts(
  search: URLSearchParams,
  signal?: AbortSignal,
): Promise<ProductList> {
  const value = await requestJson(`/products?${search}`, { signal });
  if (typeof value !== "object" || value === null)
    throw new Error("Invalid catalog response.");
  const list = value as Record<string, unknown>;
  if (
    !Array.isArray(list.items) ||
    !list.items.every(isProduct) ||
    typeof list.total !== "number" ||
    !Number.isInteger(list.total) ||
    list.total < 0 ||
    typeof list.page !== "number" ||
    !Number.isInteger(list.page) ||
    list.page < 1 ||
    typeof list.pages !== "number" ||
    !Number.isInteger(list.pages) ||
    list.pages < 1 ||
    list.page > list.pages
  )
    throw new Error("Invalid catalog response.");
  return {
    items: list.items,
    total: list.total,
    page: list.page,
    pages: list.pages,
  };
}
export async function getProduct(
  id: string,
  signal?: AbortSignal,
): Promise<Product> {
  const value = await requestJson(`/products/${encodeURIComponent(id)}`, {
    signal,
  });
  if (!isProduct(value)) throw new Error("Invalid product response.");
  return value;
}
export async function saveProduct(
  id: string,
  value: ProductInput,
  signal?: AbortSignal,
): Promise<Product> {
  const result = await requestJson(`/products/${encodeURIComponent(id)}`, {
    method: "PATCH",
    signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(value),
  });
  if (!isProduct(result)) throw new Error("Invalid product response.");
  return result;
}

export async function deleteProduct(
  id: string,
  signal?: AbortSignal,
): Promise<void> {
  await requestJson(`/products/${encodeURIComponent(id)}`, {
    method: "DELETE",
    signal,
  });
}

```

## actions.ts

```ts
import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { saveProduct, deleteProduct } from "./api";
import { validateProduct, productInput } from "./productForm";
import type { ProductValues, FieldErrors } from "./productForm";
export type SaveResult = { errors: FieldErrors; message: string };
export async function saveProductAction({
  request,
  params,
}: ActionFunctionArgs): Promise<SaveResult | Response> {
  if (!params.productId)
    throw new Response("Product not found", { status: 404 });
  const form = await request.formData();
  const values: ProductValues = {
    name: String(form.get("name") ?? ""),
    category: String(form.get("category") ?? ""),
    price: String(form.get("price") ?? ""),
    description: String(form.get("description") ?? ""),
    inStock: form.get("inStock") === "on",
    maxQuantity: String(form.get("maxQuantity") ?? ""),
  };
  const errors = validateProduct(values);
  if (Object.keys(errors).length)
    return { errors, message: "Please check the highlighted fields." };
  try {
    await saveProduct(params.productId, productInput(values), request.signal);
    return redirect("/inventory?saved=1");
  } catch (error) {
    if (error instanceof Response || request.signal.aborted) throw error;
    return {
      errors: {},
      message:
        "We couldn't save your changes. Your draft is still here; check the API and try again.",
    };
  }
}

export async function deleteProductAction({
  request,
  params,
}: ActionFunctionArgs) {
  if (!params.productId)
    throw new Response("Product not found", { status: 404 });
  if (request.method !== "DELETE")
    throw new Response("Method not allowed", { status: 405 });

  try {
    await deleteProduct(params.productId, request.signal);
    return { ok: true, message: "Product removed from the collection." };
  } catch (error) {
    if (request.signal.aborted) throw error;

    return {
      ok: false,
      message:
        error instanceof Response && error.status === 404
          ? "This product was already removed. Refresh the inventory."
          : "We couldn't delete this product. Check the API and try again.",
    };
  }
}

```

## router.tsx

```tsx
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

```

## DeleteProduct.tsx

```tsx
import { useState } from "react";
import { useFetcher } from "react-router";
import type { Product } from "./types";
import type { deleteProductAction } from "./actions";

export default function DeleteProduct(
  { product }: { product: Product }
) {
  const [confirming, setConfirming] = useState(false);
  const fetcher = useFetcher<typeof deleteProductAction>();
  const pending = fetcher.state !== "idle";

  return (
    <div className="delete-control">
      {!confirming ? (
        <button type="button" className="text-danger"
          onClick={() => setConfirming(true)}>
          Delete {product.name}
        </button>
      ) : (
        <fetcher.Form method="delete" className="delete-confirm"
          action={`/inventory/${product.id}/delete`}>
          <p>
            Remove <strong>{product.name}</strong> from the collection?
          </p>
          <p className="muted">Saved bags may still refer to this item.</p>

          <div className="actions">
            <button className="danger" type="submit" disabled={pending}>
              {pending ? "Deleting…" : "Confirm deletion"}
            </button>
            <button className="secondary" type="button"
              disabled={pending} onClick={() => setConfirming(false)}>
              Keep product
            </button>
          </div>
        </fetcher.Form>
      )}

      {fetcher.data && !fetcher.data.ok && (
        <p className="field-error" role="alert">
          {fetcher.data.message}
        </p>
      )}
    </div>
  );
}

```

## Inventory.tsx

```tsx
import { Link, useLoaderData, useSearchParams } from "react-router";
import type { allProductsLoader } from "./loaders";
import DeleteProduct from "./DeleteProduct";

export default function Inventory() {
  const { items: products } = useLoaderData<typeof allProductsLoader>();
  const [search] = useSearchParams();
  return (
    <>
      <title>Inventory | ShopFront</title>
      <div className="page-heading">
        <p className="eyebrow">ShopFront studio</p>
        <h1 tabIndex={-1}>Your collection, cared for.</h1>
        <p>Keep product information clear, useful and up to date.</p>
      </div>
      {search.has("saved") && (
        <p className="success" role="status">
          Product changes saved.
        </p>
      )}
      <section className="inventory-panel">
        <div className="inventory-heading">
          <h2>Products</h2>
          <span role="status">{products.length} in your collection</span>
        </div>
        <ul className="inventory-list">
          {products.map((p) => (
            <li key={p.id}>
              <img src={p.image} alt="" width="80" height="80" />
              <div className="inventory-name">
                <h3>{p.name}</h3>
                <p>
                  {p.category} · {p.id}
                </p>
              </div>
              <span className="price">${p.price.toFixed(2)}</span>
              <span
                className={
                  p.inStock ? "availability" : "availability unavailable"
                }
              >
                {p.inStock ? "In stock" : "Unavailable"}
              </span>
              <Link className="button secondary" to={`/inventory/${p.id}/edit`}>
                Edit {p.name}
              </Link>

              <DeleteProduct product={p} />

            </li>
          ))}
        </ul>
        {products.length === 0 && (
          <p className="empty-state">Your collection is empty.</p>
        )}
      </section>
      <p className="muted">
        Local inventory workspace for this course project.
      </p>
    </>
  );
}

```
