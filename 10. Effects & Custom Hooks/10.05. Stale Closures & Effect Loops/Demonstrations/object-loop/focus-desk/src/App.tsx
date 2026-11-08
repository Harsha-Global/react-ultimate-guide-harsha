import { useEffect, useState } from "react";

export default function App() {
  const [setups, setSetups] = useState(0);
  const options = { label: "Focus" }; // New identity on every render.

  useEffect(() => {
    // A safety limit makes the loop observable without running forever.
    setSetups((current) => current < 4 ? current + 1 : current);
    document.title = options.label;
  }, [options]);

  return <main className="desk"><h1>Bounded object-dependency loop</h1><p>Effect setups recorded: {setups}</p><p>Move constant options outside the component, then reload and compare.</p></main>;
}
