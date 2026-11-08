const restoreSelection = saved => ({
  quantity: saved.quantity || 1,
  label: saved.label || "Untitled",
  showDetails: saved.showDetails || true
});

const saved = { quantity: 0, label: "", showDetails: false };
const restored = restoreSelection(saved);
console.log(`Quantity: ${restored.quantity}`);
console.log(`Label: [${restored.label}]`);
console.log(`Show details: ${restored.showDetails}`);
const missing = restoreSelection({});
console.log(`Missing quantity: ${missing.quantity}`);
console.log(`Missing label: [${missing.label}]`);
console.log(`Missing details: ${missing.showDetails}`);
console.log(`Original quantity: ${saved.quantity}`);
