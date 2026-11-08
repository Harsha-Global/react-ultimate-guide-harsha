'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useState, type FormEvent } from 'react';
import { authClient } from '@/lib/authClient';
type Attempt = { requestKey: string; quantity: number };
export function StorePurchase({ productId, stock }: { productId: string; stock: number }) {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) return <p role="status">Checking your account…</p>;
  if (!session) return (
    <p>
      <Link href="/account">Sign in to order</Link>
    </p>
  );
  return <PurchaseForm key={`${session.user.id}-${productId}`} userId={session.user.id} productId={productId} stock={stock}/>;
}
function PurchaseForm({ userId, productId, stock }: { userId: string; productId: string; stock: number }) {
  const router = useRouter();
  const quantityId = useId();
  const storageKey = `shopfront-attempt:${userId}:${productId}`;
  const [quantity, setQuantity] = useState(1);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as Attempt;
        if (!/^[0-9a-f-]{36}$/i.test(saved.requestKey) || !Number.isInteger(saved.quantity) || saved.quantity < 1 || saved.quantity > 5) throw new Error('Invalid saved attempt.');
        setAttempt(saved);
        setQuantity(saved.quantity);
      }
      setReady(true);
    } catch {
      setMessage('This tab cannot restore its order attempt. Check Your orders before using another tab.');
    }
  }, [storageKey]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    const current = attempt ?? { requestKey: crypto.randomUUID(), quantity };
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(current));
    } catch {
      setMessage('This browser cannot save the retry reference. Enable session storage before ordering.');
      setBusy(false);
      return;
    }
    setAttempt(current);
    try {
      const response = await fetch('/api/workshop/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...current, productId }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response.json();
      if (!response.ok) {
        // Only definitive input/stock rejection releases the draft. An uncertain result keeps the same key.
        if ([400, 409].includes(response.status)) {
          sessionStorage.removeItem(storageKey);
          setAttempt(null);
        }
        setMessage(result.error ?? 'The order could not be confirmed. Retry this attempt.');
        return;
      }
      sessionStorage.removeItem(storageKey);
      router.push(`/orders/${encodeURIComponent(result.id)}`);
    } catch {
      setMessage('The result is uncertain. Retry this same attempt, or check Your orders.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="sf-purchase" onSubmit={submit}>
      <label htmlFor={quantityId}>Quantity <input id={quantityId} type="number" min="1" max="5" step="1" required value={quantity} disabled={busy || Boolean(attempt)} onChange={event => setQuantity(Number(event.target.value))}/></label>
      <button disabled={!ready || busy || (!attempt && stock === 0)}>{busy ? 'Confirming order…' : attempt ? 'Retry this order attempt' : 'Reserve & review order'}</button>
      <p>Sandbox purchase. The server confirms stock and price before checkout.</p>
      <p role="status">{message}</p>
      <Link href="/orders">Your orders</Link>
    </form>
  );
}
