import { useShallow } from "zustand/react/shallow";
import { useWorkspaceStore } from "../workspaceStore";

export function WorkspaceStatus() {
  const { density, summaryOpen } = useWorkspaceStore(useShallow((state) => ({
    density: state.density,
    summaryOpen: state.summaryOpen,
  })));
  return <p className="mt-3 text-sm text-muted-foreground">Display: {density} rows · overview {summaryOpen ? "shown" : "hidden"}</p>;
}
