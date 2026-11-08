type Props<T extends { id: string }> = {
  disabled?: boolean;
  label: string;
  options: readonly T[];
  selectedId: string;
  getLabel: (option: T) => string;
  onSelect: (option: T) => void;
};

export function OptionPicker<T extends { id: string }>({ disabled = false, label, options, selectedId, getLabel, onSelect }: Props<T>) {
  return <div className="picker" role="group" aria-label={label}>
    {options.map(option => <button disabled={disabled} type="button" key={option.id} aria-pressed={option.id === selectedId} onClick={() => onSelect(option)}>{getLabel(option)}</button>)}
  </div>;
}