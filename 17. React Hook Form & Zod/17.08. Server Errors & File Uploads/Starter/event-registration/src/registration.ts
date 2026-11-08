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
  session: z.enum(["morning", "afternoon"]),
  contact: z.object({ city: z.string().trim() }),
  guests: z
    .array(
      z.object({
        name: z
          .string()
          .trim()
          .min(2, "Enter at least two characters for this guest."),
      }),
    )
    .max(3, "Add no more than three guests."),
  acceptTerms: z
    .boolean()
    .refine((value) => value, "Accept the registration terms."),
}).refine(
  (values) => values.attendance !== "in-person" || values.contact.city.length >= 2,
  {
    message: "Enter your city for in-person attendance.",
    path: ["contact", "city"],
  },
);

export type RegistrationInput = z.input<typeof registrationSchema>;
export type RegistrationValues = z.output<typeof registrationSchema>;

export const emptyRegistration: RegistrationInput = { fullName: "", email: "", ticketCount: "1", attendance: "in-person", session: "morning", contact: { city: "" }, guests: [], acceptTerms: false };