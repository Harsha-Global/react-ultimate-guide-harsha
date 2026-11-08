import { useState } from "react";
import { getHealth } from "./api";
export default function App() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  async function check() {
    setPending(true);
    try {
      await getHealth();
      setMessage("The local membership service is ready.");
    } catch {
      setMessage("The local service is unavailable. Start it, then try again.");
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
            <span className="status-pill">Member portal</span>
            <h2>Start with a connection.</h2>
            <p>
              Check the supplied local service before connecting the sign-in and
              account screens.
            </p>
            <button onClick={check} disabled={pending}>
              {pending ? "Checking…" : "Check local service"}
            </button>
            <p role="status">{message}</p>
            <div className="chapter">
              <h3>Two different questions</h3>
              <p>Authentication: who is signed in?</p>
              <p>Authorization: what can they access?</p>
            </div>
          </section>
        </div>
      </main>
      <footer>
        Cedar Club · A local course example · Sample accounts and details only
      </footer>
    </>
  );
}
