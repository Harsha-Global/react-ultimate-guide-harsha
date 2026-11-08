import { useEffect, useState } from "react";
import type { BookingConfirmation } from "../shared/bookingSchema";
import { loadBooking } from "./typedBookingApi";

export function BookingResult({ reference }: { reference: string }) {
  const [result, setResult] = useState<BookingConfirmation | null>(null);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setResult(null);
    setError("");
    loadBooking(reference, controller.signal).then(value => {
      if (active)
        setResult(value);
    }).catch(error => {
      if (active && !controller.signal.aborted)
        setError(error instanceof Error ? error.message : "The booking could not be loaded.");
    });
    return () => {
      active = false;
      controller.abort();
    };
  }, [reference, attempt]);

  return <section className="panel wide">
    <h1>Your booking confirmation</h1>
    {result ? <p>{result.reference} · {result.places} {result.places === 1 ? "place" : "places"} · {result.slot} session</p> : error ? <div role="alert">
      <p>{error}</p>
      <button onClick={() => setAttempt(n => n + 1)}>Try again</button>
    </div> : <p role="status">Loading booking…</p>}
    <a href="/">Back to the studio</a>
  </section>;
}