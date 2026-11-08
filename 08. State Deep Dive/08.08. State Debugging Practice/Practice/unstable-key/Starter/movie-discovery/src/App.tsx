import { useState } from 'react';
function BookingNote() {
  const [note, setNote] = useState('');
  return <section className="booking-note"><label htmlFor="note">Seating note</label>
    <input id="note" value={note} onChange={event => setNote(event.currentTarget.value)} /></section>;
}
export default function App() {
  const [showtime, setShowtime] = useState('18:00');
  const [compact, setCompact] = useState(false);
  return <main className="lab"><h1>Unexpected note reset</h1>
    <label htmlFor="showtime">Showtime</label>
    <select id="showtime" value={showtime} onChange={event => setShowtime(event.currentTarget.value)}>
      <option value="18:00">18:00</option><option value="21:00">21:00</option></select>
    <button onClick={() => setCompact(current => !current)}>Toggle compact note</button>
    <div className={compact ? 'compact' : 'comfortable'}><BookingNote key={`${showtime}-${compact}`} /></div>
  </main>;
}
