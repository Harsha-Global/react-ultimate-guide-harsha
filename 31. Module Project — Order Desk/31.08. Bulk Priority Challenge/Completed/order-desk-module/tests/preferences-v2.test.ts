import { afterEach, expect, test, vi } from "vitest";
import { makeStore } from "../src/app/store";
import {
  loadPreferences,
  PREFERENCES_KEY,
} from "../src/features/preferences/storage";
import {
  defaultStatusChanged,
  densityChanged,
  preferencesReset,
} from "../src/features/preferences/preferencesSlice";
import { orderToggled } from "../src/features/selection/selectionSlice";
afterEach(() => {
  localStorage.clear();
  vi.useRealTimers();
});
test("reads a v1 density and supplies the new default without rewriting during load", () => {
  const raw = JSON.stringify({
    version: 1,
    density: "compact",
    selectedIds: ["private"],
  });
  localStorage.setItem(PREFERENCES_KEY, raw);
  expect(loadPreferences(localStorage)).toEqual({
    density: "compact",
    defaultStatus: "all",
  });
  expect(localStorage.getItem(PREFERENCES_KEY)).toBe(raw);
});
test("restores a valid v2 record and ignores extra private fields", () => {
  localStorage.setItem(
    PREFERENCES_KEY,
    JSON.stringify({
      version: 2,
      density: "compact",
      defaultStatus: "ready",
      selectedIds: ["private"],
    }),
  );
  const store = makeStore(localStorage);
  expect(store.getState().preferences.defaultStatus).toBe("ready");
  expect(store.getState().selection.selectedIds).toEqual([]);
});
test.each([
  null,
  { version: 2, density: "compact", defaultStatus: "urgent" },
  { version: 3, density: "compact", defaultStatus: "ready" },
  { version: 2, density: "tiny", defaultStatus: "ready" },
])("rejects invalid or unknown records: %j", (value) => {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(value));
  expect(loadPreferences(localStorage)).toEqual({
    density: "comfortable",
    defaultStatus: "all",
  });
});
test("saves the latest allowlisted fields in v2, then reset cancels another queued save", async () => {
  vi.useFakeTimers();
  const store = makeStore(localStorage);
  store.dispatch(orderToggled("OD-1041"));
  store.dispatch(densityChanged("compact"));
  await vi.advanceTimersByTimeAsync(200);
  store.dispatch(defaultStatusChanged("ready"));
  await vi.advanceTimersByTimeAsync(600);
  expect(JSON.parse(localStorage.getItem(PREFERENCES_KEY)!)).toEqual({
    version: 2,
    density: "compact",
    defaultStatus: "ready",
  });
  store.dispatch(defaultStatusChanged("shipped"));
  store.dispatch(preferencesReset());
  await vi.advanceTimersByTimeAsync(1000);
  expect(localStorage.getItem(PREFERENCES_KEY)).toBeNull();
  expect(store.getState().preferences.defaultStatus).toBe("all");
});
