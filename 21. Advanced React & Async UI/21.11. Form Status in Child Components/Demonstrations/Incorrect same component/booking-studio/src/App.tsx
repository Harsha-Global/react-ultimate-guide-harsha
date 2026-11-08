import { useFormStatus } from "react-dom";
async function waitForExample() {
  await new Promise((resolve) => setTimeout(resolve, 1600));
}
export default function App() {
  const { pending } = useFormStatus();
  return (
    <main>
      <h1>Same-component status mistake</h1>
      <p>This hook has no parent form; the form is created below it.</p>
      <form action={waitForExample}>
        <button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Try submission"}
        </button>
      </form>
    </main>
  );
}
