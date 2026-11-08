import { basket } from "./products.js";
import getBasketTotal, { createDiscount } from "./pricing.js";
import { saveBasketReport } from "./save-flow.js";

const runChallenge = async () => {
  // Keep only entries that are in stock.
  const availableItems = basket;
  // Create the required new array; set p2 count to 5.
  const updatedItems = availableItems;
  const total = 0;

  console.log(`Selected entries: ${updatedItems.length}`);
  console.log(`Updated count: ${updatedItems[0]?.count ?? 0}`);
  console.log(`Selected total: ${total}`);
  console.log(`Original total: ${getBasketTotal(basket)}`);
  console.log(`Original first count: ${basket[0].count}`);
  // Await saveBasketReport(updatedItems), then show its success or error result.
};

runChallenge().catch(error => {
  console.log(`Unexpected failure: ${error.message}`);
});

const tenPercentOff = createDiscount(0.1);
const twentyPercentOff = createDiscount(0.2);
console.log(`Closure prediction: ${tenPercentOff(100)}, ${twentyPercentOff(100)}`);
