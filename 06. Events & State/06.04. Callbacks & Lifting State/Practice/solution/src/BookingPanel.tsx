import { useState } from "react";
import TicketControls from "./TicketControls";
import BookingSummary from "./BookingSummary";

export default function BookingPanel() {
  const [quantity, setQuantity] = useState(1);

  function handleQuantityChange(change: number) {
    setQuantity(current => Math.max(1, Math.min(6, current + change)));
  }

  return (
    <>
      <TicketControls onReset={() => setQuantity(1)} quantity={quantity} onQuantityChange={handleQuantityChange} />
      <BookingSummary quantity={quantity} />
    </>
  );
}
