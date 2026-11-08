# Demonstrations

Separate copies of the booking example, each showing one rule about unions and narrowing.
Keep the main movie-booking project correct; open one folder at a time.

```
npm ci
npm start
```

## unsupported-category

printTotal is called with the string "vip", which is not one of the ticket categories.

The build fails, so nothing runs:

```text
src/app.ts:64:21 - error TS2345: Argument of type '"vip"' is not assignable to parameter of type 'TicketCategory | null'.
```

## unchecked-total

getBookingTotal can return undefined, and its result is formatted without checking for that.

The build fails, so nothing runs:

```text
src/app.ts:65:13 - error TS18048: 'missingTotal' is possibly 'undefined'.
```
