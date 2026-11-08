import { StatusEditor } from "./StatusEditor";
import { useGetOrderQuery, ordersApi } from "./services/ordersApi";
import { useAppDispatch } from "./app/hooks";
import { errorMessage } from "./services/contracts";
import { statusLabels, money } from "./orders";
export function OrderDetails({ id, onClose }: { id: string; onClose: () => void }) {
  const query = useGetOrderQuery(id);
  const dispatch = useAppDispatch();
  return (
    <section className="queue" aria-label="Server order detail">
      <h2>Order {id}</h2>
      <button className="secondary" onClick={onClose}>
        Close server detail
      </button>
      {query.isFetching && <p role="status">Refreshing order detail…</p>}
      {query.isError && <p role="alert">{errorMessage(query.error)}</p>}
      {query.currentData && (
        <>
          <h3>{query.currentData.customer}</h3>
          <p>
            {query.currentData.item} · {money(query.currentData.total)}
          </p>
          <p>
            {statusLabels[query.currentData.status]} · Version {query.currentData.version}
          </p>
          <StatusEditor order={query.currentData} />
        </>
      )}
      <button className="secondary" onClick={() => dispatch(ordersApi.util.invalidateTags([{ type: "Order", id }]))}>
        Refresh related views
      </button>
    </section>
  );
}
