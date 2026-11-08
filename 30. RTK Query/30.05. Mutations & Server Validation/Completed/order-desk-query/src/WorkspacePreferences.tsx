import { useAppDispatch, useAppSelector } from "./app/hooks";
import { densityChanged, preferencesReset } from "./features/preferences/preferencesSlice";
export function WorkspacePreferences() {
  const dispatch = useAppDispatch();
  const { density, saveStatus } = useAppSelector(state => state.preferences);
  return <section className="checklist" aria-labelledby="preferences-title">
    <h2 id="preferences-title">Workspace preferences</h2>
    <label><input type="checkbox" checked={density === "compact"} onChange={event => dispatch(densityChanged(event.target.checked ? "compact" : "comfortable"))} />Compact rows</label>
    <p aria-live="polite">{saveStatus}</p>
    <button className="secondary" onClick={() => dispatch(preferencesReset())}>Reset preferences</button>
  </section>;
}
