import { products, basket } from "./products.js";
import sumBasket, { getLineTotal as lineAmount } from "./pricing.js";

console.log(`Catalog entries: ${products.length}`);
console.log(`First line total: ${lineAmount(basket[0].unitPrice, basket[0].count)}`);
console.log(`Basket total: ${sumBasket(basket)}`);

const practiceBasket = basket.map(item => ({ ...item, count: 1 }));
console.log(`Practice total: ${sumBasket(practiceBasket)}`);
console.log(`Original first count: ${basket[0].count}`);
