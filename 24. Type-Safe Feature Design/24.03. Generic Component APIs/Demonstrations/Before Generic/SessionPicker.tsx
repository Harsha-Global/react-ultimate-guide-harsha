import type { SessionChoice } from "../../booking-studio/src/bookingChoices";

export function SessionPicker({ options, selectedId, onSelect }: {
  options: SessionChoice[];
  selectedId: string;
  onSelect: (item: SessionChoice) => void;
}) {
  return <div role="group" aria-label="Workshop session">
    {options.map(option => <button type="button" key={option.id} aria-pressed={option.id === selectedId} onClick={() => onSelect(option)}>{option.label} · {option.time}</button>)}
  </div>;
}
