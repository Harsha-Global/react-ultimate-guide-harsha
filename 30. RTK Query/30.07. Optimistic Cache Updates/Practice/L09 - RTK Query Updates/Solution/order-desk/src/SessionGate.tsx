import { useState } from "react";
import type { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  sessionBoundary,
  workspaceEntered,
} from "./features/session/sessionSlice";
import type { Workspace } from "./features/session/sessionSlice";
export function SessionGate({ children }: { children: ReactNode }) {
  const workspace = useAppSelector((s) => s.session.workspace);
  const dispatch = useAppDispatch();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function enter(next: Workspace | null) {
    if (busy) return;
    setBusy(true);
    setMessage("");
    dispatch(sessionBoundary());
    try {
      const response = await fetch("/api/session", {
        method: next ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: next ? JSON.stringify({ workspace: next }) : undefined,
      });
      const data: unknown = await response.json();
      if (
        !response.ok ||
        !data ||
        typeof data !== "object" ||
        !("workspace" in data) ||
        data.workspace !== next
      )
        throw Error("Workspace selection failed.");
      if (next) dispatch(workspaceEntered(next));
    } catch {
      setMessage("Cannot open the demo workspace. Check the API and retry.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <section className="queue" aria-label="Demo session">
        <h2>
          {workspace
            ? `${workspace === "north" ? "North" : "South"} studio`
            : "Choose a demo workspace"}
        </h2>
        <p>
          This local session demonstrates private-cache boundaries. It is not a
          production sign-in system.
        </p>
        <button disabled={busy} onClick={() => enter("north")}>
          Open North
        </button>{" "}
        <button disabled={busy} onClick={() => enter("south")}>
          Open South
        </button>{" "}
        <button
          className="secondary"
          disabled={busy || !workspace}
          onClick={() => enter(null)}
        >
          Sign out
        </button>
        {busy && <p role="status">Changing workspace…</p>}
        {message && <p role="alert">{message}</p>}
      </section>
      {workspace && !busy ? children : null}
    </>
  );
}
