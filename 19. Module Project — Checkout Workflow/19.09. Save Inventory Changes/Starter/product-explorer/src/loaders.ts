import type { ShouldRevalidateFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { readCatalogView, catalogParams } from "./catalogView";
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
export async function catalogLoader({ request }: LoaderFunctionArgs) {
  const search = new URL(request.url).searchParams;
  const view = readCatalogView(search);
  const result = await getProducts(catalogParams(view), request.signal);
  if (view.page !== result.page)
    throw redirect("/?" + catalogParams({ ...view, page: result.page }));
  return { ...result, view };
}

// Expected action failures retain their existing page and draft.
export function shouldRevalidateAfterAction({
  actionResult,
  defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
  const rejected =
    actionResult !== null &&
    typeof actionResult === "object" &&
    ("errors" in actionResult || actionResult.ok === false);
  return rejected ? false : defaultShouldRevalidate;
}
