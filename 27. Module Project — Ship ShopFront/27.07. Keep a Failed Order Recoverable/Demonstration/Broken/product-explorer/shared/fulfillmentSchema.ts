import { z } from "zod";
export const fulfillmentSchema = z.discriminatedUnion("kind", [
  z.strictObject({
    kind: z.literal("delivery"),
    method: z.enum(["standard", "express"]),
    address: z.strictObject({
      street: z.string().trim().min(3).max(120),
      city: z.string().trim().min(2).max(80),
      postal: z.string().regex(/^\d{5}$/),
    }),
  }),
  z.strictObject({
    kind: z.literal("pickup"),
    window: z.enum(["morning", "afternoon"]),
  }),
]);
export type Fulfillment = z.infer<typeof fulfillmentSchema>;
