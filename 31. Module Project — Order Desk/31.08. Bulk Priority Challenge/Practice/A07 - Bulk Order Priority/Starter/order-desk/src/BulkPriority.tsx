import { useState } from "react";
import { useStore } from "react-redux";
import { useAppSelector } from "./app/hooks";
import type { RootState } from "./app/store";
import type { ApiOrder } from "./services/contracts";
import { errorMessage } from "./services/contracts";
import { useLazyGetSelectedOrdersQuery } from "./services/priorityApi";
export function BulkPriority() {
  const store = useStore<RootState>();
  const ids = useAppSelector((state) => state.selection.selectedIds);
  const canEdit = useAppSelector(
    (state) => state.session.role === "operator",
  );
  const [load, loading] = useLazyGetSelectedOrdersQuery();
  const [review, setReview] = useState<{
    signature: string;
    rows: ApiOrder[];
  } | null>(null);
  const signature = JSON.stringify([...ids].sort());
  const current = review?.signature === signature;
  async function prepare() {
    const epoch = store.getState().session.epoch;
    setReview(null);
    try {
      const rows = await load([...ids]).unwrap();
      if (store.getState().session.epoch === epoch)
        setReview({ signature, rows });
    } catch {
      /* The query hook displays this failure. */
    }
  }
  return (
    <section className="queue" aria-label="Bulk priority">
      <h2>Bulk order priority</h2>
      <p>
        Review selected records across pages before requesting a priority
        change.
      </p>
      <button disabled={!ids.length || loading.isFetching} onClick={() => void prepare()}>
        Review selected priorities
      </button>
      {loading.isError && <p role="alert">{errorMessage(loading.error)}</p>}
      {review && (
        <>
          <ul>
            {review.rows.map((row) => (
              <li key={row.id}>
                {row.id}: {row.priority} · version {row.version}
              </li>
            ))}
          </ul>
          {!current && (
            <p role="status">Selection changed. Review it again.</p>
          )}
          <button disabled title="Implement the batch request">
            Apply high priority
          </button>
          {!canEdit && <p>This viewer session cannot change priority.</p>}
        </>
      )}
    </section>
  );
}
