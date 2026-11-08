import { z } from "zod";

export const productEditSchema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters.").max(60, "Use no more than 60 characters."),
  stock: z.number({ error: "Enter a whole number from 0 to 9999." }).int("Enter a whole number.").min(0, "Stock cannot be negative.").max(9999, "Stock cannot exceed 9999."),
});
export type ProductEdit = z.infer<typeof productEditSchema>;

export const productSchema = z.object({
  id: z.string().min(1), name: z.string(), category: z.string(),
  priceMinor: z.number().int().nonnegative(), stock: z.number().int().nonnegative(), image: z.string(),
});
export const productListSchema = z.object({
  items: z.array(productSchema), total: z.number().int().nonnegative(),
  summary: z.object({ all: z.number().int().nonnegative(), low: z.number().int().nonnegative(), unavailable: z.number().int().nonnegative() }),
});
export const savedProductSchema = z.object({ product: productSchema });
export const apiErrorSchema = z.object({
  message: z.string(),
  fieldErrors: z.object({ name: z.string().optional(), stock: z.string().optional() }).optional(),
});
