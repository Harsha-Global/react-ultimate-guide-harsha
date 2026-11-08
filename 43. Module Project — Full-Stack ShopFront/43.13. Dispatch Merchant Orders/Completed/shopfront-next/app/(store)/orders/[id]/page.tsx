import Link from 'next/link';
import { CheckoutButton } from '@/components/CheckoutButton';
import { getMyOrder, AccessError } from '@/lib/orderAccess';
import { formatPrice } from '@/lib/catalog';
import { PrivateMessage } from '@/components/PrivateMessage';
export const metadata = { title: 'Order details', robots: { index: false, follow: false } };
export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let order;
  try {
    order = await getMyOrder(id);
  } catch (error) {
    if (error instanceof AccessError) return <PrivateMessage message={error.message}/>;
    throw error;
  }
  const total = order.items.reduce((sum, item) => sum + item.quantity * item.unitPriceMinor, 0);
  return (
    <>
      <Link href="/orders">← Your orders</Link>
      <p className="eyebrow">PRIVATE ORDER</p>
      <h1>Order {order.id}</h1>
      <section className="fs-card">
        <h2>Order summary</h2>
        <p>Status: {order.status}</p>
        <ul>
          {order.items.map((item, index) => <li key={index}>{item.product.name} × {item.quantity} — {formatPrice(item.quantity * item.unitPriceMinor)}</li>)}
        </ul>
        <p className="sf-total">Total {formatPrice(total)}</p>
        {order.status === 'pending' ? (
          <>
            <p>Payment has not been verified. Returning from Checkout does not change this status.</p>
            <CheckoutButton orderId={order.id}/>
          </>
        ) : <p>Payment is verified. Each merchant can now process their items.</p>}
      </section>
    </>
  );
}
