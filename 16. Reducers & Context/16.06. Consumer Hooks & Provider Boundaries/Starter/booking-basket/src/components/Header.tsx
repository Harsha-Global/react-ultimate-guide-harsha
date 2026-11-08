import { useContext } from "react";
import { BasketContext } from "../basketContexts.ts";

import { ticketCount } from "../totals.ts";

export function Header() {
  const value = useContext(BasketContext);
  if (value === null)
    throw new Error("Basket components must be inside BasketProvider.");

  const lines = value.state.lines;
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
