import { useState } from "react";
import { BasketProvider } from "./BasketProvider.tsx";
import { useBasketState, useBasketDispatch } from "./useBasket.ts";
import { ticketCount } from "./totals.ts";
import { DemoBoundary } from "./DemoBoundary.tsx";
function Scope({ name }: { name: string }) {
  const state = useBasketState();
  const dispatch = useBasketDispatch();
  return (
    <section className="scope" aria-label={name}>
      <h2>{name}</h2>
      <p>
        {name} tickets: {ticketCount(state.lines)}
      </p>
      <button onClick={() => dispatch({ type: "ticketAdded", eventId: "e1" })}>
        Add to {name}
      </button>
      <button onClick={() => dispatch({ type: "basketCleared" })}>
        Clear {name}
      </button>
    </section>
  );
}
export default function App() {
  const [showMissing, setShowMissing] = useState(false);
  return (
    <main className="lab">
      <h1>Provider boundaries</h1>
      <BasketProvider>
        <Scope name="Outer" />
        <section className="scope">
          <h2>Inner provider region</h2>
          <BasketProvider>
            <Scope name="Inner" />
          </BasketProvider>
        </section>
        <Scope name="Outer sibling" />
      </BasketProvider>
      <button onClick={() => setShowMissing((current) => !current)}>
        Toggle missing-provider example
      </button>
      {showMissing && (
        <DemoBoundary>
          <Scope name="Missing" />
        </DemoBoundary>
      )}
      <p>
        Nested readers use the nearest provider. The outside reader has no
        provider and reports a clear error.
      </p>
    </main>
  );
}
