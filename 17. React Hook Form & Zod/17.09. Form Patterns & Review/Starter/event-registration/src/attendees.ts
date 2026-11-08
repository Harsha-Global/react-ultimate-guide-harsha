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

const problemSchema = z.object({
  message: z.string(),
  fieldErrors: z.object({ email: z.string().optional() }).optional(),
});
const uploadSchema = z.object({
  url: z.string().regex(/^\/uploads\/[a-f0-9-]+\.(png|jpg|webp)$/),
});
export class ApiError extends Error {
  fieldErrors: { email?: string };
  constructor(message: string, fieldErrors: { email?: string } = {}) {
    super(message);
    this.name = "ApiError";
    this.fieldErrors = fieldErrors;
  }
}
async function readResponse(response: Response): Promise<unknown> {
  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const problem = problemSchema.safeParse(payload);
    throw new ApiError(
      problem.success
        ? problem.data.message
        : `Request failed (${response.status}).`,
      problem.success ? problem.data.fieldErrors : undefined,
    );
  }
  return payload;
}
export async function saveAttendee(
  id: string,
  values: RegistrationValues,
): Promise<RegistrationInput> {
  const response = await fetch(`/api/attendees/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toFormValues(values)),
  });
  const record = attendeeSchema.parse(await readResponse(response));
  if (record.id !== id)
    throw new Error("The API returned a different attendee.");
  return toFormValues(record.values);
}
export async function uploadImage(file: File): Promise<string> {
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type))
    throw new Error("Choose a PNG, JPEG or WebP image.");
  if (file.size === 0 || file.size > 2 * 1024 * 1024)
    throw new Error("Choose an image between 1 byte and 2 MB.");
  const body = new FormData();
  body.append("image", file);
  const response = await fetch("/api/uploads", { method: "POST", body });
  return uploadSchema.parse(await readResponse(response)).url;
}
