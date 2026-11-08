import { money, ticketCount, totalCents } from "../totals.ts";
import type { BasketLine } from "../models.ts";
export function OrderSummary({ lines }: { lines: BasketLine[] }) {
  return (
    <aside className="order-summary" aria-labelledby="summary-heading">
      <p className="eyebrow">YOUR PLAN</p>
      <h2 id="summary-heading">Basket summary</h2>
      <div className="summary-row">
        <span>Tickets</span>
        <strong>{ticketCount(lines)}</strong>
      </div>
      <div className="summary-total">
        <span>Total</span>
        <strong>{money(totalCents(lines))}</strong>
      </div>
      <p className="summary-note">
        Your basket holds choices. Adding tickets does not reserve seats or
        create a booking.
      </p>
      <span className="sample-tag">Sample event catalogue</span>
    </aside>
  );
}
