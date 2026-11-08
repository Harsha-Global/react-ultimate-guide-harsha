import { lazy, Suspense, useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router";
import { ErrorBoundary } from "./ErrorBoundary";
import type { Order } from "../shared/orderSchema";
const DeliveryHelp = lazy(() => import("./DeliveryHelp"));
export function OrderConfirmation({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  return <section className="member-panel">
    <h1 tabIndex={-1}>Your practice order is confirmed.</h1>
    <p role="status">Order {order.id}. Your bag has been cleared.</p>
    <p>Total: ${(order.subtotal + order.deliveryFee).toFixed(2)}</p>
    <p>No payment was collected.</p>
    <p><Link to="/orders">View my orders</Link></p>
    <button type="button" onClick={() => setOpen(true)}>Delivery information</button>
    {open && <DeliveryDialog onClose={() => setOpen(false)} />}
  </section>;
}
function DeliveryDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    element?.showModal();
    return () => {
      element?.close();
      previous?.focus();
    };
  }, []);
  return <dialog className="member-dialog" ref={dialog} aria-labelledby={titleId} onCancel={event => { event.preventDefault(); onClose(); }}>
    <h2 id={titleId}>Delivery information</h2>
    <ErrorBoundary fallback={<p role="alert">Delivery help is unavailable. Your order is still confirmed. Close this panel and check your order history.</p>}>
      <Suspense fallback={<p role="status">Loading delivery information…</p>}>
        <DeliveryHelp />
      </Suspense>
    </ErrorBoundary>
    <button type="button" autoFocus onClick={onClose}>Close delivery information</button>
  </dialog>;
}