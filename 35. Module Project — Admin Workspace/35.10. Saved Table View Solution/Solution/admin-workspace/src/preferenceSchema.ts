import { z } from "zod";

export const preferenceSchema = z.object({
  density: z.enum(["comfortable", "compact"]),
  summaryOpen: z.boolean(),
});
export type WorkspacePreferences = z.infer<typeof preferenceSchema>;
export const initialPreferences: WorkspacePreferences = { density: "comfortable", summaryOpen: true };
const legacySchema = z.object({ dense: z.boolean(), summaryOpen: z.boolean() });

export function readPreferences(value: unknown): WorkspacePreferences {
  const result = preferenceSchema.safeParse(value);
  return result.success ? result.data : { ...initialPreferences };
}
export function migratePreferences(value: unknown, version: number): WorkspacePreferences {
  if (version === 0) {
    const result = legacySchema.safeParse(value);
    if (result.success) return { density: result.data.dense ? "compact" : "comfortable", summaryOpen: result.data.summaryOpen };
  }
  return { ...initialPreferences };
}
