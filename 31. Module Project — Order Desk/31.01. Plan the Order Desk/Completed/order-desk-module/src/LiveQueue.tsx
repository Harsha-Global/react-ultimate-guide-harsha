import { useState } from "react";
import { useGetLiveOrdersQuery } from "./services/ordersApi";
import { QueueTable } from "./QueueTable";
import { errorMessage } from "./services/contracts";
function Subscription() {
  const query = useGetLiveOrdersQuery();
  return (
    <>
      {query.isLoading && <p role="status">Opening live queue…</p>}
      {query.isError && <p role="alert">{errorMessage(query.error)}</p>}
      {query.currentData && (
        <>
          <p role="status">Stream: {query.currentData.connection}</p>
          {query.currentData.connection === "closed" && (
            <p>
              Close and reopen the stream to reconnect and refresh its records.
            </p>
          )}
          <QueueTable orders={query.currentData.items} selectedIds={[]} />
        </>
      )}
    </>
  );
}
export function LiveQueue() {
  const [open, setOpen] = useState(true);
  return (
    <section>
      <p>
        This read-only view receives versioned order events while its stream is
        open.
      </p>
      <button className="secondary" onClick={() => setOpen((value) => !value)}>
        {open ? "Close stream" : "Open stream"}
      </button>
      {open ? <Subscription /> : <p>Live subscription is closed.</p>}
    </section>
  );
}
