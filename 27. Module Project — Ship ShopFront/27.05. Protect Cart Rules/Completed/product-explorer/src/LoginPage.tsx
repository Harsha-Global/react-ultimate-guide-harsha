import { Navigate, useSearchParams } from "react-router";
import { AuthForm } from "./AuthForm";
import { useAuth, SessionStatus } from "./Auth";
import { safeReturnTo } from "./safeReturnTo";
export default function LoginPage() {
    const { state, acceptSession } = useAuth();
    const [params] = useSearchParams();
    const target = safeReturnTo(params.get("returnTo"));
    if (state.status === "checking" || state.status === "error")
        return <SessionStatus />;
    if (state.status === "authenticated")
        return <Navigate replace to={target}/>;
    return <section className="member-layout"><div><p className="eyebrow">Your ShopFront account</p><h1 tabIndex={-1}>Welcome back.</h1><p>Sign in to continue. Your bag stays with you.</p>{state.message && <p role="status">{state.message}</p>}<p className="muted">Practice accounts: jordan@example.com or rebecca@example.com. Password: PracticeOnly42!</p></div><AuthForm mode="login" onSession={acceptSession}/></section>;
}
