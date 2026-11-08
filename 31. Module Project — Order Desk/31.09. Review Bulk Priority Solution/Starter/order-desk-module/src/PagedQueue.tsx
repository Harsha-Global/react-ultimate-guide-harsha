import { useState } from "react";
import {
  useGetOrderPageQuery,
  useGetOrderFeedInfiniteQuery,
} from "./services/ordersApi";
import { errorMessage } from "./services/contracts";
import { QueueTable } from "./QueueTable";
import { OrderDetails } from "./OrderDetails";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectReady } from "./features/selection/selectReady";
import { selectVisibleSelectedOrders } from "./features/selection/selectors";
import { orderToggled } from "./features/selection/selectionSlice";
function PageView({ search }: { search: string }) {
  const [page, setPage] = useState(1);
  const query = useGetOrderPageQuery({ search, page });
  return (
    <>
      <p>Page {page}</p>
      {query.isFetching && <p role="status">Loading page…</p>}
      {query.isError && <p role="alert">{errorMessage(query.error)}</p>}
      {query.currentData && <ResultTable orders={query.currentData.items} busy={query.isFetching} />}
      <button
        className="secondary"
        disabled={page === 1 || query.isFetching}
        onClick={() => setPage((p) => p - 1)}
      >
        Previous page
      </button>{" "}
      <button
        className="secondary"
        disabled={!query.currentData?.nextPage || query.isFetching}
        onClick={() => setPage((p) => p + 1)}
      >
        Next page
      </button>{" "}
      <button className="secondary" onClick={() => query.refetch()}>
        Retry page
      </button>
    </>
  );
}
function FeedView({ search }: { search: string }) {
  const query = useGetOrderFeedInfiniteQuery(search);
  const rows = query.currentData?.pages.flatMap((p) => p.items);
  return (
    <>
      {query.isFetching && <p role="status">Loading feed…</p>}
      {query.isError && <p role="alert">{errorMessage(query.error)}</p>}
      {rows && <ResultTable orders={rows} busy={query.isFetching} />}
      <button
        className="secondary"
        disabled={!query.hasNextPage || query.isFetching}
        onClick={() => query.fetchNextPage()}
      >
        Load more orders
      </button>{" "}
      <button className="secondary" onClick={() => query.refetch()}>
        Refresh feed
      </button>
      {rows && !query.hasNextPage && <p>All matching orders are shown.</p>}
    </>
  );
}
export function ResultTable({
  orders,
  busy,
}: {
  busy: boolean;
  orders: Parameters<typeof QueueTable>[0]["orders"];
}) {
  const ids = useAppSelector((s) => s.selection.selectedIds);
  const dispatch = useAppDispatch();
  const visibleSelected = useAppSelector((s) => selectVisibleSelectedOrders(s, orders));
  const [detail, setDetail] = useState<string | null>(null);
  return (
    <>
      <div className="selection-tools">
        <button disabled={busy || !orders.some((order) => order.status === "ready")} onClick={() => dispatch(selectReady(orders))}>Select ready orders shown</button>
        <p role="status">{visibleSelected.length} selected here · {ids.length} selected across the workspace</p>
      </div>
      <QueueTable
        orders={orders}
        selectedIds={ids}
        onToggle={(id) => dispatch(orderToggled(id))}
        onInspect={setDetail}
      />
      {detail && (
        <OrderDetails
          key={detail}
          id={detail}
          onClose={() => setDetail(null)}
        />
      )}
    </>
  );
}
export function PagedQueue({ mode }: { mode: "pages" | "feed" }) {
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  return (
    <>
      <form
        className="filter-bar"
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(draft.trim());
        }}
      >
        <label>
          Search paged orders
          <input value={draft} onChange={(e) => setDraft(e.target.value)} />
        </label>
        <button>Apply search</button>
      </form>
      {mode === "pages" ? (
        <PageView key={search} search={search} />
      ) : (
        <FeedView search={search} />
      )}
    </>
  );
}
