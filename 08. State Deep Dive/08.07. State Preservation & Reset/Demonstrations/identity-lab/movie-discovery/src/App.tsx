import { useState } from 'react';
import BookingNote from './BookingNote';
export default function App() {
  const [alternate, setAlternate] = useState(false);
  const [boxed, setBoxed] = useState(false);
  return <main className="lab"><h1>Component position and type</h1>
    <button onClick={() => setAlternate(current => !current)}>Change branch, same type</button>
    <button onClick={() => setBoxed(current => !current)}>Change wrapper type</button>
    {boxed ? <article>{alternate ? <BookingNote showtime="21:00" /> : <BookingNote showtime="18:00" />}</article>
      : <section>{alternate ? <BookingNote showtime="21:00" /> : <BookingNote showtime="18:00" />}</section>}
  </main>;
}
