import type { Product } from "./types";
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
export type ProductInput = Pick<
  Product,
  "name" | "category" | "price" | "description" | "inStock" | "maxQuantity"
>;
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
