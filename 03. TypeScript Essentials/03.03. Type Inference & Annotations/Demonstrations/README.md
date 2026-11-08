# Demonstrations

Separate copies of the booking example, each with one intentional type error.
Keep the main movie-booking project correct; open one folder at a time.

```
npm ci
npm start
```

The compiler reports the error and no booking output appears.

## wrong-number

The ticket count variable, inferred as a number, receives the string "2".

```text
src/app.ts:5:1 - error TS2322: Type 'string' is not assignable to type 'number'.
```

## wrong-array

One element of the number[] price list is the string "15".

```text
src/app.ts:7:40 - error TS2322: Type 'string' is not assignable to type 'number'.
```

## wrong-flag

The let isSoldOut variable starts as false, then receives the string "false".

```text
src/app.ts:9:1 - error TS2322: Type 'string' is not assignable to type 'boolean'.
```
