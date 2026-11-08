type SavedOrder = Readonly<{ id: string; checkoutSessionId: string; totalMinor: number; status: 'pending' | 'paid' }>;
type VerifiedPayment = Readonly<{ eventId: string; sessionId: string; orderId: string; amountTotal: number; currency: string; livemode: boolean; paymentStatus: 'paid' | 'unpaid' }>;
type PaymentDecision = 'ignore' | 'reject' | 'mark-paid';
function decidePayment(order: SavedOrder, payment: VerifiedPayment, processedEventIds: readonly string[]): PaymentDecision {
  if (processedEventIds.includes(payment.eventId)) return 'ignore';
  if (payment.livemode || payment.sessionId !== order.checkoutSessionId ||
      payment.orderId !== order.id || payment.amountTotal !== order.totalMinor ||
      payment.currency !== 'usd') return 'reject';
  if (order.status === 'paid' || payment.paymentStatus !== 'paid') return 'ignore';
  return 'mark-paid';
}

