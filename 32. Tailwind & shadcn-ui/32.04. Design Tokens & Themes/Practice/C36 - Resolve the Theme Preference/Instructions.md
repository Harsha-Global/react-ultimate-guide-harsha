# Resolve the Theme Preference

The workspace offers System, Light and Dark. Repair resolveThemePreference so it keeps the saved intention separate from the color displayed now. The saved argument is untrusted storage data. The systemDark boolean describes the current device preference.

Accept only the exact strings "system", "light" and "dark". Any other value must become "system". Return an object with preference containing that validated choice and resolved containing either "light" or "dark". Explicit light/dark overrides the system. For system, resolve dark when systemDark is true and light when it is false. Never replace a system preference with its currently resolved color.

Example: resolveThemePreference("system", true) returns { preference: "system", resolved: "dark" }. Calling the function later with the saved preference and false must resolve light. The function should not read local storage, change the DOM or modify its arguments. Keep the supplied types and function name.

Attempt the repair before viewing the solution. The matching strict local Starter and Solution are in Practice/C36 - Resolve the Theme Preference through the source-code route explained in the How to Download Source Code article lecture. Run npm ci, then npm test in either separate folder.
