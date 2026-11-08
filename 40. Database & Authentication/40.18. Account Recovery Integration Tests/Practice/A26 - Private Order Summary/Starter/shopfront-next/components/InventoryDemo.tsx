import { headers } from 'next/headers';
import { StockEditor } from './StockEditor';
export async function InventoryDemo() {
 const host = (await headers()).get('host')?.split(':')[0];
 const local = host === 'localhost' || host === '127.0.0.1';
 if (process.env.COURSE_ALLOW_WRITES !== 'local-fixture' || !local) return null;
 return (
  <section className="panel">
   <p className="eyebrow">Local inventory demonstration</p>
   <h2>Review the lamp stock</h2>
   <p>An accepted edit must reach every public product view.</p>
   <StockEditor/>
  </section>
 );
}
