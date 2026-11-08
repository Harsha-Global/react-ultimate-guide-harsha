import { z } from "zod";

const previousSchema = z.object({ density: z.enum(["comfortable", "compact"]), summaryOpen: z.boolean() });
export const preferenceSchema = previousSchema.extend({
  locale: z.enum(["en-US", "en-IN", "de-DE"]),
  zone: z.enum(["UTC", "Asia/Kolkata", "America/New_York"]),
});
export type WorkspacePreferences = z.infer<typeof preferenceSchema>;
export const initialPreferences: WorkspacePreferences = { density: "comfortable", summaryOpen: true, locale: "en-US", zone: "UTC" };
const legacySchema = z.object({ dense: z.boolean(), summaryOpen: z.boolean() });
export function readPreferences(value: unknown): WorkspacePreferences {
  const result = preferenceSchema.safeParse(value);
  return result.success ? result.data : { ...initialPreferences };
}
export function migratePreferences(value: unknown, version: number): WorkspacePreferences {
  if (version === 1) {
    const result = previousSchema.safeParse(value);
    if (result.success) return { ...initialPreferences, ...result.data };
  }
  if (version === 0) {
    const result = legacySchema.safeParse(value);
    if (result.success) return { ...initialPreferences, density: result.data.dense ? "compact" : "comfortable", summaryOpen: result.data.summaryOpen };
  }
  return { ...initialPreferences };
}
