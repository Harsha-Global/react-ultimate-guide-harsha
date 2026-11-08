import { findEvent } from "./events.ts";
import type { BasketLine } from "./models.ts";
export function ticketCount(lines: readonly BasketLine[]): number {
  return lines.reduce((count, line) => count + line.quantity, 0);
}
export function totalCents(lines: readonly BasketLine[]): number {
  return lines.reduce(
    (total, line) =>
      total + (findEvent(line.eventId)?.priceCents ?? 0) * line.quantity,
    0,
  );
}
export function money(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
