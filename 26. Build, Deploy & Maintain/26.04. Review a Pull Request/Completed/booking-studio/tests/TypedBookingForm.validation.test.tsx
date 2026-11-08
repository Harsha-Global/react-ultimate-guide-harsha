import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { TypedBookingForm } from "../src/TypedBookingForm";

test("a one-letter name shows the application validation message", async () => {
  const user = userEvent.setup();
  render(<TypedBookingForm draft={{ kind: "individual" }} slot="morning" onLockedChange={vi.fn()} />);
  await user.type(screen.getByRole("textbox", { name: "Contact name" }), "A");
  await user.type(screen.getByRole("textbox", { name: "Email address" }), "alex@example.com");
  await user.click(screen.getByRole("button", { name: "Book this visit" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("Check the contact details and every name in this booking.");
  expect(screen.getByRole("button", { name: "Book this visit" })).toBeEnabled();
  expect(screen.queryByRole("heading", { name: "Your booking is confirmed." })).not.toBeInTheDocument();
});