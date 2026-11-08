'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
export function OrderStatusFeed({ orderId, initialStatus }: { orderId: string; initialStatus: string }) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [connection, setConnection] = useState('Connecting…');
  const lastEventId = useRef('');
  useEffect(() => {
    const source = new EventSource(`/api/workshop/orders/${encodeURIComponent(orderId)}/events`);
    source.onopen = () => setConnection('Live connection open');
    source.addEventListener('order-status', event => {
      if (event.lastEventId === lastEventId.current) return;
      const order = JSON.parse(event.data);
      if (order.id !== orderId) return;
      lastEventId.current = event.lastEventId; setStatus(order.status);
      if (order.status !== initialStatus) router.refresh();
    });
    source.addEventListener('access-denied', () => { setConnection('Access ended. Sign in again.'); source.close(); });
    source.onerror = () => setConnection('Connection interrupted. Reconnecting…');
    return () => source.close();
  }, [orderId, initialStatus, router]);
  return (
    <div className="fs-notice">
      <p role="status">Order status: {status}</p>
      <small>{connection}</small>
    </div>
  );
}
