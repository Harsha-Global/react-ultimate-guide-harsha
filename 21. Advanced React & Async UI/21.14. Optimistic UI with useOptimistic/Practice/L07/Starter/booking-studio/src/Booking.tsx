import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { slots } from "./slots";
import type { Slot } from "./slots";

type BookingValue = { value: Slot; onChange: (slot: Slot) => void };
const BookingContext = createContext<BookingValue | null>(null);
function useBooking() {
  const context = useContext(BookingContext);
  if (context === null)
    throw new Error("Booking parts need a Booking.Root parent.");
  return context;
}
function Root({
  value,
  onChange,
  children,
}: BookingValue & { children: ReactNode }) {
  return (
    <BookingContext value={{ value, onChange }}>{children}</BookingContext>
  );
}
function Option({ value }: { value: Slot }) {
  const booking = useBooking();
  const slot = slots[value];
  return (
    <button
      type="button"
      className="slot-option"
      aria-pressed={booking.value === value}
      onClick={() => booking.onChange(value)}
    >
      <strong>{slot.label}</strong>
      <span>{slot.time}</span>
    </button>
  );
}
function Summary({
  children,
}: {
  children: (slot: (typeof slots)[Slot]) => ReactNode;
}) {
  const booking = useBooking();
  return <>{children(slots[booking.value])}</>;
}
export const Booking = { Root, Option, Summary };
