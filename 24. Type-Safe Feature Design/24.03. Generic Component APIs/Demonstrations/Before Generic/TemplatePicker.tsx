import type { GroupTemplate } from "../../booking-studio/src/bookingChoices";

export function TemplatePicker({ options, selectedId, onSelect }: {
  options: GroupTemplate[];
  selectedId: string;
  onSelect: (item: GroupTemplate) => void;
}) {
  return <div role="group" aria-label="Starting group size">
    {options.map(option => <button type="button" key={option.id} aria-pressed={option.id === selectedId} onClick={() => onSelect(option)}>{option.title}</button>)}
  </div>;
}
