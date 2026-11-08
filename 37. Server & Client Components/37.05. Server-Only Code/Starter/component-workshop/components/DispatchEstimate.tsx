import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { connection } from 'next/server';
export async function DispatchEstimate() {
 await connection();
 const { mode } = JSON.parse(await readFile(path.join(process.cwd(), 'data/dispatch-mode.json'), 'utf8'));
 if (mode === 'slow') await new Promise(resolve => setTimeout(resolve, 4000));
 if (mode === 'error') throw new Error('Dispatch fixture unavailable');
 return <section className="panel"><h2>Dispatch estimate</h2><p>Dispatches in two working days.</p></section>;
}
