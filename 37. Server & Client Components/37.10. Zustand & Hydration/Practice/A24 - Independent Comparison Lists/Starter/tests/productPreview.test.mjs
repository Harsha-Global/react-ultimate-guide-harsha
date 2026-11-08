import test from 'node:test'; import assert from 'node:assert/strict';
import { toProductPreview } from '../lib/productPreview.ts';
import { products } from '../lib/catalog.ts';
test('client projection contains only the declared public properties', () => {
 const original = { ...products[0], supplierCost: 3500 };
 const result = toProductPreview(original);
 assert.deepEqual(result, { id: 'P-101', name: 'Studio Desk Lamp', priceMinor: 8900 });
 assert.notEqual(result, original);
});
