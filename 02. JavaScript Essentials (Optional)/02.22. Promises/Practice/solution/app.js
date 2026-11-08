import { basket } from "./products.js";
import { createDiscount } from "./pricing.js";
import { saveBasket } from "./save.js";

const tenPercentOff = createDiscount(0.1);

console.log("Before request");
const request = saveBasket(basket);

request
  .then(result => {
    console.log(`Saved total: ${result.total}`);
    return tenPercentOff(result.total);
  })
  .then(total => {
    console.log(`Discounted value: ${total}`);
  });

console.log("After request");
