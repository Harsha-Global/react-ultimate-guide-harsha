'use client';
import { useState } from 'react';
export function CheckoutButton({ orderId }: { orderId: string }) {
  const [busy, setBusy] = useState(false); const [message, setMessage] = useState('');
  async function checkout() {
    setBusy(true); setMessage('');
    try {
      const response = await fetch(`/api/workshop/orders/${encodeURIComponent(orderId)}/checkout`, { method: 'POST' });
      const result = await response.json();
      if (!response.ok) { setMessage(result.error); return; }
      window.location.assign(result.url);
    } catch { setMessage('Checkout could not be confirmed. Retry this order; do not create a second order.'); }
    finally { setBusy(false); }
  }
  return (
    <>
      <button onClick={checkout} disabled={busy}>{busy ? 'Opening sandbox…' : 'Open Stripe test checkout'}</button>
      <p role="status">{message}</p>
    </>
  );
}
