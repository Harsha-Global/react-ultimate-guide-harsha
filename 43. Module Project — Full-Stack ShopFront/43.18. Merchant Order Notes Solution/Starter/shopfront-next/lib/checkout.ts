import 'server-only';
import { db } from './db';
import { getStripe } from './stripe';
import { AccessError, requireCurrentUser } from './orderAccess';
export async function startMyCheckout(orderId: string) {
  const user = await requireCurrentUser();
  const order = await db.order.findFirst({
    where: { id: orderId, customer: { userId: user.id } },
    include: { items: { include: { product: { select: { name: true } } } } },
  });
  if (!order) throw new AccessError(404, 'Order not found.');
  if (order.status !== 'pending') throw new AccessError(409, 'This order cannot start another checkout.');
  if (!order.items.length) throw new AccessError(409, 'The order has no items.');
  const stripe = getStripe();
  if (order.checkoutSessionId) {
    const existing = await stripe.checkout.sessions.retrieve(order.checkoutSessionId);
    if (existing.status !== 'open' || !existing.url) throw new AccessError(409, 'This checkout is no longer open. Check the order status.');
    return existing.url;
  }
  if (Date.now() - order.createdAt.getTime() > 23 * 60 * 60 * 1000) throw new AccessError(409, 'This order needs reconciliation before another checkout attempt.');
  const base = process.env.BETTER_AUTH_URL;
  if (!base) throw new Error('The application base URL is missing.');
  const session = await stripe.checkout.sessions.create({
    mode: 'payment', allowed_payment_method_types: ['card'],
    client_reference_id: order.id, metadata: { orderId: order.id },
    line_items: order.items.map(item => ({ quantity: item.quantity, price_data: {
      currency: 'usd', unit_amount: item.unitPriceMinor, product_data: { name: item.product.name },
    } })),
    success_url: `${base}/orders/${order.id}?checkout=returned`,
    cancel_url: `${base}/orders/${order.id}?checkout=cancelled`,
  }, { idempotencyKey: `checkout-${order.id}` });
  if (!session.url) throw new Error('Stripe did not return a checkout URL.');
  await db.order.update({ where: { id: order.id }, data: { checkoutSessionId: session.id } });
  return session.url;
}
