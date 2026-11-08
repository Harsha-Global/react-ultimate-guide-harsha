import { basket } from "./products.js";
import { saveBasket } from "./save.js";

console.log("Before request");
const request = saveBasket(basket);

request
  .then(result => {
    console.log(`Saved total: ${result.total}`);
    // No returned value.
  })
  .then(total => {
    console.log(`Next value: ${total}`);
  });

console.log("After request");
