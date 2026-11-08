import { z } from "zod";
const fields = {
  name: z.string().trim().min(2, "Use at least two characters.").max(80),
  category: z.enum(["Home", "Travel", "Audio"]),
  description: z
    .string()
    .trim()
    .min(10, "Use at least ten characters.")
    .max(240),
  inStock: z.boolean(),
  image: z
    .string()
    .regex(
      /^\/(assets\/[a-zA-Z0-9_./-]+|uploads\/[a-f0-9-]+\.(png|jpg|webp))$/,
      "Upload an image or keep the current image.",
    ),
  features: z
    .array(
      z.object({
        text: z
          .string()
          .trim()
          .min(1, "Enter a feature or remove its row.")
          .max(80),
      }),
    )
    .max(5, "Use no more than five features."),
};
const price = z
  .number()
  .finite()
  .min(0.01)
  .max(10000)
  .refine(
    (value) => Math.abs(value * 100 - Math.round(value * 100)) < 0.00001,
    "Use at most two decimal places.",
  );
const quantity = z.number().int().min(0).max(99);
function checkStock(
  value: { inStock: boolean; maxQuantity: number },
  context: z.RefinementCtx,
) {
  if (
    (value.inStock && value.maxQuantity < 1) ||
    (!value.inStock && value.maxQuantity !== 0)
  )
    context.addIssue({
      code: "custom",
      path: ["maxQuantity"],
      message: "Use 1 to 99 when available, or 0 when unavailable.",
    });
}
export const productSchema = z
  .object({ ...fields, price, maxQuantity: quantity })
  .superRefine(checkStock);
const requiredNumber = z
  .string()
  .trim()
  .min(1, "Enter a number.")
  .pipe(z.coerce.number());
export const productFormSchema = z
  .object({
    ...fields,
    price: requiredNumber.pipe(price),
    maxQuantity: requiredNumber.pipe(quantity),
  })
  .superRefine(checkStock);
export type ProductFormInput = z.input<typeof productFormSchema>;
export type ProductFormValues = z.output<typeof productFormSchema>;
