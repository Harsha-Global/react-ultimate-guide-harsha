import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { orderToggled } from "./features/selection/selectionSlice";
import { useGetOrdersQuery } from "./services/ordersApi";
import { errorMessage } from "./services/contracts";
import { OrderDetails } from "./OrderDetails";
import { QueueTable } from "./QueueTable";
export function OrderQueue() {
  const [detail, setDetail] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [polling, setPolling] = useState(false);
  const query = useGetOrdersQuery(search, {
    pollingInterval: polling ? 2000 : 0,
    refetchOnFocus: polling,
  });
  const selectedIds = useAppSelector((state) => state.selection.selectedIds);
  const dispatch = useAppDispatch();
  return (
    <div>
      <form className="filter-bar" onSubmit={(e) => {
        e.preventDefault();
        setSearch(draft.trim());
      }}>
        <label>
          Search orders
          <input value={draft} onChange={(e) => setDraft(e.target.value)} />
        </label>
        <button>Search</button>
        <button type="button" className="secondary" onClick={() => {
          setDraft("");
          setSearch("");
        }}>
          Clear search
        </button>
      </form>
      <label>
        <input type="checkbox" checked={polling} onChange={(e) => setPolling(e.target.checked)} />
        Poll every two seconds
      </label>
      {query.isFetching && !query.isLoading && (
        <p role="status">Refreshing the current result…</p>
      )}
      {query.isLoading && <p role="status">Loading orders…</p>}
      {query.isError && (
        <p role="alert">{errorMessage(query.error)}</p>
      )}
      <button className="secondary" onClick={() => query.refetch()}>
        Refresh queue
      </button>
      {query.currentData && (
        <QueueTable orders={query.currentData} selectedIds={selectedIds} onToggle={(id) => dispatch(orderToggled(id))} onInspect={setDetail} />
      )}
      {detail && (
        <OrderDetails key={detail} id={detail} onClose={() => setDetail(null)} />
      )}
    </div>
  );
}
