import { SessionGate } from "./SessionGate";
import "./workflow.css";
import "./query.css";
import { WorkspacePreferences } from "./WorkspacePreferences";
import { useAppSelector } from "./app/hooks";
import { PackingPreview } from "./PackingPreview";
import { PackingChecklist } from "./PackingChecklist";
import { OrderQueue } from "./OrderQueue";
import { SelectionSummary } from "./SelectionSummary";
export function App() {
  const density = useAppSelector(state => state.preferences.density);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to workspace
      </a>
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            OD
          </span>
          <span>
            Order Desk<small>Operations workspace</small>
          </span>
        </div>
        <span className="workspace-tag">Sample workspace</span>
      </header>
      <main id="main" className={density}>
        <div className="page-heading">
          <div>
            <p className="eyebrow">Fulfillment / order operations</p>
            <h1>A clear view of the queue.</h1>
            <p className="intro">Review today's orders and prepare the next packing run.</p>
          </div>
          <span className="sample-tag">Practice data</span>
        </div>
        <SessionGate>
          <div className="workspace-layout">
            <div>
              <OrderQueue />
              <PackingChecklist />
              <PackingPreview />
              <WorkspacePreferences />
            </div>
            <SelectionSummary />
          </div>
        </SessionGate>
      </main>
      <footer>
        Order Desk learning workspace <span>Preferences saved locally · order selection is temporary</span>
      </footer>
    </>
  );
}
