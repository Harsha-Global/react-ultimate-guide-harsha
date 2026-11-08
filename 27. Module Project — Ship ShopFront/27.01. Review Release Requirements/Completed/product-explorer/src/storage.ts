import type { CartLine } from "./cart";
import type { DeliveryValues } from "./DeliveryPreferences";
export const emptyDelivery: DeliveryValues = { name: "", email: "", note: "" };
// Persist intent, then compare it with the live catalog when rendering the cart.
export function isCart(value: unknown): value is CartLine[] {
    if (!Array.isArray(value) || value.length > 100)
        return false;
    const seen = new Set<string>();
    return value.every((line) => {
        if (typeof line !== "object" || line === null)
            return false;
        const candidate = line as Record<string, unknown>;
        if (typeof candidate.productId !== "string" ||
            !/^p[0-9]+$/.test(candidate.productId) ||
            seen.has(candidate.productId))
            return false;
        seen.add(candidate.productId);
        return (typeof candidate.quantity === "number" &&
            Number.isInteger(candidate.quantity) &&
            candidate.quantity >= 1 &&
            candidate.quantity <= 99);
    });
}
export function isDelivery(value: unknown): value is DeliveryValues {
    if (typeof value !== "object" || value === null || Array.isArray(value))
        return false;
    const v = value as Record<string, unknown>;
    return (typeof v.name === "string" &&
        v.name.length <= 100 &&
        typeof v.email === "string" &&
        v.email.length <= 160 &&
        typeof v.note === "string" &&
        v.note.length <= 120);
}
