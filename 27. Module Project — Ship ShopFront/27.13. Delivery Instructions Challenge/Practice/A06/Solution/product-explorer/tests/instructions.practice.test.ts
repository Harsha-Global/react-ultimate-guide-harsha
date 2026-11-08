import { describe, expect, it } from "vitest";
import { checkoutSchema } from "../shared/checkoutSchema";
import { fulfillmentSchema } from "../shared/fulfillmentSchema";
import { toFulfillment } from "../src/toFulfillment";
const draft = { contact: { name: "Alex Morgan", email: "alex@example.com", phone: "" }, address: { street: "14 Lake Road", city: "Riverton", postal: "12345" }, method: "standard", collectionWindow: "morning", note: "  Leave at reception  " };
describe("delivery instructions", () => {
 it("maps a trimmed instruction only for delivery", () => {
   expect(toFulfillment(checkoutSchema.parse(draft))).toEqual({ kind: "delivery", method: "standard", address: draft.address, instructions: "Leave at reception" });
 });
 it("omits a remembered instruction from pickup", () => {
   expect(toFulfillment(checkoutSchema.parse({ ...draft, method: "pickup" }))).toEqual({ kind: "pickup", window: "morning" });
 });
 it("omits an empty optional instruction", () => {
   const result = toFulfillment(checkoutSchema.parse({ ...draft, note: "   " }));
   expect(result).not.toHaveProperty("instructions");
 });
 it("rejects overlong instructions at the server contract", () => {
   expect(fulfillmentSchema.safeParse({ kind: "delivery", method: "standard", address: draft.address, instructions: "x".repeat(121) }).success).toBe(false);
 });
 it("rejects instructions on a pickup request", () => {
   expect(fulfillmentSchema.safeParse({ kind: "pickup", window: "morning", instructions: "Leave at reception" }).success).toBe(false);
 });
});
