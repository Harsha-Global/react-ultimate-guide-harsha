type SavedView = { q: string; sort: "" | "name" | "category" | "priceMinor" | "stock"; dir: "asc" | "desc"; size: 2 | 4 };
function readSavedView(value: unknown): SavedView | null {
  // Validate and copy only the four snapshot fields.
  return null;
}
