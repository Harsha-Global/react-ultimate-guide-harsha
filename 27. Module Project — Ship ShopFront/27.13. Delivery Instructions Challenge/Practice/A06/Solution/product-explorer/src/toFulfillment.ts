import { fulfillmentSchema } from "../shared/fulfillmentSchema";
import type { Fulfillment } from "../shared/fulfillmentSchema";
import type { CheckoutValues } from "../shared/checkoutSchema";
export function toFulfillment(values: CheckoutValues): Fulfillment {
  const candidate = values.method === "pickup"
    ? { kind: "pickup", window: values.collectionWindow }
    : { kind: "delivery", method: values.method, address: values.address, ...(values.note ? { instructions: values.note } : {}) };
  return fulfillmentSchema.parse(candidate);
}
