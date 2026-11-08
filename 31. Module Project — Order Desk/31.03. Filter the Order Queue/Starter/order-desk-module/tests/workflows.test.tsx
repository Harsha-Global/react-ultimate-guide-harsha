import { orders } from "../src/orders";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { afterAll, afterEach, beforeAll, expect, it, vi } from "vitest";
import { delay, http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { makeStore } from "../src/app/store";
import { PackingPreview } from "../src/PackingPreview";
import { orderToggled } from "../src/features/selection/selectionSlice";
import { selectReady } from "../src/features/selection/selectReady";
import { preparePacking } from "../src/features/preview/previewSlice";
import {
  densityChanged,
  preferencesReset,
} from "../src/features/preferences/preferencesSlice";
import {
  loadDensity,
  PREFERENCES_KEY,
} from "../src/features/preferences/storage";

const endpoint = "http://127.0.0.1:5188/api/packing-preview";
const server = setupServer(
  http.post(endpoint, () =>
    HttpResponse.json({
      count: 1,
      message: "Packing preview prepared for 1 order.",
    }),
  ),
);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
  vi.useRealTimers();
});
afterAll(() => server.close());

it("adds only missing ready orders without toggling an existing selection off", () => {
  const store = makeStore(null);
  store.dispatch(orderToggled("OD-1041"));
  store.dispatch(selectReady(orders));
  store.dispatch(selectReady(orders));
  expect(store.getState().selection.selectedIds).toEqual([
    "OD-1041",
    "OD-1043",
    "OD-1045",
  ]);
});
it("shows a rejected preview and recovers after retry with a real store", async () => {
  server.use(
    http.post(endpoint, () =>
      HttpResponse.json(
        { message: "Choose ready orders only." },
        { status: 422 },
      ),
    ),
  );
  const store = makeStore(null);
  store.dispatch(orderToggled("OD-1041"));
  const user = userEvent.setup();
  render(
    <Provider store={store}>
      <PackingPreview />
    </Provider>,
  );
  await user.click(screen.getByRole("button", { name: "Prepare preview" }));
  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Choose ready orders only.",
  );
  server.resetHandlers();
  await user.click(screen.getByRole("button", { name: "Prepare preview" }));
  expect(
    await screen.findByText("Review 1 order before packing."),
  ).toBeInTheDocument();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});
it("returns a rejection action but makes unwrap reject a domain error", async () => {
  server.use(
    http.post(endpoint, () =>
      HttpResponse.json({ message: "Not ready." }, { status: 422 }),
    ),
  );
  const request = makeStore(null).dispatch(preparePacking(["OD-1042"]));
  await expect(request).resolves.toMatchObject({
    type: preparePacking.rejected.type,
    payload: "Not ready.",
  });
  await expect(request.unwrap()).rejects.toBe("Not ready.");
});
it("cancels an in-flight request without showing it as a server failure", async () => {
  server.use(
    http.post(endpoint, async () => {
      await delay(100);
      return HttpResponse.json({ count: 1, message: "Obsolete" });
    }),
  );
  const store = makeStore(null);
  const request = store.dispatch(preparePacking(["OD-1041"]));
  request.abort();
  const result = await request;
  expect(result.meta).toMatchObject({ aborted: true });
  expect(store.getState().preview).toMatchObject({
    status: "idle",
    result: null,
    error: "",
  });
});
it("ignores both older success and older failure actions", () => {
  const store = makeStore(null);
  store.dispatch(preparePacking.pending("old", ["OD-1041"]));
  store.dispatch(preparePacking.pending("new", ["OD-1043"]));
  store.dispatch(
    preparePacking.fulfilled({ count: 1, message: "Old" }, "old", [
      "OD-1041",
    ]),
  );
  store.dispatch(
    preparePacking.rejected(new Error("Old failure"), "old", ["OD-1041"]),
  );
  expect(store.getState().preview).toMatchObject({
    status: "pending",
    requestId: "new",
    result: null,
    error: "",
  });
  store.dispatch(
    preparePacking.fulfilled({ count: 1, message: "Latest" }, "new", [
      "OD-1043",
    ]),
  );
  expect(store.getState().preview.result?.message).toBe("Latest");
});
it("saves only the latest density after the quiet interval", async () => {
  vi.useFakeTimers();
  const store = makeStore(localStorage);
  store.dispatch(densityChanged("compact"));
  await vi.advanceTimersByTimeAsync(300);
  store.dispatch(densityChanged("comfortable"));
  await vi.advanceTimersByTimeAsync(599);
  expect(localStorage.getItem(PREFERENCES_KEY)).toBeNull();
  await vi.advanceTimersByTimeAsync(1);
  expect(JSON.parse(localStorage.getItem(PREFERENCES_KEY)!)).toEqual({
    version: 1,
    density: "comfortable",
  });
});
it("reset cancels a pending save and does not recreate the removed key", async () => {
  vi.useFakeTimers();
  const store = makeStore(localStorage);
  store.dispatch(densityChanged("compact"));
  store.dispatch(preferencesReset());
  await vi.advanceTimersByTimeAsync(1000);
  expect(localStorage.getItem(PREFERENCES_KEY)).toBeNull();
  expect(store.getState().preferences.density).toBe("comfortable");
});
it("restores a validated preference without restoring a selected order", () => {
  localStorage.setItem(
    PREFERENCES_KEY,
    JSON.stringify({
      version: 1,
      density: "compact",
      selectedIds: ["OD-1041"],
    }),
  );
  const store = makeStore(localStorage);
  expect(store.getState().preferences.density).toBe("compact");
  expect(store.getState().selection.selectedIds).toEqual([]);
});
it.each([
  "not-json",
  '{"version":9,"density":"compact"}',
  '{"version":1,"density":"tiny"}',
  "null",
])("uses the safe default for %s", (raw) => {
  localStorage.setItem(PREFERENCES_KEY, raw);
  expect(loadDensity(localStorage)).toBe("comfortable");
});
it("keeps the app usable when browser storage is unavailable", async () => {
  vi.useFakeTimers();
  const store = makeStore(null);
  store.dispatch(densityChanged("compact"));
  await vi.advanceTimersByTimeAsync(600);
  expect(store.getState().preferences).toEqual({
    density: "compact",
    saveStatus: "Could not save on this browser",
  });
});
