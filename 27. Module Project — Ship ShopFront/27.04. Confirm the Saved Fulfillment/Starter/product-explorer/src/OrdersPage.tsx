import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { useAuth } from "./Auth";
import { ApiError } from "./sessionApi";
import { ordersOptions } from "./orderQueries";
export default function OrdersPage() {
    const { state } = useAuth();
    if (state.status !== "authenticated")
        return null;
    return <OrderHistory key={state.user.id} userId={state.user.id}/>;
}
function OrderHistory({ userId }: {
    userId: string;
}) {
    const { getVersion, expireIfCurrent } = useAuth();
    const version = getVersion();
    const query = useQuery(ordersOptions(userId));
    const expired = query.error instanceof ApiError && query.error.status === 401;
    useEffect(() => { if (expired)
        expireIfCurrent(version); }, [expired, expireIfCurrent, version]);
    if (expired)
        return <p role="status">Your session has ended. Returning to sign in…</p>;
    return <section><div className="page-heading"><p className="eyebrow">Your ShopFront account</p><h1 tabIndex={-1}>Your orders.</h1><p>A record of the things you chose.</p></div>
    {query.isPending && <p role="status">Loading your orders…</p>}
    {query.isError && <div role="alert"><p>We couldn’t load your latest orders.</p><button disabled={query.isFetching} onClick={() => void query.refetch()}>Try again</button></div>}
    {query.data?.length === 0 && <div className="empty-state"><h2>No orders yet.</h2><Link to="/">Explore the collection</Link></div>}
    <div className="order-grid">{query.data?.map(order => <article className="member-panel" key={order.id}><span className="eyebrow">Order {order.id}</span><h2>{new Date(order.createdAt).toLocaleDateString("en-US")}</h2><ul>{order.lines.map(line => <li key={line.name}>{line.name} × {line.quantity}</li>)}</ul><dl><div><dt>Total</dt><dd>${(order.subtotal + order.deliveryFee).toFixed(2)}</dd></div></dl>{order.note && <p>Note: {order.note}</p>}</article>)}</div>
  </section>;
}
