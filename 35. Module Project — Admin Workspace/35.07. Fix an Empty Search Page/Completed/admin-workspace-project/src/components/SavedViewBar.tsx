import { useSavedViewStore } from "../savedViewStore";
import type { SavedView } from "../savedView";
import { Button } from "./ui/button";
export function SavedViewBar({ current, onApply }: { current: SavedView; onApply: (view: SavedView) => void }) {
  const saved = useSavedViewStore((state) => state.saved);
  const save = useSavedViewStore((state) => state.save);
  const clear = useSavedViewStore((state) => state.clear);
  return <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4">
    <p className="text-sm font-semibold">Your saved view</p>
    <p className="mt-1 text-sm text-muted-foreground">{saved ? `Search: ${saved.q || "all products"} · Sort: ${saved.sort || "original"} ${saved.sort ? saved.dir : ""} · ${saved.size} rows` : "Save the current search, sorting and page size on this browser."}</p>
    <div className="mt-3 flex flex-wrap gap-2">
      <Button type="button" size="sm" onClick={() => save(current)}>{saved ? "Replace saved view" : "Save this view"}</Button>
      <Button type="button" size="sm" variant="outline" disabled={!saved} onClick={() => { if (saved) onApply(saved); }}>Apply saved view</Button>
      <Button type="button" size="sm" variant="outline" disabled={!saved} onClick={clear}>Forget saved view</Button>
    </div>
    <p className="mt-3 text-xs text-muted-foreground">Opening an address without view parameters restores this snapshot. A shared view takes priority. Applying starts on page one.</p>
  </div>;
}
