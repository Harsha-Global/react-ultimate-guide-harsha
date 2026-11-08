import { useState } from 'react';
// Mutable fields make this deliberate bug executable; the guided app keeps readonly domain types.
type Ticket = { id: string; quantity: number };
const initialTickets: Ticket[] = [{ id: '18:00', quantity: 1 }, { id: '21:00', quantity: 2 }];
export default function App() {
  // Separate each mount from the module constant, then intentionally share the initial snapshot.
  const [originalReceipt] = useState(() => initialTickets.map(item => ({ ...item })));
  const [cart, setCart] = useState(originalReceipt);
  function addTicket() {
    setCart(current => {
      const next = [...current];
      next[0].quantity = Math.min(6, next[0].quantity + 1);
      return next;
    });
  }
  return <main className="lab"><h1>Cart snapshot investigation</h1>
    <p>The original receipt must stay at one ticket for the early show.</p>
    <p>Original receipt: {originalReceipt[0].quantity}</p>
    <p role="status">Current early-show tickets: {cart[0].quantity}</p>
    <p>Late-show tickets: {cart[1].quantity}</p>
    <button disabled={cart[0].quantity === 6} onClick={addTicket}>Add early-show ticket</button>
  </main>;
}
