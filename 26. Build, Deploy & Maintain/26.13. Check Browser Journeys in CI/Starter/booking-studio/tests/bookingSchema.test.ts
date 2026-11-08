import { expect, test } from "vitest";
import { bookingRequestSchema } from "../shared/bookingSchema";
import { individual } from "./fixtures";

test("contact details are normalized before submission", () => {
  const result = bookingRequestSchema.parse({ ...individual, name: "  Alex Morgan  ", email: " ALEX@EXAMPLE.COM " });
  expect(result.name).toBe("Alex Morgan");
  expect(result.email).toBe("alex@example.com");
});

test("an invalid email is rejected", () => {
  const result = bookingRequestSchema.safeParse({ ...individual, email: "alex" });
  expect(result.success).toBe(false);
});

test("two entries cannot reuse one attendee identifier", () => {
  const attendee = { id: "33333333-3333-4333-8333-333333333333", name: "Jordan" };
  const result = bookingRequestSchema.safeParse({ ...individual, kind: "group", groupName: "Studio team", attendees: [attendee, attendee] });
  expect(result.success).toBe(false);
});