const calculateBasketTotal = items => items.reduce(
  (total, item) => total + item.unitPrice * item.count,
  0
);
