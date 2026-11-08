import { QueueTable } from "./QueueTable";
import { orders } from "./orders";
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
            <p className="notice">
              Preview: selection controls are connected in lecture 28.06. Order details already
              work.
            </p>
            <QueueTable orders={orders} selectedIds={[]} />
          </div>
          <aside className="summary">
            <p className="eyebrow">Shared workflow</p>
            <h2>Selection</h2>
            <strong className="metric">0</strong>
            <p>Choose orders from the queue, then review their readiness here.</p>
            <hr />
            <p className="muted">
              This section uses sample records. No real order or payment is changed.
            </p>
          </aside>
        </div>
      </main>
      <footer>
        Order Desk learning workspace <span>Local draft · resets on reload</span>
      </footer>
    </>
  );
}
