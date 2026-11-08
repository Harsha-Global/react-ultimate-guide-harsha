const getSelectionSummary = (...items, label) => ({ label, count: items.length });
console.log(getSelectionSummary("Featured picks"));
