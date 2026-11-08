type Preferences = { density: "comfortable" | "compact"; summaryOpen: boolean };
function migratePreferences(saved: unknown, version: number): Preferences {
  if (version === 0 && typeof saved === "object" && saved !== null && !Array.isArray(saved)
      && "dense" in saved && typeof saved.dense === "boolean"
      && "summaryOpen" in saved && typeof saved.summaryOpen === "boolean") {
    return { density: saved.dense ? "compact" : "comfortable", summaryOpen: saved.summaryOpen };
  }
  return { density: "comfortable", summaryOpen: true };
}
