import { useAppDispatch, useAppSelector } from "./app/hooks";
import { showTotalsChanged, densityChanged, preferencesReset } from "./features/preferences/preferencesSlice";
export function WorkspacePreferences() {
  const dispatch = useAppDispatch();
  const { density, saveStatus, showTotals } = useAppSelector(state => state.preferences);
  return <section className="checklist" aria-labelledby="preferences-title">
    <h2 id="preferences-title">Workspace preferences</h2>
    <label><input type="checkbox" checked={density === "compact"} onChange={event => dispatch(densityChanged(event.target.checked ? "compact" : "comfortable"))} />Compact rows</label>
    <label><input type="checkbox" checked={showTotals} onChange={event => dispatch(showTotalsChanged(event.target.checked))} />Show order totals</label>
    <p aria-live="polite">{saveStatus}</p>
    <button className="secondary" onClick={() => dispatch(preferencesReset())}>Reset preferences</button>
  </section>;
}
