import { writeFile } from 'node:fs/promises';
const mode = process.argv[2];
if (!['ready', 'slow', 'error'].includes(mode)) throw new Error('Use ready, slow or error.');
await writeFile(new URL('../data/dispatch-mode.json', import.meta.url), JSON.stringify({ mode }));
console.log(`Dispatch fixture: ${mode}`);
