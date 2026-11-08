import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Booking } from "../src/Booking";
import type { Slot } from "../src/slots";

function BookingExample() {
  const [slot, setSlot] = useState<Slot>("morning");
  return <Booking.Root value={slot} onChange={setSlot}>
    <Booking.Option value="morning" />
    <Booking.Option value="evening" />
    <Booking.Summary>{selected => <p role="status">{selected.label}</p>}</Booking.Summary>
  </Booking.Root>;
}
test("the option and summary agree after a selection", async () => {
  const user = userEvent.setup();
  render(<BookingExample />);
  await user.click(screen.getByRole("button", { name: /Evening/ }));
  expect(screen.getByRole("status")).toHaveTextContent("Evening");
  expect(screen.getByRole("button", { name: /Morning/ })).toHaveAttribute("aria-pressed", "false");
});