import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function readDelivery() {
  const fixture = JSON.parse(await readFile(join(process.cwd(), 'fixtures/delivery.json'), 'utf8')) as { fail: boolean; delayMs: number };
  await new Promise(resolve => setTimeout(resolve, fixture.delayMs));
  if (fixture.fail) throw new Error('The local delivery fixture is unavailable.');
  return 'Sample delivery takes three working days.';
}
