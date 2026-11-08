import type { Ref } from "react";

type Session = "morning" | "afternoon";

type Props = {
  value: Session;
  onValueChange: (value: Session) => void;
  onBlur: () => void;
  name: string;
  inputRef: Ref<HTMLInputElement>;
  disabled: boolean;
};

export function SessionPicker({ value, onValueChange, onBlur, name, inputRef, disabled }: Props) {
  return (
    <fieldset onBlur={onBlur}>
      <legend>Workshop session</legend>
      <div className="choice-row">
        <label>
          <input type="radio" value="morning" checked={value === "morning"} onChange={() => onValueChange("morning")} name={name} ref={inputRef} disabled={disabled} />
          Morning · 10:00
        </label>
        <label>
          <input type="radio" value="afternoon" checked={value === "afternoon"} onChange={() => onValueChange("afternoon")} name={name} disabled={disabled} />
          Afternoon · 2:00
        </label>
      </div>
    </fieldset>
  );
}