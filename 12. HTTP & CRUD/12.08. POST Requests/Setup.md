# 12.08 setup

Open the supplied previous lecture’s completed employee-directory in VS Code on Windows. Run npm ci for a clean copy. Run npm run api in one PowerShell terminal and npm run dev in another. API data is in memory and resets on restart. Use the prepared Styles/employee-directory.css for the visual layout. The employee-directory folder here is the completed checkpoint; type only the named lesson changes live.

Practice reset: from the browser Console on the React app origin, send `const resetResponse = await fetch("/api/employees/reset", { method: "POST" });` then `await resetResponse.json();`. This discards practice changes and returns the three seeded records. Reload the app after success to fetch the restored list. This is introduced after the first successful create demonstration.
