import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e", workers: 1, fullyParallel: false,
  use: { baseURL: "http://127.0.0.1:5186", trace: "retain-on-failure" },
  projects: [{ name: "production-chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: { command: "npm start", url: "http://127.0.0.1:5186/api/health", reuseExistingServer: false },
});
