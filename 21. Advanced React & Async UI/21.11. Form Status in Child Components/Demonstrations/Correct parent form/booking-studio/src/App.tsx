import { useFormStatus } from "react-dom";
async function waitForExample() {
  await new Promise((resolve) => setTimeout(resolve, 1600));
}
function StatusButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Saving…" : "Try submission"}
    </button>
  );
}
export default function App() {
  return (
    <main>
      <h1>Parent form status</h1>
      <p>The button component is rendered inside this form.</p>
      <form action={waitForExample}>
        <StatusButton />
      </form>
    </main>
  );
}
