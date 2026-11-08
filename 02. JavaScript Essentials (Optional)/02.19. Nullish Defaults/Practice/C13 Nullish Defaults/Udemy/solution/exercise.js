const restoreSelection = saved => ({
  quantity: saved.quantity ?? 1,
  label: saved.label ?? "Untitled",
  showDetails: saved.showDetails ?? true
});
