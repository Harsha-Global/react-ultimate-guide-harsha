import { products, basket } from "./products.js";
import getBasketTotal, { getLineTotal as calculateLineTotal, createDiscount } from "./pricing.js";

console.log(`Catalog entries: ${products.length}`);
console.log(`First line total: ${calculateLineTotal(basket[0].unitPrice, basket[0].count)}`);
console.log(`Basket total: ${getBasketTotal(basket)}`);

const tenPercentOff = createDiscount(0.1);
const twentyPercentOff = createDiscount(0.2);

console.log(`Ten percent: ${tenPercentOff(100)}`);
console.log(`Twenty percent: ${twentyPercentOff(100)}`);
console.log(`Ten percent again: ${tenPercentOff(200)}`);