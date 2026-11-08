"use client";
import { useState } from 'react';

export function VisitCounter({ label }: { label: string }) {
  const [count, setCount] = useState(0);
  return <button className="probe" onClick={() => setCount(value => value + 1)}>{label}: {count}</button>;
}
