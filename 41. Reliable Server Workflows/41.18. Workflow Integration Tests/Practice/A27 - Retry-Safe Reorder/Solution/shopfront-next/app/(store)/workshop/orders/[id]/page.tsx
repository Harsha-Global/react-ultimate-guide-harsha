import { ReorderPanel } from '@/components/ReorderPanel';
import { OrderStatusFeed } from '@/components/OrderStatusFeed';
import { UploadPanel } from '@/components/UploadPanel';
import { CheckoutButton } from '@/components/CheckoutButton';
import { Suspense } from 'react';
import Link from 'next/link';
import { AccessError, getMyOrder } from '@/lib/orderAccess';
import { OrderNoteEditor } from '@/components/OrderNoteEditor';
async function PrivateOrder({ params }: { params: Promise<{ id: string }> }) {
  try {
    const order = await getMyOrder((await params).id);
    return <article className="fs-card"><h2>{order.id}</h2><OrderStatusFeed orderId={order.id} initialStatus={order.status} initialReceiptReady={Boolean(order.receipt)}/>{order.receipt && <p>Receipt saved: ${(order.receipt.totalMinor / 100).toFixed(2)}</p>}<OrderNoteEditor id={order.id} note={order.note}/><ReorderPanel orderId={order.id} lines={order.items.map(item=>({productId:item.productId,name:item.product.name}))}/>{order.status === 'pending' && <CheckoutButton orderId={order.id}/>}<UploadPanel orderId={order.id}/><ul>{order.attachments.map(image => <li key={image.id}><a href={`/api/workshop/orders/${order.id}/uploads/${image.id}/image`} target="_blank" rel="noreferrer">Saved order image</a></li>)}</ul><p>The return URL does not prove payment. This status comes from the server.</p></article>;
  } catch (error) {
    if (!(error instanceof AccessError)) throw error;
    return <p role="alert">{error.message} <Link href="/workshop/account">Open account</Link></p>;
  }
}
export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  return <section className="fs-shell"><h1>Your order</h1><Suspense fallback={<p>Checking order access…</p>}><PrivateOrder params={params}/></Suspense></section>;
}
