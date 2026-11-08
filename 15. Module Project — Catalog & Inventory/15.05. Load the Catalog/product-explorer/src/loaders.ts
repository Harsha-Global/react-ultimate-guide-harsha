import type { LoaderFunctionArgs } from "react-router";
import { getProducts } from "./api";
export async function allProductsLoader({ request }: LoaderFunctionArgs) {
  return getProducts(new URLSearchParams(), request.signal);
}
