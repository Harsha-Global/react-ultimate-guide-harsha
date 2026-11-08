import { Navigate, Outlet } from "react-router";
import { useAuth, SessionStatus } from "./Auth";
export function RequireSession() {
  const { state } = useAuth();
  if (state.status === "checking" || state.status === "error")
    return <SessionStatus />;
  if (state.status === "anonymous") return <Navigate replace to="/login" />;
  return <Outlet />;
}
