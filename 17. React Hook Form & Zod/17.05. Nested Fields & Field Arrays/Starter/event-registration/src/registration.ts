import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter at least two characters for your name."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter an email address such as alex@example.com.")),
  ticketCount: z
    .string()
    .trim()
    .min(1, "Enter the number of tickets.")
    .pipe(
      z.coerce
        .number<string>()
        .int("Use a whole number of tickets.")
        .min(1, "Choose at least one ticket.")
        .max(4, "Choose no more than four tickets."),
    ),
  attendance: z.enum(["in-person", "online"]),
  city: z.string().trim(),
  acceptTerms: z
    .boolean()
    .refine((value) => value, "Accept the registration terms."),
}).refine(
  (values) => values.attendance !== "in-person" || values.city.length >= 2,
  {
    message: "Enter your city for in-person attendance.",
    path: ["city"],
  },
);

export type RegistrationInput = z.input<typeof registrationSchema>;
export type RegistrationValues = z.output<typeof registrationSchema>;
