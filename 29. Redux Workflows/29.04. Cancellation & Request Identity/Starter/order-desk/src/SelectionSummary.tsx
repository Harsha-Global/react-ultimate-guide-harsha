import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectionCleared } from "./features/selection/selectionSlice";
import { selectSelectedCount, selectReadyCount, selectCanPrioritize, selectSelectedOrders } from "./features/selection/selectors";
import { selectReady } from "./features/selection/selectReady";
import { money } from "./orders";
export function SelectionSummary() {
  const selectedOrders = useAppSelector(selectSelectedOrders);
  const selectedTotal = selectedOrders.reduce((sum, order) => sum + order.total, 0);
  const count = useAppSelector(selectSelectedCount);
  const readyCount = useAppSelector(selectReadyCount);
  const canPrioritize = useAppSelector(selectCanPrioritize);
  const hasSelection = useAppSelector((state) => state.selection.selectedIds.length > 0);
  const dispatch = useAppDispatch();
  return (
    <aside className="summary" aria-labelledby="selection-title">
      <p className="eyebrow">Shared workflow</p>
      <h2 id="selection-title">Selection</h2>
      <div role="status">
        <strong className="metric">{count}</strong>
        <p>orders selected across the queue</p>
        <p>
          {readyCount} ready to pack · {money(selectedTotal)}
        </p>
        <p className="readiness">
          {canPrioritize
            ? "This selection is ready for priority packing."
            : count === 0
              ? "Select at least one ready order."
              : "Every selected order must be present and ready."}
        </p>
      </div>
      <button className="secondary" disabled={!hasSelection} onClick={() => dispatch(selectionCleared())}>
        Clear selection
      </button>
      <button className="secondary" onClick={() => dispatch(selectReady())}>Add all ready orders</button>
      <hr />
      <p className="muted">
        This section uses sample records. No real order or payment is changed.
      </p>
    </aside>
  );
}
