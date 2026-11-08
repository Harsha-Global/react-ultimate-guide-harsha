import { useState } from "react";
import { useAppSelector } from "./app/hooks";
import { useGetOrderPageQuery } from "./services/ordersApi";
import { errorMessage } from "./services/contracts";
import type { PageArgument, StatusFilter } from "./services/contracts";
import { ResultTable } from "./PagedQueue";
export function OperationsQueue() {
  const defaultStatus = useAppSelector((state) => state.preferences.defaultStatus);
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<StatusFilter>(defaultStatus);
  const [argument, setArgument] = useState<PageArgument>({
    search: "",
    status: defaultStatus,
    page: 1,
  });
  const query = useGetOrderPageQuery(argument);
  return (
    <>
      <form className="filter-bar" onSubmit={(event) => {
        event.preventDefault();
        setArgument({ search: draft.trim(), status, page: 1 });
      }}>
        <label>
          Search orders
          <input value={draft} onChange={(event) => setDraft(event.target.value)} />
        </label>
        <label>
          Order status
          <select value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)}>
            <option value="all">All statuses</option>
            <option value="ready">Ready to pack</option>
            <option value="payment-pending">Payment pending</option>
            <option value="shipped">Shipped</option>
          </select>
        </label>
        <button>Apply filters</button>
      </form>
      <p>Page {argument.page} · {query.currentData ? `${query.currentData.total} matching orders` : "Waiting for this result"}</p>
      {query.isFetching && <p role="status">Loading queue…</p>}
      {query.isError && <p role="alert">{errorMessage(query.error)}</p>}
      {query.currentData && (
        <>
          {query.currentData.items.length === 0 && <p>No orders on this page. Change the filters or return to an earlier page.</p>}
          <ResultTable key={JSON.stringify(argument)} orders={query.currentData.items} busy={query.isFetching} />
        </>
      )}
      <div className="pagination-controls">
        <button className="secondary" disabled={argument.page === 1 || query.isFetching} onClick={() => setArgument((previous) => ({ ...previous, page: previous.page - 1 }))}>
          Previous page
        </button>{" "}
        <button className="secondary" disabled={!query.currentData?.nextPage || query.isFetching} onClick={() => setArgument((previous) => ({ ...previous, page: previous.page + 1 }))}>
          Next page
        </button>{" "}
        <button className="secondary" disabled={query.isFetching} onClick={() => query.refetch()}>
          Refresh queue
        </button>
      </div>
    </>
  );
}
