import { useState } from "react";
import { activity } from "./activity";
import { VirtualActivity } from "./VirtualActivity";
export default function App() {
  const [dark, setDark] = useState(false);
  const [showAll, setShowAll] = useState(false);
  return <div className={dark ? "dark" : ""}><main>
    <p className="eyebrow">CATALOG STUDIO · LIST LAB</p><h1>A window into the activity.</h1>
    <p className="intro">This separate, read-only lab holds 1,000 synthetic activity records. The catalog's server-paginated table stays unchanged.</p>
    <div className="toolbar"><button type="button" aria-pressed={dark} onClick={() => setDark(!dark)}>Dark theme</button><button type="button" aria-pressed={showAll} onClick={() => setShowAll(!showAll)}>Show complete list</button></div>
    {showAll ? <>
      <p className="stats">1,000 records in memory · {activity.length} rows mounted</p>
      <div className="viewport" role="region" aria-label="Complete activity history" tabIndex={0}>
        <ol role="list" className="activity-list">{activity.map((item, index) => <li role="listitem" className="activity-row" key={item.id}><span className="number">{index + 1}</span><div><div className="title">{item.title}</div><div className="detail">{item.detail}</div></div></li>)}</ol>
      </div>
    </> : <VirtualActivity />}
    <p className="note">Virtual mode mounts only a moving window. Choose the complete list for all records in the document, including browser Find. Changing modes resets the scroll position. Virtualization does not reduce the data held in memory.</p>
  </main></div>;
}
