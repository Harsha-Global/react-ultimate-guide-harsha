# Demonstrations

Separate copies of the booking example, each showing one rule about object shapes.
Keep the main movie-booking project correct; open one folder at a time.

```
npm ci
npm start
```

## missing-property

The booking object leaves out the required ticketCount property.

The build fails, so nothing runs:

```text
src/app.ts:13:7 - error TS2741: Property 'ticketCount' is missing in type
```

## with-note

The optional note is present, so it prints instead of the fallback.

Output:

```text
Skyward: 2 tickets, total 27
Near the aisle
```

## readonly-write

The last line assigns a new string to the readonly id property.

The build fails, so nothing runs:

```text
src/app.ts:24:9 - error TS2540: Cannot assign to 'id' because it is a read-only property.
```

## mutable-count

ticketCount is writable, so the last line changes it to 3. The total was worked out before that change, so it still shows 27.

Output:

```text
Skyward: 2 tickets, total 27
No note
Updated count: 3
```
