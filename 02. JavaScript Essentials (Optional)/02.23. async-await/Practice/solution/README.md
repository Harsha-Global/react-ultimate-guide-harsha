# async/await — explained solution

The inner result remains the save operation’s original object, so its printed total is 108. The return expression applies tenPercentOff and selects 97.2 as the async function’s fulfilled value. The caller still receives a promise first, then that number in its handler.

## Expected output

```text
Before call
Inside: before await
After call
Inside: saved 108
Caller received: 97.2
```

All source files in this folder form the complete solution. Keep them together and run the local server in this folder, as described in the practice brief.
