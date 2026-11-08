type VerifiedNotice = Readonly<{ eventId: string; orderId: string; paid: boolean }>;
type NoticeLedger = { processedEventIds: string[]; notifications: string[] };
function recordVerifiedNotice(event: VerifiedNotice, ledger: NoticeLedger): boolean {
  if (!event.paid || ledger.processedEventIds.includes(event.eventId)) return false;
  ledger.notifications.push(event.orderId);
  ledger.processedEventIds.push(event.eventId);
  return true;
}

