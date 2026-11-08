import { useState } from "react";

export default function TicketSelector() {
  const [quantity, setQuantity] = useState(1);

  function handleIncrease() {
    setQuantity(quantity + 1);
  }

  return (
    <div>
      <p aria-live="polite">Tickets: {quantity}</p>
      <button type="button" onClick={handleIncrease}>Add one ticket</button>
    </div>
  );
}
