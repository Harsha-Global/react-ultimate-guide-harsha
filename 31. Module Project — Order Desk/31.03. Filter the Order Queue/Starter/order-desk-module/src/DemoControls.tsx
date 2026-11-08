import { useState } from "react";
export function DemoControls() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function send(path: "change" | "expire") {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`/api/demo/${path}`, { method: "POST" });
      if (!response.ok) throw Error();
      setMessage(
        path === "expire"
          ? "Session expired. Refresh the queue to see the session check."
          : "The service changed OD-1041. Observe the subscribed view.",
      );
    } catch {
      setMessage("Demo action failed. Check the API and retry.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="queue" aria-label="Local demo controls">
      <h2>Local service controls</h2>
      <p>
        These buttons simulate another operator and an expired demo session.
      </p>
      <button
        className="secondary"
        disabled={busy}
        onClick={() => send("change")}
      >
        Change first order on server
      </button>{" "}
      <button
        className="secondary"
        disabled={busy}
        onClick={() => send("expire")}
      >
        Expire demo session
      </button>
      <p role="status">{message}</p>
    </section>
  );
}
