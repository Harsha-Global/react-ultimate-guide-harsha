export type Quote = {
  readonly guestName: string;
  readonly showtime: string;
  readonly quantity: number;
  readonly total: number;
};
export default function QuoteCard({ quote }: { readonly quote: Quote }) {
  return <section className="quote" aria-label="Prepared quote"><h3>Prepared quote</h3>
    <p>{quote.guestName || "Guest"}: {quote.quantity} tickets at {quote.showtime}.</p>
    <p>Quoted total: ${quote.total}</p><p>Based on your choices when you requested this quote.</p></section>;
}
