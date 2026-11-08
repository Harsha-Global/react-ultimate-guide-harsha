import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { OptionPicker } from "../src/OptionPicker";

const options = [
  { id: "morning", label: "Morning" },
  { id: "evening", label: "Evening" },
];

function PickerExample() {
  const [selected, setSelected] = useState("morning");
  return <OptionPicker label="Session" options={options} selectedId={selected} getLabel={option => option.label} onSelect={option => setSelected(option.id)} />;
}

test("selecting Evening changes the pressed button", async () => {
  const user = userEvent.setup();
  render(<PickerExample />);
  expect(screen.getByRole("button", { name: "Morning" })).toHaveAttribute("aria-pressed", "true");
  await user.click(screen.getByRole("button", { name: "Evening" }));
  expect(screen.getByRole("button", { name: "Evening" })).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("button", { name: "Morning" })).toHaveAttribute("aria-pressed", "false");
});