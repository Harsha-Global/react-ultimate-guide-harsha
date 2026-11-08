import 'server-only';
import { headers } from 'next/headers';
export async function hasLocalWriteAccess() {
 if (process.env.COURSE_ALLOW_WRITES !== 'local-fixture') return false;
 const host = (await headers()).get('host') || '';
 return /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host);
}
