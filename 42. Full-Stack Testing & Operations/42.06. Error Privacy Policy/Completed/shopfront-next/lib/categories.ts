export const categories = ['Workspace', 'Travel', 'Everyday', 'Audio'] as const;
export type Category = typeof categories[number];
export function categoryFromSlug(slug: string) {
 return categories.find(category => category.toLowerCase() === slug);
}
