import { z } from "zod";
import { registrationSchema } from "./registration.ts";
import type { RegistrationInput, RegistrationValues } from "./registration.ts";
const attendeeSchema = z.object({ id: z.string(), values: registrationSchema });
export function toFormValues(values: RegistrationValues): RegistrationInput {
  return { ...values, ticketCount: String(values.ticketCount) };
}
export async function getAttendee(id: string): Promise<RegistrationInput> {
  const response = await fetch(`/api/attendees/${encodeURIComponent(id)}`);
  if (!response.ok)
    throw new Error(
      `Could not load the attendee (${response.status}). Check that the practice API is running.`,
    );
  const payload: unknown = await response.json();
  const attendee = attendeeSchema.parse(payload);
  if (attendee.id !== id)
    throw new Error("The API returned a different attendee.");
  return toFormValues(attendee.values);
}
