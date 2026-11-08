import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectionCleared } from "./features/selection/selectionSlice";
export function SelectionSummary() {
  const count = useAppSelector((state) => state.selection.selectedIds.length);
  const dispatch = useAppDispatch();
  return (
    <aside className="summary" aria-labelledby="selection-title">
      <p className="eyebrow">Shared workflow</p>
      <h2 id="selection-title">Selection</h2>
      <div role="status">
        <strong className="metric">{count}</strong>
        <p>orders selected across the queue</p>
      </div>
      <button className="secondary" disabled={count === 0} onClick={() => dispatch(selectionCleared())}>
        Clear selection
      </button>
      <hr />
      <p className="muted">
        This section uses sample records. No real order or payment is changed.
      </p>
    </aside>
  );
}
