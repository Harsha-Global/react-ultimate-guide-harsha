import { basket } from "./products.js";
import getBasketTotal, { createDiscount } from "./pricing.js";
import { saveBasketReport } from "./save-flow.js";

const runChallenge = async () => {
  const availableItems = basket.filter(item => item.inStock);
  const updatedItems = availableItems.map(item =>
    item.id === "p2" ? { ...item, count: 5 } : item
  );
  const total = getBasketTotal(updatedItems);

  console.log(`Selected entries: ${updatedItems.length}`);
  console.log(`Updated count: ${updatedItems[0]?.count ?? 0}`);
  console.log(`Selected total: ${total}`);
  console.log(`Original total: ${getBasketTotal(basket)}`);
  console.log(`Original first count: ${basket[0].count}`);

  const outcome = await saveBasketReport(updatedItems, true);
  if (outcome.ok) {
    console.log(`Saved total: ${outcome.total}`);
  } else {
    console.log(`Save failed: ${outcome.message}`);
  }
};

runChallenge().catch(error => {
  console.log(`Unexpected failure: ${error.message}`);
});

const tenPercentOff = createDiscount(0.1);
const twentyPercentOff = createDiscount(0.2);
console.log(`Closure prediction: ${tenPercentOff(100)}, ${twentyPercentOff(100)}`);
