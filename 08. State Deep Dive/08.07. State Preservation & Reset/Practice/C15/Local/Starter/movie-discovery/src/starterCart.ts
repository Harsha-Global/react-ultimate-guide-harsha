import type { CartItem } from './cart';
const starterCart: readonly CartItem[] = [
  { id: '18:00', showtime: '18:00', quantity: 1, unitPrice: 12 },
  { id: '21:00', showtime: '21:00', quantity: 1, unitPrice: 15 },
];
export function createStarterCart(): CartItem[] {
  return starterCart.map(item => ({ ...item }));
}
