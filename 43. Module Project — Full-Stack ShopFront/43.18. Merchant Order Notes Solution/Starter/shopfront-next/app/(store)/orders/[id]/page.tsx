import Link from 'next/link';
import { OrderStatusFeed } from '@/components/OrderStatusFeed';
import { UploadPanel } from '@/components/UploadPanel';
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
      <OrderStatusFeed key={order.id} orderId={order.id} initialStatus={order.status} initialReceiptReady={Boolean(order.receipt)}/>
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
      <section className="fs-card">
        <h2>Your receipt</h2>
        {order.receipt ? <p>Receipt ready — {formatPrice(order.receipt.totalMinor)}</p> : <p>{order.status === 'paid' ? 'Payment is verified. The receipt job is still processing; this page updates when it is ready.' : 'A receipt appears after verified payment and background processing.'}</p>}
      </section>
      <section className="fs-card">
        <h2>Order image</h2>
        <p>Attach a small PNG or JPEG for this order. Only your account can open the private image.</p>
        <UploadPanel orderId={order.id}/>
        {order.attachments.map(attachment => (
          <p key={attachment.id}>
            <a href={`/api/workshop/orders/${order.id}/uploads/${attachment.id}/image`}>Open your private image</a>
          </p>
        ))}
      </section>
    </>
  );
}
