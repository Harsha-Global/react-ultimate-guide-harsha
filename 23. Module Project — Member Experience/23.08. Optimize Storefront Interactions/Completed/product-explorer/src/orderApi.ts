import { z } from "zod";
import { orderSchema } from "../shared/orderSchema";
import type { CheckoutValues } from "../shared/checkoutSchema";
import type { CartLine } from "./cart";
import { requestJson, writeHeaders } from "./sessionApi";

export async function placeOrder(
  details: CheckoutValues,
  cart: CartLine[],
  requestId: string,
  userId: string,
) {
  const value = await requestJson("/orders", {
    method: "POST",
    headers: await writeHeaders(),
    body: JSON.stringify({ details, cart, requestId }),
  });
  const order = orderSchema.parse(value);
  if (order.userId !== userId)
    throw new Error("The account changed. Check your orders before trying again.");
  return order;
}
export async function getOrders(userId: string, signal?: AbortSignal) {
  const value = await requestJson("/orders", { signal });
  const result = ordersResultSchema.parse(value);
  if (
    result.userId !== userId ||
    result.items.some(order => order.userId !== userId)
  )
    throw new Error("The account changed. Check your session again.");
  return result.items;
}
const ordersResultSchema = z.object({
  userId: z.string(),
  items: z.array(orderSchema),
});