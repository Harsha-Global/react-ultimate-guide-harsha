import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { expect, test, vi } from "vitest";
import { TypedBookingForm } from "../src/TypedBookingForm";
import type { GroupBooking } from "../src/bookingTypes";
import { bookingRequestSchema } from "../shared/bookingSchema";
import { confirmation } from "./fixtures";
import { server } from "./server";
const draft: GroupBooking = { kind: "group", groupName: "Studio team", attendees: [
  { id: "33333333-3333-4333-8333-333333333333", name: "Jordan" },
  { id: "44444444-4444-4444-8444-444444444444", name: "Casey" },
] };
test("a group sends its attendees and displays the returned place count", async () => {
  const user = userEvent.setup();
  let received: unknown;
  server.use(http.post("/api/typed-bookings", async ({ request }) => {
    received = await request.json();
    return HttpResponse.json({ ...confirmation, kind: "group", places: 2 }, { status: 201 });
  }));
  render(<TypedBookingForm draft={draft} slot="morning" onLockedChange={vi.fn()} />);
  await user.type(screen.getByRole("textbox", { name: "Contact name" }), "Alex Morgan");
  await user.type(screen.getByRole("textbox", { name: "Email address" }), "alex@example.com");
  await user.click(screen.getByRole("button", { name: "Book this visit" }));
  expect(await screen.findByRole("heading", { name: "Your booking is confirmed." })).toBeInTheDocument();
  expect(bookingRequestSchema.safeParse(received).success).toBe(true);
  expect(received).toEqual(expect.objectContaining({ ...draft, name: "Alex Morgan", email: "alex@example.com", slot: "morning" }));
  expect(screen.getByText(/2 places · morning session/)).toBeInTheDocument();
});
