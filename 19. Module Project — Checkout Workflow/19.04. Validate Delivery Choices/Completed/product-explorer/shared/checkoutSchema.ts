import { z } from "zod";
export const checkoutSchema = z
  .object({
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
    address: z.object({
      street: z.string().trim().max(120),
      city: z.string().trim().max(80),
      postal: z.string().trim().max(10),
    }),
    method: z.enum(["standard", "express", "pickup"]),
    note: z.string().trim().max(120, "Keep the note within 120 characters."),
  })
  .superRefine((value, context) => {
    if (value.method !== "pickup") {
      if (value.address.street.length < 3)
        context.addIssue({
          code: "custom",
          path: ["address", "street"],
          message: "Enter your street address.",
        });
      if (value.address.city.length < 2)
        context.addIssue({
          code: "custom",
          path: ["address", "city"],
          message: "Enter your city.",
        });
      if (!/^\d{5}$/.test(value.address.postal))
        context.addIssue({
          code: "custom",
          path: ["address", "postal"],
          message: "Enter a five-digit ZIP code.",
        });
    }
  });
export type CheckoutInput = z.input<typeof checkoutSchema>;
export type CheckoutValues = z.output<typeof checkoutSchema>;
