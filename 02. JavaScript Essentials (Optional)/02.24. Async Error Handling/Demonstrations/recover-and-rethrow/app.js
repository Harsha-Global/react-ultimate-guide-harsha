import { basket } from "./products.js";
import { saveBasket } from "./save.js";

const compare = async () => {
  const recovered = await saveBasket(basket, true).catch(error => {
    return { ok: false, message: error.message };
  });
  console.log(`Recovered outcome: ${recovered.ok}, ${recovered.message}`);

  await saveBasket(basket, true)
    .catch(error => {
      console.log(`Adding context: ${error.message}`);
      throw error;
    })
    .catch(error => {
      console.log(`Outer received: ${error.message}`);
    });
};
compare().catch(error => console.log(`Unexpected: ${error.message}`));
