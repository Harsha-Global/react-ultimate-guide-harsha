// Isolated, read-only experiments for the advanced lecture. Not called by App.
import { apiClient } from "./apiClient";
export function demonstrateTimeout() {
  return apiClient.get<unknown>("/employees/e1", { params: { delay: 1200 }, timeout: 150 });
}
export function healthViaFetch() {
  return apiClient.get<unknown>("/health", { adapter: "fetch" });
}
