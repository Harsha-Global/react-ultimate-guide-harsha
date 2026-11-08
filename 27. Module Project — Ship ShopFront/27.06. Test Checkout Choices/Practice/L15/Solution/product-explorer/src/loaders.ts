import type { ShouldRevalidateFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { readCatalogView, catalogParams } from "./catalogView";
import type { LoaderFunctionArgs } from "react-router";
import { queryClient } from "./queryClient";
import { allProductsOptions, productOptions, catalogOptions, } from "./productQueries";
export async function allProductsLoader() {
    await queryClient.query(allProductsOptions());
    return null;
}
export async function productLoader({ params }: LoaderFunctionArgs) {
    if (!params.productId)
        throw new Response("Product not found", { status: 404 });
    await queryClient.query(productOptions(params.productId));
    return { id: params.productId };
}
export async function catalogLoader({ request }: LoaderFunctionArgs) {
    const search = new URL(request.url).searchParams;
    const view = readCatalogView(search);
    const result = await queryClient.query(catalogOptions(view));
    if (view.page !== result.page)
        throw redirect("/?" + catalogParams({ ...view, page: result.page }));
    return view;
}
// Expected action failures retain their existing page and draft.
export function shouldRevalidateAfterAction({ actionResult, defaultShouldRevalidate, }: ShouldRevalidateFunctionArgs) {
    const rejected = actionResult !== null &&
        typeof actionResult === "object" &&
        ("errors" in actionResult || actionResult.ok === false);
    return rejected ? false : defaultShouldRevalidate;
}
