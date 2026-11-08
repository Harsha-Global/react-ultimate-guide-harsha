export type Product = { slug: string; name: string; priceMinor: number; inStock: boolean };
export const products: Product[] = [
  { slug: 'desk-lamp', name: 'Studio Desk Lamp', priceMinor: 8900, inStock: true },
  { slug: 'desk-tray', name: 'Desk Tray', priceMinor: 2400, inStock: true },
  { slug: 'reading-chair', name: 'Reading Chair', priceMinor: 14900, inStock: false },
  { slug: 'wall-clock', name: 'Wall Clock', priceMinor: 3900, inStock: true },
];
export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value / 100);
}
export function findProduct(slug: string) { return products.find(product => product.slug === slug); }
