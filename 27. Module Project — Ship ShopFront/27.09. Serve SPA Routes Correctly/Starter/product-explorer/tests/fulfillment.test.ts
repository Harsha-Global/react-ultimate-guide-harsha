import { describe, expect, it } from "vitest";
import { fulfillmentSchema } from "../shared/fulfillmentSchema";
import { checkoutSchema } from "../shared/checkoutSchema";
import { toFulfillment } from "../src/toFulfillment";
const draft = {
  contact: { name: "Alex Morgan", email: "alex@example.com", phone: "" },
  address: { street: "", city: "", postal: "" },
  method: "pickup" as const, collectionWindow: "morning" as const, note: "",
};
describe("checkout fulfillment", () => {
  it("maps a valid pickup without sending the unused address", () => {
    const values = checkoutSchema.parse(draft);
    expect(toFulfillment(values)).toEqual({ kind: "pickup", window: "morning" });
  });
  it("requires a collection window for pickup", () => {
    const result = checkoutSchema.safeParse({ ...draft, collectionWindow: "" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues.some(issue => issue.path.join(".") === "collectionWindow")).toBe(true);
  });
  it("requires an address when switching to delivery", () => {
    expect(checkoutSchema.safeParse({ ...draft, method: "standard" }).success).toBe(false);
  });
  it("maps delivery without the stale pickup window", () => {
    const address = { street: "14 Lake Road", city: "Riverton", postal: "12345" };
    const values = checkoutSchema.parse({ ...draft, method: "express", address });
    expect(toFulfillment(values)).toEqual({ kind: "delivery", method: "express", address });
  });
  it("rejects a pickup that also carries a delivery address", () => {
    expect(fulfillmentSchema.safeParse({ kind: "pickup", window: "morning", address: draft.address }).success).toBe(false);
  });
  it("rejects an unknown collection window", () => {
    expect(fulfillmentSchema.safeParse({ kind: "pickup", window: "midnight" }).success).toBe(false);
  });
});
