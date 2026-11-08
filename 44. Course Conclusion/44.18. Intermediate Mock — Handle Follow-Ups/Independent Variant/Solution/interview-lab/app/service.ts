export type RecordValue = { id: string; date: string; revision: number };
let record: RecordValue = { id:'event-1', date:'2026-11-02', revision:1 };
let writes = 0;
const pause = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
// Bounded in-browser service simulation. No real server, authentication or durability.
// Reads capture a snapshot at the start, so a delayed read can return old data.
export async function readRecord(slow = false, fail = false): Promise<RecordValue> {
  const snapshot = {...record};
  await pause(slow ? 1800 : 120);
  if (fail) throw new Error('Refresh failed.');
  return snapshot;
}
export async function updateRecord(date: string, expectedRevision: number): Promise<RecordValue> {
  await pause(900);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date+'T00:00:00Z')) || new Date(date+'T00:00:00Z').toISOString().slice(0,10)!==date) throw new Error('Enter a real date in YYYY-MM-DD format.');
  if (expectedRevision !== record.revision) throw new Error('Another edit changed this event. Refresh before saving again.');
  record = {...record, date, revision:record.revision + 1}; writes++;
  return {...record};
}
export function inspectService() { return {record:{...record}, writes}; }
export function externalEdit() { record = {...record, date:'2026-11-05', revision:record.revision + 1}; }
