import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { useWorkspaceStore } from "../workspaceStore";
import { storageHealth } from "../preferenceStorage";
import { Button } from "./ui/button";

function subscribe(notify: () => void) {
  const stops = [useWorkspaceStore.persist.onHydrate(notify), useWorkspaceStore.persist.onFinishHydration(notify), storageHealth.subscribe(notify)];
  return () => stops.forEach((stop) => stop());
}
function snapshot() {
  return storageHealth.getSnapshot() ?? (useWorkspaceStore.persist.hasHydrated() ? "ready" : "loading");
}
export function restorePreferences() {
  storageHealth.report(null);
  return useWorkspaceStore.persist.rehydrate();
}
export function PreferenceBoundary({ children }: { children: ReactNode }) {
  const status = useSyncExternalStore(subscribe, snapshot, () => "loading");
  if (status === "loading") return <p role="status" className="p-8">Restoring workspace preferences…</p>;
  return <>
    {status === "restore" && <div className="bg-warning-surface p-4 text-warning" role="alert">
      <p>Saved display preferences could not be restored. This workspace is using its current in-memory choices.</p>
      <Button type="button" variant="outline" className="mt-3" onClick={() => {
        useWorkspaceStore.getState().resetPreferences();
        void restorePreferences();
      }}>Use default display</Button>
    </div>}
    {status === "save" && <p role="alert" className="bg-warning-surface p-4 text-warning">Display changes work for this visit, but could not be saved. Try the preference again after storage becomes available.</p>}
    {children}
  </>;
}
