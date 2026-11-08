'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchStock, stockKey } from '@/lib/stockQuery';
export function LiveStock({ id }: { id: string }) {
 const query = useQuery({ queryKey: stockKey(id), queryFn: () => fetchStock(id) });
 if (!query.data) return <p role="alert">Stock is not available.</p>;
 return <section className="panel"><h2>Live stock check</h2><p>Available: {query.data.stock} · Revision: {query.data.revision}</p><button disabled={query.isFetching} onClick={() => void query.refetch()}>{query.isFetching ? 'Checking…' : 'Check stock'}</button>{query.isError && <p role="alert">The refresh failed. The last stock result is still shown. Try again.</p>}</section>;
}
