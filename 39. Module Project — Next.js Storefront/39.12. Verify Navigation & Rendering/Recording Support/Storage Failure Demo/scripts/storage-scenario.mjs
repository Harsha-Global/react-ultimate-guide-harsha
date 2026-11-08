import { readFile, writeFile } from 'node:fs/promises';
const mode = process.argv[2];
if (!['ready', 'read-failure', 'write-failure'].includes(mode)) throw new Error('Use ready, read-failure or write-failure');
const original = new URL('../recording-support/PublicShortlistProvider.original.tsx', import.meta.url);
const target = new URL('../components/PublicShortlistProvider.tsx', import.meta.url);
let source = await readFile(original, 'utf8');
if (mode !== 'ready') {
 const adapter = `const scenarioStorage = {
 getItem(key: string): string | null { ${mode === 'read-failure' ? "throw new Error('Intentional denied storage read');" : 'return localStorage.getItem(key);'} },
 setItem(key: string, value: string): void { ${mode === 'write-failure' ? "throw new Error('Intentional denied storage write');" : 'localStorage.setItem(key, value);'} }
};
`;
 source = source.replace('localStorage.getItem(', 'scenarioStorage.getItem(').replace('localStorage.setItem(', 'scenarioStorage.setItem(');
 source = source.replace('type PublicShortlist =', adapter + 'type PublicShortlist =');
}
await writeFile(target, source);
console.log(`Public shortlist scenario: ${mode}. Rebuild/restart Next after changing a production fixture.`);
