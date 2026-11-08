import { useRef, useState } from "react";
export default function App() {
  let localClicks = 0;
  const clicksRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0);
  const [report, setReport] = useState("No values captured yet.");
  function increase() { localClicks += 1; clicksRef.current += 1; }
  function capture() { setReport(`Captured local: ${localClicks}; captured ref: ${clicksRef.current}`); }
  return <main><h1>Local, ref and state</h1>
    <button type="button" onClick={increase}>Increase local and ref</button>
    <button type="button" onClick={() => setRenderCount(current => current + 1)}>Request another render</button>
    <button type="button" onClick={capture}>Capture stored values</button>
    <p>State updates requested: {renderCount}</p><p role="status">{report}</p>
    <p>Reading and writing the ref happens in handlers; the report is rendered from state.</p>
  </main>;
}
