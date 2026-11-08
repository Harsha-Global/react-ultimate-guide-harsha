type Preferences = { density: "comfortable" | "compact"; summaryOpen: boolean };
function migratePreferences(saved: unknown, version: number): Preferences {
  // Complete the legacy-format validation and translation.
  return { density: "comfortable", summaryOpen: true };
}
