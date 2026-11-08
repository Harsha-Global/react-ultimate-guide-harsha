import { useId, useImperativeHandle, useRef } from "react";
import type { Ref } from "react";
export type NameFieldHandle = { focus: () => void };
type NameFieldProps = { ref?: Ref<NameFieldHandle> };
export function NameField({ ref }: NameFieldProps) {
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
      <input id={id} ref={inputRef} name="guestName" autoComplete="name" />
    </div>
  );
}
