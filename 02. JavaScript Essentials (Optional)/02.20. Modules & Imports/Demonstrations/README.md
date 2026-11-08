# Modules & Imports — isolated demonstrations

Copy this folder to `C:\react\lecture-20-demos`. Stop the main server with Ctrl+C, set the terminal folder to this demos root, and run:

```bat
npx --yes http-server@14.1.1 . -a 127.0.0.1 -p 5500 -c-1
```

## wrong-export

Open `http://127.0.0.1:5500/wrong-export/` and inspect Chrome Console. The app asks for removedBasket, but products.js exports that variable under the public name basket. The browser reports an unavailable named export before running the app body.

The isolated app.js is:

```js
import { products, removedBasket as basket } from "./products.js";
import getBasketTotal, { getLineTotal as calculateLineTotal } from "./pricing.js";

console.log(`Catalog entries: ${products.length}`);
console.log(`First line total: ${calculateLineTotal(basket[0].unitPrice, basket[0].count)}`);
console.log(`Basket total: ${getBasketTotal(basket)}`);
```

## missing-path

Open `http://127.0.0.1:5500/missing-path/` and inspect Chrome Console. The app requests ./price.js while the real file is pricing.js. The browser cannot load the dependency; the server returns 404 and app messages do not run.

The isolated app.js is:

```js
import { products, basket } from "./products.js";
import getBasketTotal, { getLineTotal as calculateLineTotal } from "./price.js";

console.log(`Catalog entries: ${products.length}`);
console.log(`First line total: ${calculateLineTotal(basket[0].unitPrice, basket[0].count)}`);
console.log(`Basket total: ${getBasketTotal(basket)}`);
```

## Return to main

Ctrl+C, switch back to `C:\react\javascript-essentials`, restart the same command, open `http://127.0.0.1:5500/`, and reload. The three normal messages should appear again. Keep all deliberately incorrect files separate from the main source. Error wording/stack paths may vary by browser version.
