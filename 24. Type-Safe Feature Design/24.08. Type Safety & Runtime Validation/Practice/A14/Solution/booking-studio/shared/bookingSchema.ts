import { z } from "zod";
const contact = { name: z.string().trim().min(2).max(80), email: z.string().trim().toLowerCase().pipe(z.email()), slot: z.enum(["morning", "evening"]), requestId: z.uuid() };
export const groupPhoneSchema = z.string().trim().min(1, "Enter a contact phone for this group.")
    .regex(/^\+?[0-9 ()-]+$/, "Use a phone number, with digits and optional +, spaces, parentheses or hyphens.")
    .refine(value => { const digits = value.replace(/\D/g, ""); return digits.length >= 7 && digits.length <= 15; }, "Use 7 to 15 digits for the contact phone.");
const attendeeSchema = z.object({ id: z.uuid(), name: z.string().trim().min(2).max(80) });
export const bookingRequestSchema = z.discriminatedUnion("kind", [
    z.object({ ...contact, kind: z.literal("individual") }),
    z.object({ ...contact, kind: z.literal("group"), phone: groupPhoneSchema, groupName: z.string().trim().min(2).max(80), attendees: z.array(attendeeSchema).min(2).max(8).refine(items => new Set(items.map(item => item.id)).size === items.length, "Use distinct attendee identifiers.") }),
]);
export type BookingRequest = z.output<typeof bookingRequestSchema>;
export const bookingReferenceSchema = z.uuid();
export const bookingConfirmationSchema = z.object({ reference: bookingReferenceSchema, kind: z.enum(["individual", "group"]), name: z.string(), slot: z.enum(["morning", "evening"]), places: z.number().int().positive() });
export type BookingConfirmation = z.output<typeof bookingConfirmationSchema>;
