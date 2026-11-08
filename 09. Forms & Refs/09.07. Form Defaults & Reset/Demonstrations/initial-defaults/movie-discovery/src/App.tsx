import { useState } from "react";
function NameField({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  return <label>Controlled field initialized from a prop<input value={name} onChange={event => setName(event.currentTarget.value)} /></label>;
}
export default function App() {
  const [customer, setCustomer] = useState("Emily");
  const [resetKey, setResetKey] = useState(0);
  return <main><h1>Initial values and explicit reset</h1><p>Current initialName prop: {customer}</p>
    <button type="button" onClick={() => setCustomer(current => current === "Emily" ? "David" : "Emily")}>Change supplied default</button>
    <button type="button" onClick={() => setResetKey(current => current + 1)}>Reset field instances</button>
    <section key={resetKey}><NameField initialName={customer} /><label>Browser-owned field<input defaultValue={customer} /></label></section>
    <p>Changing an initial value does not replace current edits. A new identity starts new field instances.</p>
  </main>;
}
