import { z } from "zod";
export const savedViewSchema = z.object({
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
export function viewUpdate(saved: SavedView) { return { ...saved, page: 1 }; }

export function shouldRestoreSavedView(search: string): boolean {
  const params = new URLSearchParams(search);
  return !["q", "sort", "dir", "page", "size"].some((key) => params.has(key));
}
