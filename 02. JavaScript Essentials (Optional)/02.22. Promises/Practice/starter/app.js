import { basket } from "./products.js";
import { saveBasket } from "./save.js";

console.log("Before request");
const request = saveBasket(basket);

request
  .then(result => {
    console.log(`Saved total: ${result.total}`);
    return result.total;
  })
  .then(total => {
    console.log(`Next value: ${total + 1}`);
  });

console.log("After request");
