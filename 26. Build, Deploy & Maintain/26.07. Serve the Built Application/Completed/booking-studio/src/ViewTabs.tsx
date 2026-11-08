import { useRef, useState } from "react";
export type View = "overview" | "reviews";
const choices: { value: View; label: string }[] = [
  { value: "overview", label: "Overview" },
  { value: "reviews", label: "Reviews" },
];
export function ViewTabs({
  id,
  selected,
  onSelect,
}: {
  id: string;
  selected: View;
  onSelect: (view: View) => void;
}) {
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [focusIndex, setFocusIndex] = useState(0);
  return (
    <div role="tablist" aria-label="Workshop information" className="tabs">
      {choices.map((choice, index) => (
        <button key={choice.value} ref={(node) => {
          buttons.current[index] = node;
        }} role="tab" id={`${id}-${choice.value}`} aria-controls={`${id}-panel`} aria-selected={selected === choice.value} tabIndex={focusIndex === index ? 0 : -1} type="button" onFocus={() => setFocusIndex(index)} onClick={() => onSelect(choice.value)} onKeyDown={(event) => {
          const next =
            event.key === "ArrowRight"
              ? (index + 1) % 2
              : event.key === "ArrowLeft"
                ? (index + 1) % 2
                : event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? 1
                    : null;
          if (next !== null) {
            event.preventDefault();
            buttons.current[next]?.focus();
          }
        }}>
          {choice.label}
        </button>
      ))}
    </div>
  );
}
