import { z } from "zod";

export const productEditSchema = z.object({
  reorderLevel: z.number({ error: "Enter a whole number from 0 to 999." }).int("Enter a whole number.").min(0, "The reorder level cannot be negative.").max(999, "The reorder level cannot exceed 999."),
  name: z.string().trim().min(2, "Enter at least 2 characters.").max(60, "Use no more than 60 characters."),
  stock: z.number({ error: "Enter a whole number from 0 to 9999." }).int("Enter a whole number.").min(0, "Stock cannot be negative.").max(9999, "Stock cannot exceed 9999."),
});
export type ProductEdit = z.infer<typeof productEditSchema>;

export const productSchema = z.object({
  id: z.string().min(1), name: z.string(), category: z.string(),
  reorderLevel: z.number().int().min(0).max(999),
  priceMinor: z.number().int().nonnegative(), stock: z.number().int().nonnegative(), image: z.string(),
});
export const productListSchema = z.object({ items: z.array(productSchema) });
export const savedProductSchema = z.object({ product: productSchema });
export const apiErrorSchema = z.object({
  message: z.string(),
  fieldErrors: z.object({ reorderLevel: z.string().optional(), name: z.string().optional(), stock: z.string().optional() }).optional(),
});
