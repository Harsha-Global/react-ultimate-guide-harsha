import { useState } from 'react';
function TicketPicker() {
  const [quantity, setQuantity] = useState(1);
  return <section aria-label="Ticket picker"><p role="status">Tickets: {quantity}</p>
    <button disabled={quantity === 1} onClick={() => setQuantity(current => Math.max(1, current - 1))}>Remove one ticket</button>
    <button disabled={quantity === 6} onClick={() => setQuantity(current => Math.min(6, current + 1))}>Add one ticket</button></section>;
}
export default function App() {
  const [showtime, setShowtime] = useState('18:00');
  const [compact, setCompact] = useState(false);
  return <main className={compact ? 'lab compact' : 'lab'}><h1>Booking identity</h1>
    <label htmlFor="practice-showtime">Showtime</label>
    <select id="practice-showtime" value={showtime} onChange={event => setShowtime(event.currentTarget.value)}>
      <option value="18:00">18:00</option><option value="21:00">21:00</option></select>
    <button onClick={() => setCompact(current => !current)}>Toggle compact layout</button>
    <p>Layout: {compact ? 'compact' : 'comfortable'}</p>
    <TicketPicker key={showtime} />
  </main>;
}
