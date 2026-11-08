import { z } from "zod";
import { checkoutResultSchema } from "../shared/checkoutSchema";
import type { CheckoutValues } from "../shared/checkoutSchema";
import type { CartLine } from "./cart";
export class CheckoutError extends Error {
  status: number;
  field?: "contact.email";
  constructor(status: number, message: string, field?: "contact.email") {
    super(message);
    this.status = status;
    this.field = field;
  }
}
const errorSchema = z.object({
  message: z.string(),
  field: z.enum(["contact.email"]).optional(),
});
export async function prepareCheckout(
  details: CheckoutValues,
  cart: CartLine[],
) {
  const response = await fetch("/api/checkout-drafts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ details, cart }),
  });
  const body: unknown = await response.json();
  if (!response.ok) {
    const checked = errorSchema.safeParse(body);
    throw new CheckoutError(
      response.status,
      checked.success
        ? checked.data.message
        : "The checkout could not be prepared.",
      checked.success ? checked.data.field : undefined,
    );
  }
  return checkoutResultSchema.parse(body);
}
