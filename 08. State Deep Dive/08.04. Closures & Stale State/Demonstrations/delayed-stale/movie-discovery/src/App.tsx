import { useState } from 'react';
export default function App() {
  const [quantity, setQuantity] = useState(1);
  const [pending, setPending] = useState(false);
  function addLater() {
    setPending(true);
    window.setTimeout(() => {
      setQuantity(Math.min(6, quantity + 1));
      setPending(false);
    }, 2000);
  }
  return <main className="lab"><h1>Delayed ticket adjustment</h1><p role="status">Tickets: {quantity}</p>
    <button disabled={pending} onClick={addLater}>Add one after delay</button>
    <button onClick={() => setQuantity(4)}>Choose four now</button>
    <p>{pending ? 'Adjustment pending' : 'Ready'}</p></main>;
}
