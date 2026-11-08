import { basket } from "./products.js";
import { saveBasket } from "./save.js";

const showSavedTotal = async items => {
  console.log("Inside: before await");
  const result = await saveBasket(items);
  console.log(`Inside: saved ${result.total}`);
  return result.total;
};

console.log("Before call");
const request = showSavedTotal(basket);
console.log("After call");

request.then(total => {
  console.log(`Caller received: ${total}`);
});
