import { fulfillmentSchema } from "../shared/fulfillmentSchema";
import type { Fulfillment } from "../shared/fulfillmentSchema";
import type { CheckoutValues } from "../shared/checkoutSchema";
export function toFulfillment(values: CheckoutValues): Fulfillment {
  const candidate = values.method === "pickup"
    ? { kind: "pickup", window: values.collectionWindow, address: values.address }
    : { kind: "delivery", method: values.method, address: values.address };
  return fulfillmentSchema.parse(candidate);
}
