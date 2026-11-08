# Solution explanation

The caller owns the subtotal calculation. The supplied rule owns the adjustment. studentRule multiplies a number by 0.8, and priceTickets returns the one callback result. The type alias checks both callback input and output; it does not perform the calculation.

Run `npm ci`, then `npm start` in this solution folder. Compare your reasoning and observed values, not only the final text.
