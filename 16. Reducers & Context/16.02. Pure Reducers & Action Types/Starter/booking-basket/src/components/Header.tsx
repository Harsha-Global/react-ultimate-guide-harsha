import { ticketCount } from "../totals.ts";
import type { BasketLine } from "../models.ts";
export function Header({ lines }: { lines: BasketLine[] }) {
  const count = ticketCount(lines);
  return (
    <header className="site-header">
      <a className="brand" href="#main">
        <span className="brand-mark" aria-hidden="true">
          B
        </span>
        Booking Desk
      </a>
      <span className="header-note">Make time for something good.</span>
      <p className="basket-badge" aria-live="polite">
        Your basket <strong>{count}</strong>
        <span className="sr-only"> tickets</span>
      </p>
    </header>
  );
}
