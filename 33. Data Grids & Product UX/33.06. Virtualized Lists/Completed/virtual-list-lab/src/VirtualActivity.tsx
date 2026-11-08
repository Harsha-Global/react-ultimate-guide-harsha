import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { activity } from "./activity";

export function VirtualActivity() {
  const scroll = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: activity.length,
    getScrollElement: () => scroll.current,
    estimateSize: () => 72,
    getItemKey: (index) => activity[index].id,
    overscan: 3,
    useFlushSync: false,
  });
  const rows = virtualizer.getVirtualItems();
  function jump(index: number) {
    virtualizer.scrollToIndex(index, { align: "start", behavior: "auto" });
    scroll.current?.focus({ preventScroll: true });
  }
  return <>
    <div className="toolbar"><button type="button" onClick={() => jump(0)}>First record</button><button type="button" onClick={() => jump(activity.length - 1)}>Last record</button></div>
    <p className="stats">1,000 records in memory · {rows.length} rows mounted</p>
    <div ref={scroll} className="viewport" role="region" aria-label="Activity history" tabIndex={0}>
      <ol role="list" className="activity-list" style={{ height: virtualizer.getTotalSize() }}>
        {rows.map((row) => {
          const item = activity[row.index];
          return <li role="listitem" key={row.key} className="activity-row" aria-posinset={row.index + 1} aria-setsize={activity.length} style={{ position: "absolute", top: 0, left: 0, width: "100%", transform: `translateY(${row.start}px)` }}>
            <span className="number">{row.index + 1}</span><div><div className="title">{item.title}</div><div className="detail">{item.detail}</div></div>
          </li>;
        })}
      </ol>
    </div>
  </>;
}
