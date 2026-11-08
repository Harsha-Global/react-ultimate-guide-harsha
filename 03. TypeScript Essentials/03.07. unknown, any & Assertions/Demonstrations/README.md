# Demonstrations

Separate copies of the booking example, each showing one rule about unknown, any and assertions.
Keep the main movie-booking project correct; open one folder at a time.

```
npm ci
npm start
```

## unsafe-assertion

The saved ticket count is the string "3"; an as TicketRequest assertion hides that, so + 1 joins text.

Output:

```text
Next count: 31
```

## unsafe-any

The same saved text through an explicit any: the checker raises nothing, and the result is the same.

Output:

```text
Next count: 31
```

## unchecked-unknown

An unknown value is read before any check, so the compiler rejects it.

The build fails, so nothing runs:

```text
src/app.ts:2:13 - error TS18046: 'request' is of type 'unknown'.
```

## invalid-data

The main parser, given null, zero, a fraction, an unsupported category and malformed JSON.

Output:

```text
Total: 31.80
Ticket count must be a positive whole number
Booking data must be an object
Ticket count must be a positive whole number
Ticket count must be a positive whole number
Choose a supported ticket category
Expected property name or '}' in JSON at position 1 (line 1 column 2)
```
