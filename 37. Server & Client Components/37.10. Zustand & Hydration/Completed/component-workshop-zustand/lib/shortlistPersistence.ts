import { products } from './catalog.ts';
import type { StateStorage } from 'zustand/middleware';
function browserStorage(): Storage {
 if (typeof window === 'undefined') throw new Error('Browser storage is unavailable on the server');
 return window.localStorage;
}
// Delay the browser access until an operation: persist can still expose its recovery API when storage is denied.
export const shortlistStorage: StateStorage = {
 getItem: key => browserStorage().getItem(key),
 setItem: (key, value) => browserStorage().setItem(key, value),
 removeItem: key => browserStorage().removeItem(key),
};
export function restoreIds(saved: unknown, fallback: string[]): string[] {
 const candidate = saved as { ids?: unknown } | undefined;
 return candidate && Array.isArray(candidate.ids) && candidate.ids.every(id => typeof id === 'string' && products.some(product => product.id === id)) ? [...new Set(candidate.ids)] : fallback;
}
