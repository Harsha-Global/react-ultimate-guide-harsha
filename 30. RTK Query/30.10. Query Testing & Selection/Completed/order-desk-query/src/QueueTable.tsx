import { useState } from "react";
import { money, statusLabels } from "./orders";
import type { Order } from "./orders";
type Props = {
  orders: readonly Order[];
  selectedIds: readonly string[];
  onToggle?: (id: string) => void;
  onInspect?: (id: string) => void;
};
export function QueueTable({ orders, selectedIds, onToggle, onInspect }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const expanded = orders.find((order) => order.id === expandedId);
  return (
    <section className="queue" aria-labelledby="queue-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Today's workspace</p>
          <h2 id="queue-title">Order queue</h2>
        </div>
        <span className="count">{orders.length} orders</span>
      </div>
      <p id="queue-scroll-help" className="scroll-hint">
        Scroll the table sideways to see all columns.
      </p>
      <div className="table-scroll" tabIndex={0} role="region" aria-label="Order queue table" aria-describedby="queue-scroll-help">
        <table>
          <caption className="sr-only">Sample orders, fulfillment status and selection</caption>
          <thead>
            <tr>
              <th scope="col">Select</th>
              <th scope="col">Order / customer</th>
              <th scope="col">Items</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className={selectedIds.includes(order.id) ? "selected" : ""}>
                <td>
                  <label className="check-target">
                    <input type="checkbox" aria-label={`Select ${order.id}`} checked={selectedIds.includes(order.id)} disabled={!onToggle} onChange={() => onToggle?.(order.id)} />
                  </label>
                </td>
                <th scope="row">
                  <span className="order-id">{order.id}</span>
                  <span className="customer">{order.customer}</span>
                </th>
                <td className="numeric">{order.units}</td>
                <td className="numeric">{money(order.total)}</td>
                <td>
                  <span className={`status ${order.status}`}>{statusLabels[order.status]}</span>
                </td>
                <td>
                  <button className="text-button" aria-label={`Details for ${order.id}`} aria-expanded={onInspect ? undefined : expandedId === order.id} aria-controls={onInspect ? undefined : "order-detail"} onClick={() => onInspect ? onInspect(order.id) : setExpandedId(expandedId === order.id ? null : order.id)}>
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orders.length === 0 && <p className="empty">No orders match this view.</p>}
      <div id="order-detail">
        {expanded && (
          <aside className="detail">
            <p className="eyebrow">Order detail · {expanded.id}</p>
            <h3>{expanded.item}</h3>
            <p>
              {expanded.units} units for {expanded.customer}. {statusLabels[expanded.status]}.
            </p>
            <button className="secondary" onClick={() => setExpandedId(null)}>
              Close details
            </button>
          </aside>
        )}
      </div>
    </section>
  );
}
