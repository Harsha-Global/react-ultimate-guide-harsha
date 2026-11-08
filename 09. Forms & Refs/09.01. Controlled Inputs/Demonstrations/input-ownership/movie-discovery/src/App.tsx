import { useState } from "react";
export default function App() {
  const [name, setName] = useState("");
  return <main><h1>Input ownership</h1>
    <label>Controlled name<input value={name} onChange={event => setName(event.currentTarget.value)} /></label>
    <label>Uncontrolled name<input defaultValue="Emily" /></label>
    <button type="button" onClick={() => setName("David")}>Set controlled name to David</button>
    <p>Controlled state: {name || "empty"}</p>
    <p>The uncontrolled input retains the browser's edited value.</p>
  </main>;
}
