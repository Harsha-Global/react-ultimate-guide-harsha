export type Product = { id: string; slug: string; name: string; category: string; priceMinor: number; stock: number; image: string };
export const products: Product[] = [
 { id: 'P-101', slug: 'studio-desk-lamp', name: 'Studio Desk Lamp', category: 'Workspace', priceMinor: 8900, stock: 12, image: '/assets/lamp.jpg' },
 { id: 'P-102', slug: 'everyday-backpack', name: 'Everyday Backpack', category: 'Travel', priceMinor: 7900, stock: 0, image: '/assets/backpack.jpg' },
 { id: 'P-103', slug: 'terracotta-travel-mug', name: 'Terracotta Travel Mug', category: 'Everyday', priceMinor: 2800, stock: 3, image: '/assets/mug.jpg' },
 { id: 'P-104', slug: 'studio-headphones', name: 'Studio Headphones', category: 'Audio', priceMinor: 12900, stock: 18, image: '/assets/headphones.jpg' },
];
export const formatPrice = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
export const findProduct = (slug: string) => products.find(product => product.slug === slug);
