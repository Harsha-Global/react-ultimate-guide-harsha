import { createPortal } from 'react-dom';
import { useState } from 'react';
export default function PortalAncestry() {
  const [clicks, setClicks] = useState(0);
  return <section className="panel" onClick={() => setClicks(count => count + 1)}>
    <h1>React parent</h1><p>Clicks received: {clicks}</p>
    {createPortal(<button type="button">Portal button</button>, document.getElementById('overlays')!)}
  </section>;
}
