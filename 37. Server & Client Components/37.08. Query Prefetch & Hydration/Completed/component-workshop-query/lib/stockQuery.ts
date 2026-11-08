export type Stock = { id: string; stock: number; revision: number };
export const stockKey = (id: string) => ['stock', id] as const;
export async function fetchStock(id: string): Promise<Stock> {
 const response = await fetch(`/sample-stock/${encodeURIComponent(id)}`);
 if (!response.ok) throw new Error('Stock could not be refreshed.');
 return response.json();
}
