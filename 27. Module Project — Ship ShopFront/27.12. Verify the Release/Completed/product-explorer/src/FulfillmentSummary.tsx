import type { Fulfillment } from "../shared/fulfillmentSchema";
export function FulfillmentSummary({ fulfillment }: { fulfillment: Fulfillment }) {
  if (fulfillment.kind === "pickup") {
    const hours = fulfillment.window === "morning" ? "10 am–12 pm" : "2–4 pm";
    return <p className="fulfillment-summary">Studio pickup · {hours}</p>;
  }
  return <p className="fulfillment-summary">{fulfillment.method === "express" ? "Express" : "Standard"} delivery · {fulfillment.address.city}, {fulfillment.address.postal}</p>;
}
