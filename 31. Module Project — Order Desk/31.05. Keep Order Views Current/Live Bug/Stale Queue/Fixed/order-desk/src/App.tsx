import { BrowserRouter } from "react-router";
import { SessionGate } from "./SessionGate";
import "./workflow.css";
import "./query.css";
import "./module.css";
import { WorkspacePreferences } from "./WorkspacePreferences";
import { useAppSelector } from "./app/hooks";
import { PackingPreview } from "./PackingPreview";
import { PackingChecklist } from "./PackingChecklist";
import { QueueWorkspace } from "./QueueWorkspace";
import { SelectionSummary } from "./SelectionSummary";
export function App() {
  const density = useAppSelector(state => state.preferences.density);
  return (
    <BrowserRouter>
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
            <h1>Ready for the next dispatch.</h1>
            <p className="intro">Find the right orders, review their readiness and keep the packing team in sync.</p>
          </div>
          <span className="sample-tag">Practice data</span>
        </div>
        <SessionGate>
          <div className="workspace-layout">
            <div>
              <QueueWorkspace />
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
    </BrowserRouter>
  );
}
