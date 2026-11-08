import Link from 'next/link';
import { readMerchantWorkspace } from '@/lib/merchant';
import { AccessError } from '@/lib/orderAccess';
import { formatPrice } from '@/lib/catalog';
import { PrivateMessage } from '@/components/PrivateMessage';
import { MerchantStockForm } from '@/components/MerchantStockForm';
export const metadata = { title: 'Merchant workspace', robots: { index: false, follow: false } };
export default async function WorkspacePage({ params }: { params: Promise<{ workspaceId: string }> }) {
  const { workspaceId } = await params;
  let view;
  try {
    view = await readMerchantWorkspace(workspaceId);
  } catch (error) {
    if (error instanceof AccessError) return <PrivateMessage message={error.message}/>;
    throw error;
  }
  return (
    <>
      <Link href="/merchant">← All workspaces</Link>
      <p className="eyebrow">MERCHANT SPACE</p>
      <h1>{view.workspace.name}</h1>
      <p>Inventory and orders for this team. Customer account details stay private.</p>
      <div className="sf-workspace">
        <section>
          <h2>Inventory</h2>
          {view.products.map(product => (
            <article className="fs-card" key={product.id}>
              <p className="eyebrow">{product.id}</p>
              <h3>{product.name}</h3>
              <p>{formatPrice(product.priceMinor)}</p>
              {view.canEdit ? <MerchantStockForm key={`${product.id}-${product.stock}`} workspaceId={workspaceId} productId={product.id} stock={product.stock}/> : <p>{product.stock} in stock · View only</p>}
            </article>
          ))}
        </section>
        <section aria-labelledby="queue-heading">
          <h2 id="queue-heading">Fulfillment queue</h2>
          <p>Up to 20 most recent orders. Amounts include this team's items only.</p>
          {view.orders.length ? view.orders.map(order => (
            <article className="fs-card" key={order.id}>
              <h3>{order.id}</h3>
              <p className="sf-state">{order.fulfillments[0]?.status ?? (order.status === 'paid' ? 'Preparing fulfillment' : 'Awaiting payment')}</p>
              <ul>
                {order.items.map((item, index) => <li key={index}>{item.product.name} × {item.quantity}</li>)}
              </ul>
              <p>{formatPrice(order.items.reduce((sum, item) => sum + item.quantity * item.unitPriceMinor, 0))} for this team</p>
            </article>
          )) : <p className="fs-card">No orders in this view.</p>}
        </section>
      </div>
    </>
  );
}
