import type { ProfilerOnRenderCallback } from "react";
export type Measurement = {
  id: number;
  kind: "React render" | "Event to frame" | "Long task";
  label: string;
  duration: number;
};
let entries: Measurement[] = [];
let sequence = 0;
const listeners = new Set<() => void>();
let scheduled = false;
function record(kind: Measurement["kind"], label: string, duration: number) {
  entries = [...entries.slice(-19), { id: ++sequence, kind, label, duration }];
  if (!scheduled) {
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      listeners.forEach((listener) => listener());
    });
  }
}
export const getMeasurements = () => entries;
export function subscribeMeasurements(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
export function clearMeasurements() {
  entries = [];
  listeners.forEach((listener) => listener());
}
export const recordRender: ProfilerOnRenderCallback = (
  id,
  phase,
  actualDuration,
) => {
  record("React render", `${id}: ${phase}`, actualDuration);
};
export function measureInteraction(label: string) {
  const start = performance.now();
  requestAnimationFrame(() => {
    const end = performance.now();
    performance.measure(`Framehouse: ${label}`, { start, end });
    record("Event to frame", label, end - start);
  });
}
export function observeLongTasks() {
  if (!PerformanceObserver.supportedEntryTypes.includes("longtask"))
    return () => {};
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries())
      record("Long task", entry.name, entry.duration);
  });
  observer.observe({ type: "longtask" });
  return () => observer.disconnect();
}
