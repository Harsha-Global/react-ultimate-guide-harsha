const topics: Record<string, string> = {
  '': 'Choose a help topic.',
  delivery: 'Delivery is available for in-stock items.',
  'delivery/times': 'Sample delivery time: three working days.',
};
export function findHelp(parts: string[] = []): string | null {
  const key = parts.join('/');
  return Object.hasOwn(topics, key) ? topics[key] : null;
}
