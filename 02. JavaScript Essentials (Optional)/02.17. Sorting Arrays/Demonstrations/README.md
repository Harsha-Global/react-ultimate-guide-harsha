# Sorting Arrays — separate demonstrations

Copy this Demonstrations folder’s contents to `C:\react\lecture-17-demos`. Keep the integrated Command Prompt working directory at `C:\react\javascript-essentials`. Open and save each demonstration in its own folder, then run the absolute-path command below.

## default-order

```bat
node C:\react\lecture-17-demos\default-order\app.js
```

The default comparison uses string representations; the numeric comparator changes the order to 1, 2, 10. Both runs sort separate copies.

```text
Default: 1, 10, 2
Numeric: 1, 2, 10
```

## sort-mutation

```bat
node C:\react\lecture-17-demos\sort-mutation\app.js
```

sort reorders the receiving prices array and returns that same array. This isolated demonstration intentionally changes the original order.

```text
Original first: 12
Same array: true
```

## equal-prices

```bat
node C:\react\lecture-17-demos\equal-prices\app.js
```

Equal-price first and second entries keep their relative order after lower moves before them. Exact internal comparison calls are not specified.

```text
lower
first
second
```

## Return to main

Reopen `C:\react\javascript-essentials\app.js` and run `node app.js`. Its correct output is listed in `javascript-essentials/README.md`. Preserve intentionally broken demonstration files for reproduction. Error stack paths and line numbers vary across machines.
