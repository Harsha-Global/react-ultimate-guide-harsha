import 'server-only';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { connection } from 'next/server';
export async function getDispatchEstimate() {
 await connection();
 const { mode } = JSON.parse(await readFile(path.join(process.cwd(), 'data/dispatch-mode.json'), 'utf8'));
 if (mode === 'slow') await new Promise(resolve => setTimeout(resolve, 4000));
 if (mode === 'error') throw new Error('Dispatch fixture unavailable');
 // Teaching marker only, never a real credential.
 const warehouseReference = process.env.WAREHOUSE_REFERENCE ?? 'INTERNAL-DEMO';
 return { publicText: 'Dispatches in two working days.', warehouseReference };
}
