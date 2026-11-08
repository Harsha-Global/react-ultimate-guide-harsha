import { notFound } from 'next/navigation';
import { findHelp } from '@/lib/help';

export default async function HelpPage({ params }: { params: Promise<{ parts?: string[] }> }) {
  const { parts } = await params;
  const message = findHelp(parts);
  if (message === null) notFound();
  return <main><h1>Help</h1><p>{message}</p></main>;
}
