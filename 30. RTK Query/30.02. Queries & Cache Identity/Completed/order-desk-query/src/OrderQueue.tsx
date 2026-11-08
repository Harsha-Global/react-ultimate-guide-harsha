import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { orderToggled } from "./features/selection/selectionSlice";
import { useGetOrdersQuery } from "./services/ordersApi";
import { QueueTable } from "./QueueTable";
export function OrderQueue() {
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const query = useGetOrdersQuery(search);
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
      {query.isLoading && <p role="status">Loading orders…</p>}
      {query.isError && (
        <p role="alert">Cannot load orders. Start the API and retry.</p>
      )}
      <button className="secondary" onClick={() => query.refetch()}>
        Refresh queue
      </button>
      {query.currentData && (
        <QueueTable orders={query.currentData} selectedIds={selectedIds} onToggle={(id) => dispatch(orderToggled(id))} />
      )}
    </div>
  );
}
