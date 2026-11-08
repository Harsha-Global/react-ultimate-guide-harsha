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
});

export type RegistrationInput = z.input<typeof registrationSchema>;
export type RegistrationValues = z.output<typeof registrationSchema>;
