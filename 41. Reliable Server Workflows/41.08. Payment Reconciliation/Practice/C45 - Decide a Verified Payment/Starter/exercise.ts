type SavedOrder = Readonly<{ id: string; checkoutSessionId: string; totalMinor: number; status: 'pending' | 'paid' }>;
type VerifiedPayment = Readonly<{ eventId: string; sessionId: string; orderId: string; amountTotal: number; currency: string; livemode: boolean; paymentStatus: 'paid' | 'unpaid' }>;
type PaymentDecision = 'ignore' | 'reject' | 'mark-paid';
function decidePayment(order: SavedOrder, payment: VerifiedPayment, processedEventIds: readonly string[]): PaymentDecision {
  // TODO: check duplicate delivery, trusted references, sandbox mode and monotonic state.
  return payment.paymentStatus === 'paid' ? 'mark-paid' : 'ignore';
}

