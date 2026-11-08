import { writeFileSync } from 'node:fs';
const mode = process.argv[2];
if (!['ready', 'fail'].includes(mode)) throw new Error('Use ready or fail');
writeFileSync(new URL('../fixtures/delivery.json', import.meta.url), JSON.stringify({ fail: mode === 'fail', delayMs: 1500 }));
console.log(`Delivery fixture: ${mode}`);
