import { z } from "zod";
import { productSchema } from "../shared/productSchema";
import type { Product } from "./types";
export type ProductList = {
  items: Product[];
  total: number;
  page: number;
  pages: number;
};
export class ApiError extends Error {
  status: number;
  errors: Record<string, string>;
  constructor(
    status: number,
    message: string,
    errors: Record<string, string> = {},
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}
const errorSchema = z.object({
  message: z.string(),
  errors: z.record(z.string(), z.string()).optional(),
});
export function isProduct(value: unknown): value is Product {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    /^p\d+$/.test(value.id) &&
    productSchema.safeParse(value).success
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
    const body: unknown = await response.json().catch(() => null);
    const checked = errorSchema.safeParse(body);
    throw new ApiError(
      response.status,
      checked.success
        ? checked.data.message
        : "The catalog request could not be completed.",
      checked.success ? checked.data.errors : {},
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
  | "name"
  | "category"
  | "price"
  | "description"
  | "inStock"
  | "maxQuantity"
  | "image"
  | "features"
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
