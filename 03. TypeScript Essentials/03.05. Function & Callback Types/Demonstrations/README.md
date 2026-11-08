# Demonstrations

Separate copies of the booking example, each showing one rule about function types.
Keep the main movie-booking project correct; open one folder at a time.

```
npm ci
npm start
```

## missing-return

getSubtotal computes price * count but has no return keyword.

The build fails, so nothing runs:

```text
src/app.ts:15:53 - error TS2355: A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.
```

## wrong-callback

tenPercentOff returns the string "discounted", but a Discount must return a number.

The build fails, so nothing runs:

```text
src/app.ts:37:47 - error TS2322: Type 'string' is not assignable to type 'number'.
```

## optional-note

formatNote is also called with a note, which is returned instead of the fallback.

Output:

```text
Regular: 27.00
Discounted: 24.60
No note
Near the aisle
```
