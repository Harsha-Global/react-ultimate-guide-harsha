# Numeric accessor type demonstration

In ProductTable.tsx, inspect the priceMinor accessor callback. The helper infers info.getValue() as number from Product.priceMinor.

Temporarily replace formatPrice(info.getValue()) in this one cell with info.getValue().toUpperCase(). Run npm run build. Expected: TS2339, Property toUpperCase does not exist on type number. The build also reports TS6133 for the now-unused formatPrice import, because this temporary edit removes its only use. Do not add a cast, any, ts-ignore or change Product to hide the error.

Restore formatPrice(info.getValue()) and run npm run build again. The correct result must compile and display the currency string. The stored/accessed value remains the integer number of USD cents. This intentionally broken temporary edit is not part of the completed checkpoint or a separate student assignment.
