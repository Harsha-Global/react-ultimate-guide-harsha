# Product rules examples

product-rules.ts checks four sample product drafts with the shared productFormSchema and prints each result: an accepted
draft (its price and maximum quantity become numbers), an empty price, an unavailable product that still allows two, and
an unavailable product with a maximum quantity of zero.

Copy product-rules.ts into an examples folder in the project (product-explorer/examples/product-rules.ts). Then run it
from the project folder:

    node examples/product-rules.ts
