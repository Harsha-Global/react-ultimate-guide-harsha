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
    // LIVE: add authorized order-status and access-denied listeners.
    source.onerror = () => setConnection('Connection interrupted. Reconnecting…');
    return () => source.close();
  }, [orderId, initialStatus, router]);
  return <div className="fs-notice"><p role="status">Order status: {status}</p><small>{connection}</small></div>;
}
