# Complete solution — compare after your attempt

The complete implementation is in `app.js`. Open this separate solution folder, then run `node app.js` in its Command Prompt terminal.

```text
Travel Backpack x 2: 50
Travel Backpack x 4: 100
```

Only the later assignment changes: `quantity = 4;`.

The first `log` method call on the `console` object runs while the `quantity` variable holds `2`. The first multiplication expression therefore produces `50`.

The assignment changes the `quantity` variable to `4`. The next template literal is evaluated after that change, so its multiplication expression produces `100`. Changing the variable does not alter the first message that has already been printed.

The `let` keyword fits the `quantity` variable because the program reassigns it. The `const` keyword fits the `productName` and `unitPrice` variables because this example keeps them unchanged. No dependencies or automated test tools are required.
