import { useState } from "react";
import type { ChangeEvent } from "react";
import TicketControls from "./TicketControls";
import BookingSummary from "./BookingSummary";

export default function BookingPanel() {
  const [quantity, setQuantity] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [showtime, setShowtime] = useState("18:00");
  const ticketPrice = showtime === "21:00" ? 15 : 12;
  const total = quantity * ticketPrice;

  function handleQuantityChange(change: number) {
    setQuantity(current => Math.max(1, Math.min(6, current + change)));
  }

  function handleGuestNameChange(event: ChangeEvent<HTMLInputElement>) {
    setGuestName(event.currentTarget.value);
  }

  return (
    <>
      <label htmlFor="guest-name">Guest name</label>
      <input id="guest-name" value={guestName} onChange={handleGuestNameChange} />
      <label htmlFor="showtime">Showtime</label>
      <select id="showtime" value={showtime} onChange={event => setShowtime(event.currentTarget.value)}>
        <option value="18:00">18:00 — $12</option>
        <option value="21:00">21:00 — $15</option>
      </select>
      <TicketControls quantity={quantity} onQuantityChange={handleQuantityChange} />
      <BookingSummary quantity={quantity} guestName={guestName} showtime={showtime} total={total} />
    </>
  );
}
