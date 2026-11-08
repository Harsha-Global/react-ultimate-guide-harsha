import { expect, it, vi } from "vitest";
import { findNonSerializableValue } from "@reduxjs/toolkit";
import { makeStore } from "../src/app/store";
import { orderToggled } from "../src/features/selection/selectionSlice";
it("keeps the real action and resulting state serializable", () => {
  const store = makeStore();
  const action = orderToggled("OD-1041");
  store.dispatch(action);
  expect(findNonSerializableValue(action)).toBe(false);
  expect(findNonSerializableValue(store.getState())).toBe(false);
});
it("reports a Date value but accepts its ISO text representation", () => {
  const when = new Date("2026-10-03T09:00:00.000Z");
  expect(findNonSerializableValue({ reviewedAt: when })).toMatchObject({ keyPath: "reviewedAt" });
  expect(findNonSerializableValue({ reviewedAt: when.toISOString() })).toBe(false);
});
it("keeps the default development middleware warning enabled", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    const store = makeStore();
    store.dispatch({ type: "demo/dateReceived", payload: new Date("2026-10-03T09:00:00.000Z") });
    expect(error).toHaveBeenCalled();
    console.info("Captured expected development warning:", String(error.mock.calls[0]?.[0]));
    expect(String(error.mock.calls[0]?.[0])).toContain("non-serializable");
    expect(store.getState().selection.selectedIds).toEqual([]);
  } finally {
    error.mockRestore();
  }
});
