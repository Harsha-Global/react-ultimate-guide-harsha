import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e", workers: 1, fullyParallel: false,
  use: { baseURL: "http://127.0.0.1:5185", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    { command: "npm run api", url: "http://127.0.0.1:4185/api/health", reuseExistingServer: false },
    { command: "npm run dev", url: "http://127.0.0.1:5185", reuseExistingServer: false },
  ],
});
