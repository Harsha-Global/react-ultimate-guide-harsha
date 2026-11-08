export const getLineTotal = (price, count = 1) => price * count;

const getBasketTotal = items => items.reduce(
  (total, item) => total + getLineTotal(item.unitPrice, item.count),
  0
);

export default getBasketTotal;
