import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { afterEach, expect, it, vi } from "vitest";
import { App } from "../src/App";
import { makeStore } from "../src/app/store";
import { preferencesReset, showTotalsChanged } from "../src/features/preferences/preferencesSlice";
import { loadShowTotals, PREFERENCES_KEY } from "../src/features/preferences/storage";
afterEach(() => { cleanup(); localStorage.clear(); vi.useRealTimers(); });
it("hides and restores the total column through the actual control", async () => {
  const user = userEvent.setup(); render(<Provider store={makeStore(null)}><App /></Provider>);
  const control = screen.getByRole("checkbox", {name:"Show order totals"});
  expect(screen.getByRole("columnheader",{name:"Total"})).toBeInTheDocument();
  await user.click(control); expect(screen.queryByRole("columnheader",{name:"Total"})).not.toBeInTheDocument();
  await user.click(control); expect(screen.getByRole("columnheader",{name:"Total"})).toBeInTheDocument();
});
it("saves false and restores it without persisting other state", async () => {
  vi.useFakeTimers(); const store=makeStore(localStorage); store.dispatch(showTotalsChanged(false)); await vi.advanceTimersByTimeAsync(600);
  expect(makeStore(localStorage).getState().preferences.showTotals).toBe(false);
  expect(Object.keys(JSON.parse(localStorage.getItem(PREFERENCES_KEY)!)).sort()).toEqual(["density","showTotals","version"]);
});
it("reset cancels a delayed totals save", async () => {
  vi.useFakeTimers(); const store=makeStore(localStorage); store.dispatch(showTotalsChanged(false)); store.dispatch(preferencesReset()); await vi.advanceTimersByTimeAsync(700);
  expect(localStorage.getItem(PREFERENCES_KEY)).toBeNull(); expect(store.getState().preferences.showTotals).toBe(true);
});
it.each(['{"version":1,"showTotals":"false"}','{"version":2,"showTotals":false}','invalid','{"version":1,"density":"compact"}'])("uses true for invalid or old totals field %s",raw=>{localStorage.setItem(PREFERENCES_KEY,raw);expect(loadShowTotals(localStorage)).toBe(true);});
