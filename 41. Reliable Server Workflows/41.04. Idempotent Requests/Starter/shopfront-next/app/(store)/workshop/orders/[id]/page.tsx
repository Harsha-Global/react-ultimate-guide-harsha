import { Suspense } from 'react';
import Link from 'next/link';
import { AccessError, getMyOrder } from '@/lib/orderAccess';
import { OrderNoteEditor } from '@/components/OrderNoteEditor';
async function PrivateOrder({ params }: { params: Promise<{ id: string }> }) {
  try {
    const order = await getMyOrder((await params).id);
    return (
      <article className="fs-card">
        <h2>{order.id}</h2>
        <p>Status: {order.status}</p>
        <OrderNoteEditor id={order.id} note={order.note}/>
      </article>
    );
  } catch (error) {
    if (!(error instanceof AccessError)) throw error;
    return <p role="alert">{error.message} <Link href="/workshop/account">Open account</Link></p>;
  }
}
export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <section className="fs-shell">
      <h1>Your order</h1>
      <Suspense fallback={<p>Checking order access…</p>}>
        <PrivateOrder params={params}/>
      </Suspense>
    </section>
  );
}
