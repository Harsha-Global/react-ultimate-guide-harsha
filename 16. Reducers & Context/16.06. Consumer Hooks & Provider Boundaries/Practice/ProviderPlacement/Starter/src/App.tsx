import { BasketProvider } from "./BasketProvider.tsx";
import { useBasketState, useBasketDispatch } from "./useBasket.ts";
import { ticketCount } from "./totals.ts";
import { DemoBoundary } from "./DemoBoundary.tsx";
function TicketControl() {
  const state = useBasketState();
  const dispatch = useBasketDispatch();
  return (
    <BasketProvider>
      <section className="scope">
        <h2>Booking feature</h2>
        <p>Tickets: {ticketCount(state.lines)}</p>
        <button
          onClick={() => dispatch({ type: "ticketAdded", eventId: "e1" })}
        >
          Add a ticket
        </button>
      </section>
    </BasketProvider>
  );
}
export default function App() {
  return (
    <main className="lab">
      <h1>Fix the provider placement</h1>
      <DemoBoundary>
        <TicketControl />
      </DemoBoundary>
    </main>
  );
}
