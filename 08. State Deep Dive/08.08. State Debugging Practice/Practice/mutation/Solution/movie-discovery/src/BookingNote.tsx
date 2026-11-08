import { useState } from 'react';
export default function BookingNote({ showtime }: { readonly showtime: string }) {
  const [note, setNote] = useState('');
  return <section className="booking-note"><h3>Note for {showtime}</h3>
    <label htmlFor="booking-note">Seating note</label>
    <input id="booking-note" value={note} onChange={event => setNote(event.currentTarget.value)} />
    <p>The note belongs to this showtime.</p></section>;
}
