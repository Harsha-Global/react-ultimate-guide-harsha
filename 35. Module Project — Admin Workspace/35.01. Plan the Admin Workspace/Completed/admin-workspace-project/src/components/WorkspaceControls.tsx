import { useWorkspaceStore } from "../workspaceStore";
import { DensityControl } from "./DensityControl";
import { Button } from "./ui/button";

export function WorkspaceControls() {
  const summaryOpen = useWorkspaceStore((state) => state.summaryOpen);
  const toggleSummary = useWorkspaceStore((state) => state.toggleSummary);
  const resetPreferences = useWorkspaceStore((state) => state.resetPreferences);
  return <div className="flex flex-wrap items-center gap-3">
    <DensityControl />
    <Button type="button" variant="outline" aria-expanded={summaryOpen} aria-controls="workspace-summary" onClick={toggleSummary}>
      {summaryOpen ? "Hide overview" : "Show overview"}
    </Button>
    <Button type="button" variant="outline" onClick={resetPreferences}>Reset display</Button>
  </div>;
}
