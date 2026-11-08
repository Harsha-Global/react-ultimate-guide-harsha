import { useState } from "react";
import { useGetLiveOrdersQuery } from "./services/ordersApi";
import { errorMessage } from "./services/contracts";
function Connection() {
  const query = useGetLiveOrdersQuery();
  return (
    <>
      {query.isLoading && <p role="status">Opening live updates…</p>}
      {query.isError && <p role="alert">{errorMessage(query.error)}</p>}
      {query.currentData && <p role="status">Live updates: {query.currentData.connection}</p>}
      {query.currentData?.connection === "closed" && <p>Close and reopen live updates to reconnect.</p>}
    </>
  );
}
export function LiveUpdates() {
  const [open, setOpen] = useState(true);
  return (
    <section className="queue" aria-label="Live updates">
      <h2>Live updates</h2>
      <p>Keep the active queue and order details current while this connection is open.</p>
      <button className="secondary" onClick={() => setOpen((value) => !value)}>
        {open ? "Close live updates" : "Open live updates"}
      </button>
      {open ? <Connection /> : <p>Live updates are paused. Reopen to refresh missed changes.</p>}
    </section>
  );
}
