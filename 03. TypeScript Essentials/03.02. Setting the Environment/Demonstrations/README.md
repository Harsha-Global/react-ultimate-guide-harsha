# Demonstrations - wrong-count

A separate copy of the booking example with `ticketCount = "2";` on line 5.
It shows that a failed build stops `npm start` before Node runs anything.
Keep the main movie-booking project correct; open this folder on its own.

```
npm ci
npm start
```

Expected: the compiler reports the mismatch and no booking message appears.

```text
src/app.ts:5:1 - error TS2322: Type 'string' is not assignable to type 'number'.

Found 1 error in src/app.ts:5
```
