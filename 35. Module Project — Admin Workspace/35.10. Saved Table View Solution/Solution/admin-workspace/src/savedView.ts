import { z } from "zod";
export const savedViewSchema = z.object({
  density: z.enum(["comfortable", "compact"]),
  q: z.string().max(60),
  sort: z.enum(["", "name", "category", "priceMinor", "stock"]),
  dir: z.enum(["asc", "desc"]),
  size: z.union([z.literal(2), z.literal(4)]),
});
export type SavedView = z.infer<typeof savedViewSchema>;
export function readSavedView(value: unknown): SavedView | null {
  const result = savedViewSchema.safeParse(value);
  return result.success ? result.data : null;
}
export function viewUpdate(saved: SavedView) {
  const { q, sort, dir, size } = saved;
  return { q, sort, dir, size, page: 1 };
}
export function migrateSavedView(payload: unknown, version: number) {
  if (version === 1 && payload && typeof payload === "object" && "saved" in payload) {
    const old = payload.saved;
    if (old && typeof old === "object") return { saved: readSavedView({ ...old, density: "comfortable" }) };
  }
  return { saved: null };
}

export function shouldRestoreSavedView(search: string): boolean {
  const params = new URLSearchParams(search);
  return !["q", "sort", "dir", "page", "size"].some((key) => params.has(key));
}
