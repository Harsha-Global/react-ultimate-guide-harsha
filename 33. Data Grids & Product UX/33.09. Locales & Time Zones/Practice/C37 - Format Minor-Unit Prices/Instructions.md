# Format Minor-Unit Prices

After the Locales & Time Zones lecture, repair formatMinorPrice so a price stored in integer minor units is formatted according to its currency. The current function always divides by 100 and treats zero as missing. Keep the supplied function name and unknown parameter types.

USD and INR use two minor-unit decimal places: 12345 means 123.45 major units. JPY uses zero: 12345 means 12345 yen. Accept only a number that is a nonnegative safe integer. Zero is valid. Negative, fractional, non-finite, unsafe, string and null values must return the exact text "Unavailable" without coercion.

Accept only the exact currency codes USD, INR and JPY; return "Unavailable" for other values. Supported display locales are en-US, en-IN, de-DE and ja-JP. Any other locale value falls back to en-US. Use Intl.NumberFormat with currency style and the validated explicit currency. Changing locale changes formatting; it does not convert the amount to another currency. Preserve the existing safe currency and locale handling in the starter.

Example: formatMinorPrice(12345, "JPY", "ja-JP") must format 12345 yen, not 123.45 yen. formatMinorPrice(0, "USD", "en-US") must produce a formatted zero-dollar price. The checks use the runtime's own currency formatting so harmless spacing or symbol differences do not cause failures.

Attempt the repair before viewing the solution. The strict local Starter and Solution are in Practice/C37 - Format Minor-Unit Prices through the source-code route explained in the How to Download Source Code article lecture. Run npm ci, then npm test in either independent folder. This exercise needs no React app, API or currency-conversion service.
