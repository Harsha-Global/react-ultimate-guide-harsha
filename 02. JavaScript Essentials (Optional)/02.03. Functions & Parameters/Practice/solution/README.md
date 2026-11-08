# Complete solution — compare after your attempt

The full implementation is in `app.js`. Run `node app.js` from this separate solution folder's Command Prompt terminal.

```text
Travel Backpack x 2: 50
Travel Backpack x 3: 75
Single item: 25
Four items: 100
```

The added method call is:

```js
console.log(`Four items: ${getLineTotal(unitPrice, 4)}`);
```

The `unitPrice` variable supplies `25` to the `price` parameter. The explicit second argument supplies `4` to the `count` parameter, so the default value of `1` is not used. The `return` statement supplies `100` to the template literal. The `log` method on the `console` object then prints the completed string.

The function body and existing messages stay unchanged. The outer `quantity` variable is not reassigned by this call. No new dependency or test tool is required.
