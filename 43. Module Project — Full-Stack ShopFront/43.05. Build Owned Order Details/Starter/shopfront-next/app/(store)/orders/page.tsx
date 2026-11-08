import Link from 'next/link';
import { readMyOrders } from '@/lib/customerOrders';
import { formatPrice } from '@/lib/catalog';
import { AccessError } from '@/lib/orderAccess';
import { PrivateMessage } from '@/components/PrivateMessage';
export const metadata = { title: 'Your orders', robots: { index: false, follow: false } };
export default async function OrdersPage() {
  let orders;
  try {
    orders = await readMyOrders();
  } catch (error) {
    if (error instanceof AccessError) return <PrivateMessage message={error.message}/>;
    throw error;
  }
  return (
    <>
      <p className="eyebrow">CUSTOMER SPACE</p>
      <h1>Your orders</h1>
      <p>Your 20 most recent orders. Only your account can open these details.</p>
      {orders.length ? (
        <div className="sf-order-list">
          {orders.map(order => (
            <article className="fs-card" key={order.id}>
              <p className="eyebrow">{order.status === 'paid' ? 'Payment verified' : 'Awaiting payment'}</p>
              <h2>
                <Link href={`/workshop/orders/${order.id}`}>{order.id}</Link>
              </h2>
              <p>{formatPrice(order.items.reduce((sum, item) => sum + item.quantity * item.unitPriceMinor, 0))}</p>
              <p>Created {order.createdAt.toISOString().slice(0,10)}</p>
            </article>
          ))}
        </div>
      ) : (
        <section className="fs-card">
          <h2>Your first order starts here</h2>
          <p>Browse the collection and choose a product.</p>
          <Link href="/catalog">Explore the collection</Link>
        </section>
      )}
    </>
  );
}
