import { useState } from "react";
import type { SubmitEvent } from "react";
export default function App() {
  const [receipt, setReceipt] = useState("");
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const city = data.get("city");
    if (typeof name !== "string" || typeof city !== "string") return;
    setReceipt(`${name} / ${city} / updates: ${data.get("updates") === "yes" ? "yes" : "no"}`);
  }
  return <main><h1>Submit a browser-owned form</h1><form onSubmit={handleSubmit}>
    <label>Full name<input name="name" defaultValue="Emily" /></label>
    <label>City<select name="city" defaultValue="Seattle"><option>Seattle</option><option>Boston</option></select></label>
    <label><input name="updates" type="checkbox" value="yes" defaultChecked />Email updates</label>
    <label>Unnamed field<input defaultValue="Not in FormData" /></label>
    <label>Disabled field<input name="disabled" defaultValue="Not submitted" disabled /></label>
    <button type="submit">Submit</button><button type="reset">Reset browser fields</button>
    <p role="status">{receipt}</p>
  </form></main>;
}
