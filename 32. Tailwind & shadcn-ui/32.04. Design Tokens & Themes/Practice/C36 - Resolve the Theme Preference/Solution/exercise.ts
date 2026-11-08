type ThemePreference = "system" | "light" | "dark";
type ThemeResult = { preference: ThemePreference; resolved: "light" | "dark" };
function resolveThemePreference(saved: unknown, systemDark: boolean): ThemeResult {
  const preference: ThemePreference = saved === "light" || saved === "dark" ? saved : "system";
  const resolved = preference === "system" ? (systemDark ? "dark" : "light") : preference;
  return { preference, resolved };
}
