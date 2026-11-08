import getBasketTotal from "./pricing.js";

export const saveBasket = (items, shouldFail = false) => {
  const total = getBasketTotal(items);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Basket save failed"));
        return;
      }

      resolve({ total, status: "saved" });
    }, 400);
  });
};
