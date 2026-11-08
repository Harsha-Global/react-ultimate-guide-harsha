import { useState } from "react";
import { useStore } from "react-redux";
import { acceptedOrdersRemoved } from "./features/selection/selectionSlice";
import type { PriorityResult } from "./services/priorityContracts";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import type { RootState } from "./app/store";
import type { ApiOrder } from "./services/contracts";
import { errorMessage } from "./services/contracts";
import { useLazyGetSelectedOrdersQuery, useUpdatePrioritiesMutation } from "./services/priorityApi";
export function BulkPriority() {
  const store = useStore<RootState>();
  const dispatch = useAppDispatch();
  const [update, changing] = useUpdatePrioritiesMutation();
  const [report, setReport] = useState<PriorityResult[]>([]);
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
    setReport([]);
    changing.reset();
    try {
      const rows = await load([...ids]).unwrap();
      if (store.getState().session.epoch === epoch)
        setReview({ signature, rows });
    } catch {
      /* The query hook displays this failure. */
    }
  }
  async function apply() {
    if (!canEdit || !current || !review || changing.isLoading) return;
    const epoch = store.getState().session.epoch;
    try {
      const results = await update({
        priority: "high",
        items: review.rows.map((row) => ({
          id: row.id,
          version: row.version,
        })),
      }).unwrap();
      if (store.getState().session.epoch !== epoch) return;
      setReport(results);
      setReview(null);
      dispatch(
        acceptedOrdersRemoved(
          results.filter((row) => row.ok).map((row) => row.id),
        ),
      );
    } catch {
      /* A whole-request failure leaves selection unchanged. */
    }
  }
  return (
    <section className="queue" aria-label="Bulk priority">
      <h2>Bulk order priority</h2>
      <p>
        Review selected records across pages before requesting a priority
        change.
      </p>
      <button disabled={!ids.length || loading.isFetching || changing.isLoading} onClick={() => void prepare()}>
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
          <button disabled={!canEdit || !current || changing.isLoading} onClick={() => void apply()}>
            {changing.isLoading
              ? "Applying priority…"
              : "Apply high priority"}
          </button>
          {!canEdit && <p>This viewer session cannot change priority.</p>}
        </>
      )}
      {changing.isError && (
        <p role="alert">{errorMessage(changing.error)}</p>
      )}
      {report.length > 0 && (
        <div role="status">
          <p>
            {report.filter((row) => row.ok).length} accepted;{" "}
            {report.filter((row) => !row.ok).length} rejected. Rejected
            orders remain selected.
          </p>
          <ul>
            {report.map((row) => (
              <li key={row.id}>
                {row.id}:{" "}
                {row.ok
                  ? `priority ${row.order.priority} accepted`
                  : `${row.code} — ${row.message}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
