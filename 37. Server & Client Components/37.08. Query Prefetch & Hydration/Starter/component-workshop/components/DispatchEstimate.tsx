import { getDispatchEstimate } from '@/lib/dispatch.server';
export async function DispatchEstimate() {
 const estimate = await getDispatchEstimate();
 return <section className="panel"><h2>Dispatch estimate</h2><p>{estimate.publicText}</p></section>;
}
