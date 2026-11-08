import 'server-only';
import { cacheLife } from 'next/cache';
import { readCatalog } from './catalogApi';
export async function readCachedCatalog() {
 'use cache';
 cacheLife('minutes');
 return readCatalog();
}
