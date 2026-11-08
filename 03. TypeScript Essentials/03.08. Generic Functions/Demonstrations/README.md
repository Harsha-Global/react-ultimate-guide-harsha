# Demonstrations

Separate copies of the booking example, each showing one limit of the generic helper.
Keep the main movie-booking project correct; open one folder at a time.

```
npm ci
npm start
```

## wrong-property

The first movie is read as if it had a category property, which Movie does not declare.

The build fails, so nothing runs:

```text
src/app.ts:118:25 - error TS2339: Property 'category' does not exist on type 'Movie'.
```

## unchecked-empty

The title of the first item of an empty list is read without handling undefined.

The build fails, so nothing runs:

```text
src/app.ts:118:13 - error TS2532: Object is possibly 'undefined'.
```
