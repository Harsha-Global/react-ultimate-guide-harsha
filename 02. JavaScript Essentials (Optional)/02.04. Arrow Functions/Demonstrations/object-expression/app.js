// Temporary comparison: parentheses make the object an expression.
const getLineSummary = (price, count = 1) => ({ total: price * count });

console.log(getLineSummary(25, 3).total);
