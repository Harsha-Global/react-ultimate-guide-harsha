'use client';
import Link from 'next/link';
import { useState, type FormEvent } from 'react';
export function PurchasePanel() {
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget); setBusy(true); setQuantityError('');
    try {
      const response = await fetch('/api/workshop/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: String(form.get('productId')), quantity: Number(form.get('quantity')) }) });
      const result = await response.json();
      setQuantityError(result.fields?.quantity?.[0] ?? '');
      if (response.ok) { setOrderId(result.id); setMessage(`Order saved. Total: $${(result.total / 100).toFixed(2)}`); }
      else setMessage(result.error);
    } catch { setMessage('The service is unavailable. Please try again.'); }
    finally { setBusy(false); }
  }
  return (
    <form onSubmit={submit} className="fs-card fs-form" noValidate>
      <label>Product<select name="productId"><option value="P-101">Studio Desk Lamp</option><option value="P-103">Terracotta Travel Mug</option></select></label>
      <label>Quantity<input name="quantity" type="number" defaultValue={1} min={1} max={5} step={1} aria-invalid={Boolean(quantityError)} aria-describedby={`quantity-help${quantityError ? ' quantity-error' : ''}`}/></label>
      <p id="quantity-help">Choose between 1 and 5 units.</p>
      {quantityError && <p id="quantity-error" role="alert">{quantityError}</p>}
      <button disabled={busy}>{busy ? 'Checking…' : 'Create order'}</button>
      <p role="status">{message}</p>
      {orderId && <Link href={`/workshop/orders/${orderId}`}>Open your order</Link>}
    </form>
  );
}
