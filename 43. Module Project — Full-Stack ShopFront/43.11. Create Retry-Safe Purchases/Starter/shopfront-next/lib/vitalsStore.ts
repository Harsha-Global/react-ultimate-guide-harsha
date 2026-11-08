'use client';
import { onCLS, onINP, onLCP, type Metric } from 'web-vitals';
export type Reading = Pick<Metric, 'name' | 'value' | 'rating'>;
let readings: Reading[] = [];
const empty: Reading[] = [];
let started = false;
const listeners = new Set<() => void>();
function record(metric: Metric) {
  readings = [...readings.filter(item => item.name !== metric.name), { name: metric.name, value: metric.value, rating: metric.rating }];
  listeners.forEach(listener => listener());
}
export function startVitals() {
  if (started) return;
  started = true;
  onCLS(record, { reportAllChanges: true });
  onINP(record, { reportAllChanges: true });
  onLCP(record, { reportAllChanges: true });
}
export const subscribeVitals = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
export const readVitals = () => readings;
export const readServerVitals = () => empty;
