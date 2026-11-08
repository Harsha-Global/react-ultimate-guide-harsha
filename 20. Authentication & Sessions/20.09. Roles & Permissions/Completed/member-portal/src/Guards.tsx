import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth, SessionStatus } from "./Auth";
export function RequireSession() {
  const { state } = useAuth();
  const location = useLocation();
  if (state.status === "checking" || state.status === "error")
    return <SessionStatus />;
  if (state.status === "anonymous") {
    const target = location.pathname + location.search + location.hash;
    return (
      <Navigate replace to={"/login?returnTo=" + encodeURIComponent(target)} />
    );
  }
  return <Outlet />;
}
export function Forbidden() {
  return (
    <section className="empty">
      <p className="eyebrow">Staff workspace</p>
      <h1>This area needs a staff account.</h1>
      <p>You are still signed in. Your member area remains available.</p>
      <a className="button" href="/account">
        Back to my account
      </a>
    </section>
  );
}
export function RequireAdmin() {
  const { state } = useAuth();
  return state.status === "authenticated" && state.user.role === "admin" ? (
    <Outlet />
  ) : (
    <Forbidden />
  );
}
