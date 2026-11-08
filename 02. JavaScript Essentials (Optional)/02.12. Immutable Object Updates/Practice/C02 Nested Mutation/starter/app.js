const changeDeliveryFee = (item, fee) => {
  const changed = { ...item };
  changed.delivery.fee = fee;
  return changed;
};

const originalProduct = {
  id: "p2",
  name: "Desk Lamp",
  unitPrice: 18,
  delivery: { city: "Hyderabad", fee: 40 },
  tags: ["lighting", "desk"]
};

const updatedProduct = changeDeliveryFee(originalProduct, 25);
console.log(`Original fee: ${originalProduct.delivery.fee}`);
console.log(`Updated fee: ${updatedProduct.delivery.fee}`);
console.log(`City kept: ${updatedProduct.delivery.city}`);
console.log(`Name kept: ${updatedProduct.name}`);
console.log(`Same outer object: ${updatedProduct === originalProduct}`);
console.log(`Same delivery object: ${updatedProduct.delivery === originalProduct.delivery}`);
