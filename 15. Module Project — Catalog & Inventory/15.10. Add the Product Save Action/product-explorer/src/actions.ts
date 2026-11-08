import { redirect } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { saveProduct } from "./api";
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
