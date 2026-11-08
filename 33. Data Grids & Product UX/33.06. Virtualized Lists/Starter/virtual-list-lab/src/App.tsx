import { useState } from "react";
import { activity } from "./activity";
export default function App() {
  const [dark, setDark] = useState(false);
  return <div className={dark ? "dark" : ""}><main>
    <p className="eyebrow">CATALOG STUDIO · LIST LAB</p><h1>A window into the activity.</h1>
    <p className="intro">This separate, read-only lab holds 1,000 synthetic activity records. The catalog's server-paginated table stays unchanged.</p>
    <div className="toolbar"><button type="button" aria-pressed={dark} onClick={() => setDark(!dark)}>Dark theme</button></div>
    <p className="stats">1,000 records in memory · {activity.length} rows mounted</p>
    <div className="viewport" role="region" aria-label="Activity history" tabIndex={0}>
      <ol role="list" className="activity-list">{activity.map((item, index) => <li role="listitem" className="activity-row" key={item.id}><span className="number">{index + 1}</span><div><div className="title">{item.title}</div><div className="detail">{item.detail}</div></div></li>)}</ol>
    </div>
    <p className="note">Every row is mounted. Use the browser's Elements view to inspect this ordinary list before adding virtualization.</p>
  </main></div>;
}
