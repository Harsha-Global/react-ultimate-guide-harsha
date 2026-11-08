import { useState } from "react";
import CustomerForm from "./CustomerForm";
import { createCustomerDraft } from "./customer";
function FormInstance({ title }: { title: string }) {
  const [draft, setDraft] = useState(createCustomerDraft);
  return <section><h2>{title}</h2><CustomerForm draft={draft} onChange={setDraft} /></section>;
}
export default function App() { return <main><h1>Independent customer forms</h1><FormInstance title="First customer" /><FormInstance title="Second customer" /></main>; }
