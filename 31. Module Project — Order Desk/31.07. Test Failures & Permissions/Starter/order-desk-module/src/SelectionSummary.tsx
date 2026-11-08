import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectionCleared } from "./features/selection/selectionSlice";
export function SelectionSummary() {
  const ids = useAppSelector((s) => s.selection.selectedIds);
  const dispatch = useAppDispatch();
  return (
    <aside className="summary" aria-labelledby="selection-title">
      <p className="eyebrow">Current workspace</p>
      <h2 id="selection-title">Selection</h2>
      <div role="status">
        <strong className="metric">{ids.length}</strong>
        <p>orders selected across searches</p>
        <p>The service validates readiness when you prepare a preview.</p>
      </div>
      <button className="secondary" disabled={!ids.length} onClick={() => dispatch(selectionCleared())}>
        Clear selection
      </button>
      <p className="muted">Sample workspace. No real orders or payments.</p>
    </aside>
  );
}
