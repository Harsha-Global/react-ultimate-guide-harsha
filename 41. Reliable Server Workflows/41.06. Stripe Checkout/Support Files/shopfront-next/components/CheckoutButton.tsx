'use client';
import { useState } from 'react';
export function CheckoutButton({ orderId }: { orderId: string }) {
  const [busy, setBusy] = useState(false); const [message, setMessage] = useState('');
  async function checkout() { setBusy(false); setMessage('Connect checkout in this lesson.'); }
  return <><button onClick={checkout} disabled={busy}>{busy ? 'Opening sandbox…' : 'Open Stripe test checkout'}</button><p role="status">{message}</p></>;
}
