import { basket } from "./products.js";
import { createDiscount } from "./pricing.js";
import { saveBasket } from "./save.js";

const tenPercentOff = createDiscount(0.1);

const showSavedTotal = async items => {
  console.log("Inside: before await");
  const result = await saveBasket(items);
  console.log(`Inside: saved ${result.total}`);
  return tenPercentOff(result.total);
};

console.log("Before call");
const request = showSavedTotal(basket);
console.log("After call");

request.then(total => {
  console.log(`Caller received: ${total}`);
});
