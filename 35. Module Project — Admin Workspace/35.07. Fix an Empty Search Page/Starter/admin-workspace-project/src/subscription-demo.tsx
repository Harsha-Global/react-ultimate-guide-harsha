import { Profiler, StrictMode } from "react";
import type { ProfilerOnRenderCallback } from "react";
import { createRoot } from "react-dom/client";
import { useShallow } from "zustand/react/shallow";
import { useWorkspaceStore } from "./workspaceStore";
import "./index.css";

const report: ProfilerOnRenderCallback = (id, phase) => console.info(`[subscription-demo] ${id}: ${phase}`);
function DensityBadge() {
  const density = useWorkspaceStore((state) => state.density);
  return <p>Density-only subscription: <strong>{density}</strong></p>;
}
function WholeStoreBadge() {
  const state = useWorkspaceStore();
  return <p>Whole-store subscription: <strong>{state.density}</strong></p>;
}
function PreferenceBadge() {
  const preference = useWorkspaceStore(useShallow((state) => ({ density: state.density, summaryOpen: state.summaryOpen })));
  return <p>Two-field subscription: <strong>{preference.density}, overview {preference.summaryOpen ? "shown" : "hidden"}</strong></p>;
}
function Demo() {
  return <main className="min-h-screen bg-background p-8 text-foreground"><div className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-border bg-card p-8">
    <h1 className="text-3xl font-bold">Observe a subscription</h1>
    <p>Open the browser console. Ignore the initial mount messages; compare the update messages after each action.</p>
    <div className="flex flex-wrap gap-3">
      <button className="rounded-lg bg-primary px-4 py-3 text-primary-foreground" onClick={() => useWorkspaceStore.getState().toggleSummary()}>Toggle overview</button>
      <button className="rounded-lg bg-primary px-4 py-3 text-primary-foreground" onClick={() => useWorkspaceStore.getState().setDensity("compact")}>Choose compact</button>
      <button className="rounded-lg border border-input px-4 py-3" onClick={() => useWorkspaceStore.getState().resetPreferences()}>Reset preferences</button>
    </div>
    <Profiler id="density-only" onRender={report}><DensityBadge /></Profiler>
    <Profiler id="whole-store" onRender={report}><WholeStoreBadge /></Profiler>
    <Profiler id="two-fields" onRender={report}><PreferenceBadge /></Profiler>
    <p>The parent does not subscribe. This comparison isolates store-driven updates; props and parent renders remain separate reasons to render.</p>
  </div></main>;
}
createRoot(document.getElementById("root")!).render(<StrictMode><Demo /></StrictMode>);
