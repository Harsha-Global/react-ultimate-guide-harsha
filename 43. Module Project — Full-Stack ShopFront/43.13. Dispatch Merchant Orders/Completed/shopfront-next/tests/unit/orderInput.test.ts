import { expect, test } from 'vitest';
import { orderInput } from '@/lib/orderInput';
const valid = { requestKey: 'b4e6d560-d194-4b86-a27d-0c3b9a164a92', productId: 'P-101', quantity: 1 };
test('accepts the order operation and rejects invalid quantity or client pricing', () => {
  expect(orderInput.safeParse(valid).success).toBe(true);
  for (const quantity of [0, -1, 1.5, 6, '1']) expect(orderInput.safeParse({ ...valid, quantity }).success).toBe(false);
  expect(orderInput.safeParse({ ...valid, unitPriceMinor: 1 }).success).toBe(false);
  expect(orderInput.safeParse({ ...valid, requestKey: '' }).success).toBe(false);
});
