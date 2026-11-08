import type { ReactNode } from 'react';

type PanelProps = {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function Panel({ title, children, footer }: PanelProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
      {footer !== undefined && <footer>{footer}</footer>}
    </section>
  );
}
