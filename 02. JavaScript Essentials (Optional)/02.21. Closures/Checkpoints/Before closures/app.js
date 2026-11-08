import { products, basket } from "./products.js";
import getBasketTotal, { getLineTotal as calculateLineTotal } from "./pricing.js";

console.log(`Catalog entries: ${products.length}`);
console.log(`First line total: ${calculateLineTotal(basket[0].unitPrice, basket[0].count)}`);
console.log(`Basket total: ${getBasketTotal(basket)}`);
