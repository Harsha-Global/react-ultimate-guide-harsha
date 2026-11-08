import { useState } from "react";
import type { User, Session } from "../shared/authSchema";
import { AuthForm } from "./AuthForm";
import { logout } from "./api";
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function acceptSession(session: Session) {
    setUser(session.user);
  }
  async function signOut() {
    setPending(true);
    setError("");
    try {
      await acceptSession(await logout());
    } catch {
      setError("We couldn’t sign out. Please try again.");
    } finally {
      setPending(false);
    }
  }
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
        </div>
      </header>
      <main id="main">
        {user ? (
          <section className="empty">
            <p className="eyebrow">Welcome to Cedar Club</p>
            <h1>
              You’re signed in,
              <br />
              {user.name}.
            </h1>
            <p>{user.email}</p>
            <span className="status-pill">
              {user.role === "admin" ? "Staff account" : "Member account"}
            </span>
            {error && (
              <p role="alert" className="notice">
                {error}
              </p>
            )}
            <div className="actions">
              <button disabled={pending} onClick={signOut}>
                {pending ? "Signing out…" : "Sign out"}
              </button>
            </div>
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
              <AuthForm onSession={acceptSession} />

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
