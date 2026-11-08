const changeDeliveryFee = (item, fee) => ({
  ...item,
  delivery: { ...item.delivery, fee }
});
