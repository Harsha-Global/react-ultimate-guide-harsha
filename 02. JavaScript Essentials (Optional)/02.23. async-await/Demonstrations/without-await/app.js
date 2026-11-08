import { basket } from "./products.js";
import { saveBasket } from "./save.js";
const result = saveBasket(basket);
console.log(`Immediate property: ${result.total}`);
result.then(value => console.log(`Later total: ${value.total}`));
