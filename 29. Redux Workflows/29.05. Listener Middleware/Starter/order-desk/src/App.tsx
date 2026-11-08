import { PackingPreview } from "./PackingPreview";
import { PackingChecklist } from "./PackingChecklist";
import { OrderQueue } from "./OrderQueue";
import { SelectionSummary } from "./SelectionSummary";
export function App() {
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
        <span className="workspace-tag">North studio · Sample workspace</span>
      </header>
      <main id="main">
        <div className="page-heading">
          <div>
            <p className="eyebrow">Fulfillment / order operations</p>
            <h1>A clear view of the queue.</h1>
            <p className="intro">Review today's orders and prepare the next packing run.</p>
          </div>
          <span className="sample-tag">Practice data</span>
        </div>
        <div className="workspace-layout">
          <div>
            <OrderQueue />
            <PackingChecklist />
            <PackingPreview />
          </div>
          <SelectionSummary />
        </div>
      </main>
      <footer>
        Order Desk learning workspace <span>Local draft · resets on reload</span>
      </footer>
    </>
  );
}
