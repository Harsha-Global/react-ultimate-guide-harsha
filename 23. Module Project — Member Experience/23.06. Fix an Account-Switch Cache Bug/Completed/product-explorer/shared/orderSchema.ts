import { z } from "zod";
import { checkoutRequestSchema } from "./checkoutSchema.ts";
export const orderRequestSchema = checkoutRequestSchema.extend({ requestId: z.uuid() });
export const orderSchema = z.object({
    id: z.string(), userId: z.string(), createdAt: z.string(),
    subtotal: z.number().nonnegative(), deliveryFee: z.number().nonnegative(),
    items: z.number().int().positive(), currency: z.literal("USD"),
    lines: z.array(z.object({ name: z.string(), quantity: z.number().int().positive(), unitPrice: z.number().nonnegative() })),
    note: z.string(),
});
export type Order = z.infer<typeof orderSchema>;
