import type { ActionFunctionArgs } from "react-router";
import { deleteProduct } from "./api";
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
