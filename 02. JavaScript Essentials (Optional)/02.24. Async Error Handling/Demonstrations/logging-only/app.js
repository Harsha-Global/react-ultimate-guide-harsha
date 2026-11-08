import { basket } from "./products.js";
import { saveBasket } from "./save.js";
saveBasket(basket, true)
  .catch(error => {
    console.log(`Only logged: ${error.message}`);
  })
  .then(value => {
    console.log(`Next handler received: ${value}`);
  });
