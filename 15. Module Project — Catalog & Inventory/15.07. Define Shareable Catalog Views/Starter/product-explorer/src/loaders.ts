import type { LoaderFunctionArgs } from "react-router";
import { getProducts, getProduct } from "./api";
export async function allProductsLoader({ request }: LoaderFunctionArgs) {
  return getProducts(new URLSearchParams(), request.signal);
}
export async function productLoader({ params, request }: LoaderFunctionArgs) {
  if (!params.productId)
    throw new Response("Product not found", { status: 404 });
  return getProduct(params.productId, request.signal);
}
