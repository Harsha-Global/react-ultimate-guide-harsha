import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { stockKey, type Stock } from '@/lib/stockQuery';
import { StockQueryProvider } from './StockQueryProvider';
import { LiveStock } from './LiveStock';
export async function StockSnapshot({ id }: { id: string }) {
 const client = new QueryClient();
 await client.fetchQuery({ queryKey: stockKey(id), queryFn: async (): Promise<Stock> => {
  const response = await fetch(`http://127.0.0.1:5211/stock/${encodeURIComponent(id)}`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Initial stock request failed');
  return response.json();
 } });
 return <StockQueryProvider><HydrationBoundary state={dehydrate(client)}><LiveStock id={id}/></HydrationBoundary></StockQueryProvider>;
}
