import { z } from "zod";
export const checkoutSchema = z.object({
    contact: z.object({
      name: z.string().trim().min(2, "Enter your full name.").max(100),
      email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.email("Enter a valid email address.")),
      phone: z
        .string()
        .trim()
        .refine(
          (value) => value === "" || /^\d{10}$/.test(value),
          "Use ten digits, or leave the phone number empty.",
        ),
    }),
});
export type CheckoutInput = z.input<typeof checkoutSchema>;
export type CheckoutValues = z.output<typeof checkoutSchema>;
