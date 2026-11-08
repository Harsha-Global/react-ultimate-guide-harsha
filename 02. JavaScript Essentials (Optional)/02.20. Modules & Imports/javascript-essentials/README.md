# Modules & Imports — lecture-wise source code

The four files organize the existing product catalog, remaining basket and calculation functions. The data still has three products; the remaining basket retains the lamp count 4 and bottle count 3. The total remains 108. Earlier demonstrations are preserved in their own lecture source.

Use the complete browser setup in `../Setup Guide.md`. From this folder, run:

```bat
npx --yes http-server@14.1.1 . -a 127.0.0.1 -p 5500 -c-1
```

Open `http://127.0.0.1:5500/` in Chrome and use Ctrl+Shift+J for Console.

```text
Catalog entries: 3
First line total: 72
Basket total: 108
```

`products.js` exports products by name and removedBasket under the name basket. `pricing.js` exports getLineTotal by name and getBasketTotal as default. `app.js` imports both modules and aliases getLineTotal locally as calculateLineTotal. Default and named imports reference exported values; they do not copy objects or call imported functions automatically.

Keep the main source for the Closures lecture. Use the course GitHub repository route from the “How to Download Source Code” article lecture in the Course Introduction section for lecture-wise source code.
