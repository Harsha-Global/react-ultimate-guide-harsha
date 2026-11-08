import { useWorkspaceStore } from "../workspaceStore";

export function DensityControl() {
  const density = useWorkspaceStore((state) => state.density);
  const setDensity = useWorkspaceStore((state) => state.setDensity);
  return <label className="flex items-center gap-2 text-sm">Table density
    <select value={density} onChange={(event) => setDensity(event.target.value === "compact" ? "compact" : "comfortable")} className="min-h-11 rounded-lg border border-input bg-card px-3 focus-visible:outline-2 focus-visible:outline-ring">
      <option value="comfortable">Comfortable</option><option value="compact">Compact</option>
    </select>
  </label>;
}
