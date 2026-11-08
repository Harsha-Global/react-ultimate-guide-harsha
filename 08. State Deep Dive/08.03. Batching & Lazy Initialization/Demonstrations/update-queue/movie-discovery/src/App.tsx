import { useState } from 'react';
export default function App() {
  const [quantity, setQuantity] = useState(1);
  function replaceThenUpdate() {
    setQuantity(5);
    setQuantity(current => Math.min(6, current + 1));
  }
  function replaceLast() {
    setQuantity(5);
    setQuantity(current => Math.min(6, current + 1));
    setQuantity(2);
  }
  return <main className="lab"><h1>Booking update queue</h1><p role="status">Tickets: {quantity}</p>
    <button onClick={replaceThenUpdate}>Replace, then update</button>
    <button onClick={replaceLast}>Replace last</button>
    <button onClick={() => setQuantity(1)}>Reset to one</button></main>;
}
