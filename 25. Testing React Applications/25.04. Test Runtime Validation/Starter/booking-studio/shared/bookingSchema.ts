import { z } from "zod";

const contact = {
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().pipe(z.email()),
  slot: z.enum(["morning", "evening"]),
  requestId: z.uuid(),
};

const attendeeSchema = z.object({ id: z.uuid(), name: z.string().trim().min(2).max(80) });

export const bookingRequestSchema = z.discriminatedUnion("kind", [
  z.object({ ...contact, kind: z.literal("individual") }),
  z.object({
    ...contact,
    kind: z.literal("group"),
    groupName: z.string().trim().min(2).max(80),
    attendees: z.array(attendeeSchema).min(2).max(8).refine(
      items => new Set(items.map(item => item.id)).size === items.length,
      "Use distinct attendee identifiers.",
    ),
  }),
]);

export type BookingRequest = z.output<typeof bookingRequestSchema>;

export const bookingReferenceSchema = z.uuid();

export const bookingConfirmationSchema = z.object({
  reference: bookingReferenceSchema,
  kind: z.enum(["individual", "group"]),
  name: z.string(),
  slot: z.enum(["morning", "evening"]),
  places: z.number().int().positive(),
});

export type BookingConfirmation = z.output<typeof bookingConfirmationSchema>;