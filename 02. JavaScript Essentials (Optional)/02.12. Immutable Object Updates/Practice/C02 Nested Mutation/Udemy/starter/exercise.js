const changeDeliveryFee = (item, fee) => {
  const changed = { ...item };
  changed.delivery.fee = fee;
  return changed;
};
