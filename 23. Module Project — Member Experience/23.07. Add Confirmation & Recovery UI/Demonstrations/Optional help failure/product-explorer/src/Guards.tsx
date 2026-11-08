import { Navigate, Outlet, useLocation, useOutletContext, Link } from "react-router";
import { useAuth, SessionStatus } from "./Auth";
export function RequireSession() {
    const { state } = useAuth();
    const location = useLocation();
    const context = useOutletContext();
    if (state.status === "checking" || state.status === "error")
        return <SessionStatus />;
    if (state.status === "anonymous") {
        const target = location.pathname + location.search + location.hash;
        return <Navigate replace to={"/login?returnTo=" + encodeURIComponent(target)}/>;
    }
    return <Outlet context={context} key={state.user.id}/>;
}
export function RequireAdmin() {
    const { state } = useAuth();
    const context = useOutletContext();
    return state.status === "authenticated" && state.user.role === "admin"
        ? <Outlet context={context}/>
        : <section className="empty-state"><h1 tabIndex={-1}>A staff account is required.</h1><p>You are signed in, but inventory changes are for staff.</p><Link to="/">Back to the collection</Link></section>;
}
