type BookingSummaryProps = {
  readonly quantity: number;
  readonly guestName: string;
  readonly showtime: string;
  readonly total: number;
};

export default function BookingSummary({ quantity, guestName, showtime, total }: BookingSummaryProps) {
  return (
    <div className={quantity === 6 ? "booking-summary at-limit" : "booking-summary"}>
      <p>Booking for {guestName.trim() || "Guest"}: {quantity} tickets for Skyward at {showtime}.</p>
      <p>Total: ${total}</p>
      {quantity === 6 && <p>Maximum six tickets per booking.</p>}
    </div>
  );
}
