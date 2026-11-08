import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
import { AuthForm } from "./AuthForm";
import { useAuth, SessionStatus } from "./Auth";
import { safeReturnTo } from "./safeReturnTo";
export function Home() {
  return (
    <div className="hero">
      <section>
        <p className="eyebrow">Good company starts here</p>
        <h1>
          A place for
          <br />
          your next chapter.
        </h1>
        <p className="lead">
          Gather with curious people. Save a plan for the weekend. Make a
          little space for something new.
        </p>
        <div className="art" aria-hidden="true">
          <span className="sun" />
          <span className="hill back" />
          <span className="hill" />
          <span className="quote">Closer to what matters.</span>
        </div>
      </section>
      <section className="card">
        <span className="status-pill">Your membership</span>
        <h2>
          Something to
          <br />
          look forward to.
        </h2>
        <p>Sign in to see your saved gatherings and make your next plan.</p>
        <div className="actions">
          <Link className="button" to="/account">
            Open my account
          </Link>
          <Link className="button secondary" to="/register">
            Join the club
          </Link>
        </div>
      </section>
    </div>
  );
}
export function AuthScreen({ mode }: { mode: "login" | "register" }) {
  const auth = useAuth();
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const destination = safeReturnTo(search.get("returnTo"));
  if (auth.state.status === "checking" || auth.state.status === "error")
    return <SessionStatus />;
  if (auth.state.status === "authenticated")
    return <Navigate replace to={destination} />;
  const alternate =
    (mode === "login" ? "/register" : "/login") +
    "?returnTo=" +
    encodeURIComponent(destination);
  return (
    <div className="hero">
      <section>
        <p className="eyebrow">Good company starts here</p>
        <h1>
          A place for
          <br />
          your next chapter.
        </h1>
        <p className="lead">
          Gather with curious people. Save a plan for the weekend. Make a
          little space for something new.
        </p>
        <div className="art" aria-hidden="true">
          <span className="sun" />
          <span className="hill back" />
          <span className="hill" />
          <span className="quote">Closer to what matters.</span>
        </div>
      </section>
      <div>
        {auth.state.message && (
          <p className="notice" role="status">
            {auth.state.message}
          </p>
        )}
        <AuthForm key={mode} mode={mode} onSession={async (session) => {
          await auth.acceptSession(session);
          navigate(destination, { replace: true });
        }} />
        <p>
          <Link to={alternate}>
            {mode === "login"
              ? "Create a practice account"
              : "Already a member? Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
}
export function NotFound() {
  return (
    <section className="empty">
      <h1>We couldn’t find that page.</h1>
      <Link className="button" to="/">
        Back to Cedar Club
      </Link>
    </section>
  );
}
