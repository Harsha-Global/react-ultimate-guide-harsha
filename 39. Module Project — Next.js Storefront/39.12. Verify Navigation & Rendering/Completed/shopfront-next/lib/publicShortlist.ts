export const publicShortlistKey = 'shopfront:public-shortlist';
const allowedIds = new Set(['P-101', 'P-102', 'P-103', 'P-104']);
export function parseShortlist(raw: string | null): string[] {
 if (raw === null) return [];
 const value: unknown = JSON.parse(raw);
 if (!Array.isArray(value)) throw new Error('Invalid shortlist');
 return [...new Set(value.filter((id): id is string => typeof id === 'string' && allowedIds.has(id)))];
}
