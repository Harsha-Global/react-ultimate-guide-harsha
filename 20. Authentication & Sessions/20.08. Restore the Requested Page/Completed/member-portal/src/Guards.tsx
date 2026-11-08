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
