import { useRef } from "react";
import { NameField } from "./NameField";
import type { NameFieldHandle } from "./NameField";
export function GuestDetails() {
  const nameRef = useRef<NameFieldHandle>(null);
  return (
    <section className="panel wide">
      <p className="eyebrow">YOUR VISIT</p>
      <h2>Make yourself at home.</h2>
      <p>Tell us who will be joining the workshop.</p>
      <button type="button" className="secondary" onClick={() => nameRef.current?.focus()}>
        Edit guest name
      </button>
      <NameField ref={nameRef} />
    </section>
  );
}
