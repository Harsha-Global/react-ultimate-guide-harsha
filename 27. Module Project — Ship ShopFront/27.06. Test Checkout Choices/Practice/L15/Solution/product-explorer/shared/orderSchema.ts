import { z } from "zod";
import { checkoutRequestSchema } from "./checkoutSchema.ts";
import { checkoutSchema } from "./checkoutSchema.ts";
import { fulfillmentSchema } from "./fulfillmentSchema.ts";
export const orderRequestSchema = z.strictObject({
    requestId: z.uuid(),
    cart: checkoutRequestSchema.shape.cart,
    details: z.strictObject({
        contact: checkoutSchema.shape.contact,
        note: checkoutSchema.shape.note,
        fulfillment: fulfillmentSchema,
    }),
});
export const orderSchema = z.object({
    id: z.string(), userId: z.string(), createdAt: z.string(),
    subtotal: z.number().nonnegative(), deliveryFee: z.number().nonnegative(),
    items: z.number().int().positive(), currency: z.literal("USD"),
    lines: z.array(z.object({ name: z.string(), quantity: z.number().int().positive(), unitPrice: z.number().nonnegative() })),
    note: z.string(),
    fulfillment: fulfillmentSchema,
});
export type Order = z.infer<typeof orderSchema>;
