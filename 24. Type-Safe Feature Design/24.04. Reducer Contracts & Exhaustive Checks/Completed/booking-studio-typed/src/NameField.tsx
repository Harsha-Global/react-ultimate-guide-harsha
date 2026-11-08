import { useId, useImperativeHandle, useRef } from "react";
import type { Ref } from "react";
export type NameFieldHandle = { focus: () => void };
type NameFieldProps = {
  ref?: Ref<NameFieldHandle>;
  value?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
};
export function NameField({
  ref,
  value,
  onValueChange,
  required,
  disabled,
}: NameFieldProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(
    ref,
    () => ({
      focus() {
        inputRef.current?.focus();
      },
    }),
    [],
  );
  return (
    <div className="field">
      <label htmlFor={id}>Guest name</label>
      <input id={id} ref={inputRef} name="guestName" autoComplete="name" value={value} onChange={onValueChange ? (event) => onValueChange(event.target.value) : undefined} required={required} disabled={disabled} maxLength={80} />
    </div>
  );
}
