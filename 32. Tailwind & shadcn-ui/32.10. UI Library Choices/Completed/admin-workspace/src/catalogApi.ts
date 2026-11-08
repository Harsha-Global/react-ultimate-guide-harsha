import type { Product } from "./catalog";
import { apiErrorSchema, productListSchema, savedProductSchema } from "./productSchema";
import type { ProductEdit } from "./productSchema";

export class CatalogApiError extends Error {
  fieldErrors: Partial<Record<keyof ProductEdit, string>>;
  constructor(message: string, fieldErrors: Partial<Record<keyof ProductEdit, string>> = {}) {
    super(message);
    this.fieldErrors = fieldErrors;
  }
}

async function readResponse(response: Response): Promise<unknown> {
  let body: unknown;
  try { body = await response.json(); } catch { throw new CatalogApiError("The catalog service returned an unreadable response. Try again."); }
  if (!response.ok) {
    const parsed = apiErrorSchema.safeParse(body);
    throw new CatalogApiError(parsed.success ? parsed.data.message : "The request could not be completed.", parsed.success ? parsed.data.fieldErrors : undefined);
  }
  return body;
}
export async function getProducts(signal: AbortSignal): Promise<Product[]> {
  const body = await readResponse(await fetch("/api/products", { signal }));
  return productListSchema.parse(body).items;
}
export async function updateProduct(id: string, values: ProductEdit): Promise<Product> {
  const response = await fetch(`/api/products/${encodeURIComponent(id)}`, {
    method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values),
  });
  return savedProductSchema.parse(await readResponse(response)).product;
}
