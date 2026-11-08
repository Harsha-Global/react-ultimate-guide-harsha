type VerifiedNotice = Readonly<{ eventId: string; orderId: string; paid: boolean }>;
type NoticeLedger = { processedEventIds: string[]; notifications: string[] };
function recordVerifiedNotice(event: VerifiedNotice, ledger: NoticeLedger): boolean {
  if (!event.paid) return false;
  // BUG: replaying the same verified event currently records another notification.
  ledger.notifications.push(event.orderId);
  ledger.processedEventIds.push(event.eventId);
  return true;
}

