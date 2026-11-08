type SavedView = { q: string; sort: "" | "name" | "category" | "priceMinor" | "stock"; dir: "asc" | "desc"; size: 2 | 4 };
function readSavedView(value: unknown): SavedView | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  if (!("q" in value) || typeof value.q !== "string" || value.q.length > 60) return null;
  if (!("sort" in value) || (value.sort !== "" && value.sort !== "name" && value.sort !== "category" && value.sort !== "priceMinor" && value.sort !== "stock")) return null;
  if (!("dir" in value) || (value.dir !== "asc" && value.dir !== "desc")) return null;
  if (!("size" in value) || (value.size !== 2 && value.size !== 4)) return null;
  return { q: value.q, sort: value.sort, dir: value.dir, size: value.size };
}
