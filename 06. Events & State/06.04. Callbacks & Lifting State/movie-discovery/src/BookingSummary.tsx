type BookingSummaryProps = { readonly quantity: number };

export default function BookingSummary({ quantity }: BookingSummaryProps) {
  return <p>Booking summary: {quantity} tickets for Skyward.</p>;
}
