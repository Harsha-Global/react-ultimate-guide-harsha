import { isStatusFilter } from "./features/preferences/storage";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { densityChanged, defaultStatusChanged, preferencesReset } from "./features/preferences/preferencesSlice";
export function WorkspacePreferences() {
  const dispatch = useAppDispatch();
  const { density, defaultStatus, saveStatus } = useAppSelector(state => state.preferences);
  return <section className="checklist" aria-labelledby="preferences-title">
    <h2 id="preferences-title">Workspace preferences</h2>
    <label><input type="checkbox" checked={density === "compact"} onChange={event => dispatch(densityChanged(event.target.checked ? "compact" : "comfortable"))} />Compact rows</label>
    <label>Default order status
      <select value={defaultStatus} onChange={(event) => {
        const value = event.target.value;
        if (isStatusFilter(value)) dispatch(defaultStatusChanged(value));
      }}>
        <option value="all">All statuses</option>
        <option value="ready">Ready to pack</option>
        <option value="payment-pending">Payment pending</option>
        <option value="shipped">Shipped</option>
      </select>
    </label>
    <p>Used when the workspace opens; it does not change the current queue.</p>
    <p aria-live="polite">{saveStatus}</p>
    <button className="secondary" onClick={() => dispatch(preferencesReset())}>Reset preferences</button>
  </section>;
}
