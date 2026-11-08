import { useState } from "react";

export default function App() {
  const [quantity, setQuantity] = useState(1);

  function handleIncrease() {
    setQuantity(current => Math.min(6, current + 1));
  }

  function handleAddTwo() {
    setQuantity(current => Math.min(6, current + 1));
    setQuantity(current => Math.min(6, current + 1));
  }

  function handleDecrease() {
    setQuantity(current => Math.max(1, current - 1));
  }

  return (
    <div>
      <p aria-live="polite">Tickets: {quantity}</p>
      <button type="button" disabled={quantity === 1} onClick={handleDecrease}>Remove one ticket</button>
      <button type="button" disabled={quantity === 6} onClick={handleIncrease}>Add one ticket</button>
      <button type="button" disabled={quantity === 6} onClick={handleAddTwo}>Add two tickets</button>
    </div>
  );
}
