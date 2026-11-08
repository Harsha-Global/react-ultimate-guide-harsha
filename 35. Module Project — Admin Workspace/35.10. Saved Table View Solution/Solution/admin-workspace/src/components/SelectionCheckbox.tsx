import { useEffect, useRef } from "react";
import type { ChangeEventHandler } from "react";

type Props = { label: string; checked: boolean; mixed?: boolean; disabled?: boolean; onChange: ChangeEventHandler<HTMLInputElement> };
export function SelectionCheckbox({ label, checked, mixed = false, disabled = false, onChange }: Props) {
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => { if (input.current) input.current.indeterminate = mixed; }, [mixed]);
  return <label className="relative inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring">
    <input ref={input} type="checkbox" checked={checked} disabled={disabled} onChange={onChange} className="size-5 accent-primary" />
    <span className="sr-only">{label}</span>
  </label>;
}
