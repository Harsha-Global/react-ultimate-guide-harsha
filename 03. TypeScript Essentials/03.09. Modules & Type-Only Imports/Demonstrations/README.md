# Demonstrations

Separate copies of the booking project, each with one module mistake.
Keep the main movie-booking project correct; open one folder at a time.

```
npm ci
npm start
```

## value-import-for-type

The type keyword is removed from the type-only import in app.ts.

The build fails, so nothing runs:

```text
src/app.ts:1:10 - error TS1484: 'Booking' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
src/app.ts:1:19 - error TS1484: 'Movie' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
src/app.ts:1:26 - error TS1484: 'TicketCategory' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
```

## missing-js-extension

The relative pricing import path omits the .js extension.

The build fails, so nothing runs:

```text
src/app.ts:2:28 - error TS2835: Relative import paths need explicit file extensions in ECMAScript imports when '--moduleResolution' is 'node16' or 'nodenext'. Did you mean './pricing.js'?
```

## wrong-caller

printTotal, now imported from pricing.ts, is called with the unsupported category "vip".

The build fails, so nothing runs:

```text
src/app.ts:39:21 - error TS2345: Argument of type '"vip"' is not assignable to parameter of type 'TicketCategory | null'.
```
