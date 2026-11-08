import type { ReactNode } from 'react';
import { VisitCounter } from '@/components/VisitCounter';

export default function LearningTemplate({ children }: { children: ReactNode }) {
  return <><div className="probes"><VisitCounter label="Template counter" /></div>{children}</>;
}
