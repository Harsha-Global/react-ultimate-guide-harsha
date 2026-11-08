import { basket } from "./products.js";
import { saveBasket } from "./save.js";
saveBasket(basket, true).then(
  result => console.log(`Saved total: ${result.total}`),
  error => console.log(`Failed: ${error.message}`)
);
console.log("Request started");
