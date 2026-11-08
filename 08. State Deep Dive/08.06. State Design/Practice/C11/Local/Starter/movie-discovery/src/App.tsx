import { useState } from 'react';
export default function App() {
  const [quantity, setQuantity] = useState(1);
  const [total] = useState(quantity * 12);
  return <main className="lab"><h1>Booking total</h1>
    <p>Each ticket costs $12.</p><p role="status">Tickets: {quantity}</p><p>Total: ${total}</p>
    <button disabled={quantity === 1} onClick={() => setQuantity(current => Math.max(1, current - 1))}>Remove one ticket</button>
    <button disabled={quantity === 6} onClick={() => setQuantity(current => Math.min(6, current + 1))}>Add one ticket</button>
  </main>;
}
