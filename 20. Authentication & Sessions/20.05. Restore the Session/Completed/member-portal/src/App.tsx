import { useState } from "react";
import { AuthForm } from "./AuthForm";
import { useAuth, SessionStatus } from "./Auth";
import { SignOutButton } from "./SignOutButton";
export default function App() {
  const auth = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header>
        <div className="inner">
          <a className="brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              ✦
            </span>
            cedar club.
          </a>
          <nav aria-label="Membership">
            {auth.state.status === "authenticated" && (
              <>
                <span>{auth.state.user.name}</span>
                <SignOutButton />
              </>
            )}
          </nav>
        </div>
      </header>
      <main id="main">
        {auth.state.status === "checking" || auth.state.status === "error" ? (
          <SessionStatus />
        ) : auth.state.status === "authenticated" ? (
          <section className="empty">
            <p className="eyebrow">Welcome to Cedar Club</p>
            <h1>
              You’re signed in,
              <br />
              {auth.state.user.name}.
            </h1>
            <p>{auth.state.user.email}</p>
            <span className="status-pill">
              {auth.state.user.role === "admin" ? "Staff account" : "Member account"}
            </span>
          </section>
        ) : (
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
              <AuthForm key={mode} mode={mode} onSession={auth.acceptSession} />
              <button className="inline-link" onClick={() => setMode(mode === "login" ? "register" : "login")}>
                {mode === "login"
                  ? "Create a practice account"
                  : "Already a member? Sign in"}
              </button>
            </div>
          </div>
        )}
      </main>
      <footer>
        Cedar Club · A local course example · Sample accounts and details only
      </footer>
    </>
  );
}
