import { z } from "zod";
export const loginSchema = z.object({
  email: z
    .email("Enter a valid email address.")
    .max(254)
    .transform((value) => value.toLowerCase()),
  password: z
    .string()
    .min(12, "Use at least 12 characters.")
    .max(128, "Use at most 128 characters."),
});
export const registrationSchema = loginSchema.extend({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(60, "Use at most 60 characters."),
});
export const userSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  email: z.email(),
  role: z.enum(["member", "admin"]),
});
export const sessionSchema = z.object({
  user: userSchema.nullable(),
  csrfToken: z.string().min(32),
});
export const accountSchema = z.object({
  userId: z.string(),
  memberSince: z.string(),
  savedEvents: z.array(
    z.object({ id: z.string(), title: z.string(), date: z.string() }),
  ),
});
export const adminSchema = z.object({
  members: z.number().int().nonnegative(),
  activeSessions: z.number().int().nonnegative(),
});
export type User = z.infer<typeof userSchema>;
export type Session = z.infer<typeof sessionSchema>;
export type LoginValues = z.infer<typeof loginSchema>;
export type RegistrationValues = z.infer<typeof registrationSchema>;
