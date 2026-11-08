import { basket } from "./products.js";
import { saveBasket } from "./save.js";

console.log("Before request");
const request = saveBasket(basket);

request
  .then(result => {
    console.log(`Saved total: ${result.total}`);
    return saveBasket([]);
  })
  .then(result => {
    console.log(`Second save: ${result.total}`);
  });

console.log("After request");
