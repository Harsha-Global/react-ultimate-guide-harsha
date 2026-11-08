type ThemePreference = "system" | "light" | "dark";
type ThemeResult = { preference: ThemePreference; resolved: "light" | "dark" };
function resolveThemePreference(saved: unknown, systemDark: boolean): ThemeResult {
  // BUG: system becomes a fixed saved color, and explicit choices are ignored.
  const resolved = systemDark ? "dark" : "light";
  return { preference: resolved, resolved };
}
