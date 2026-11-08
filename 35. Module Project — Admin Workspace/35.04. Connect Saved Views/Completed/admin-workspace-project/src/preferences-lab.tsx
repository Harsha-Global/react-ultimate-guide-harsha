import { createRoot } from "react-dom/client";
import { useState } from "react";
import "./index.css";
function Lab() {
  const [message, setMessage] = useState("Choose a fixture, then open the workspace in this tab.");
  function write(value: string | null) {
    if (value === null) localStorage.removeItem("admin-workspace-preferences");
    else localStorage.setItem("admin-workspace-preferences", value);
    setMessage(value === null ? "Preference storage cleared." : "Saved fixture: " + value);
  }
  return <main className="min-h-screen bg-background p-8 text-foreground"><div className="mx-auto max-w-3xl space-y-5 rounded-2xl border border-border bg-card p-8">
    <h1 className="text-3xl font-bold">Preference storage fixtures</h1><p>This local teaching page replaces only this project's preference key. It does not change catalog data.</p>
    <div className="flex flex-wrap gap-3">
      <button className="rounded-lg bg-primary px-4 py-3 text-primary-foreground" onClick={() => write(JSON.stringify({ state: { dense: true, summaryOpen: false }, version: 0 }))}>Load old preferences</button>
      <button className="rounded-lg border border-input px-4 py-3" onClick={() => write(JSON.stringify({ state: { density: "tiny", summaryOpen: "yes" }, version: 1 }))}>Load invalid values</button>
      <button className="rounded-lg border border-input px-4 py-3" onClick={() => write("unreadable-json" )}>Load unreadable JSON</button>
      <button className="rounded-lg border border-input px-4 py-3" onClick={() => write(null)}>Clear preference storage</button>
    </div><p role="status" className="break-all">{message}</p><a href="/" className="inline-block rounded-lg border border-input px-4 py-3 underline">Open workspace</a>
  </div></main>;
}
createRoot(document.getElementById("root")!).render(<Lab />);
