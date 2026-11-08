'use client';
import Link from 'next/link';
import { useRef, useState, type FormEvent } from 'react';
export function PurchasePanel() {
  const requestKey = useRef('');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget); setBusy(true); setQuantityError('');
    if (!requestKey.current) requestKey.current = crypto.randomUUID();
    try {
      const response = await fetch('/api/workshop/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestKey: requestKey.current, productId: String(form.get('productId')), quantity: Number(form.get('quantity')) }) });
      const result = await response.json();
      setQuantityError(result.fields?.quantity?.[0] ?? '');
      if (response.ok) { setOrderId(result.id); setMessage(`Order saved. Total: $${(result.total / 100).toFixed(2)}`); }
      else setMessage(result.error);
    } catch { setMessage('The service is unavailable. Please try again.'); }
    finally { setBusy(false); }
  }
  return (
    <form onChange={() => { requestKey.current = ''; setOrderId(''); setMessage(''); setQuantityError(''); }} onSubmit={submit} className="fs-card fs-form" noValidate>
      <label>Product<select name="productId" disabled={busy}><option value="P-101">Studio Desk Lamp</option><option value="P-103">Terracotta Travel Mug</option></select></label>
      <label>Quantity<input disabled={busy} name="quantity" type="number" defaultValue={1} min={1} max={5} step={1} aria-invalid={Boolean(quantityError)} aria-describedby={`quantity-help${quantityError ? ' quantity-error' : ''}`}/></label>
      <p id="quantity-help">Choose between 1 and 5 units.</p>
      {quantityError && <p id="quantity-error" role="alert">{quantityError}</p>}
      <button disabled={busy}>{busy ? 'Checking…' : 'Create order'}</button>
      <p role="status">{message}</p>
      {orderId && (
        <>
          <Link href={`/workshop/orders/${orderId}`}>Open your order</Link>
          <button type="button" disabled={busy} onClick={() => { requestKey.current = ''; setOrderId(''); setMessage('Ready for a new order.'); }}>Start another order</button>
        </>
      )}
    </form>
  );
}
