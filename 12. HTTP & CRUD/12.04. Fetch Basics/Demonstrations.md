# Fetch experiments

Run these in browser DevTools Console on the Vite app page, with both servers running. They are teaching experiments; they are not added to App.tsx. The illustrative signature is `fetch(url, options)`, where options is optional. A leading slash resolves against the current origin. Reload before repeating const declarations.

```js
const listRequest = fetch('/api/employees', {
  method: 'GET',
  headers: { Accept: 'application/json' }
});
const listResponse = await listRequest;
listResponse.status;
listResponse.ok;
listResponse.headers.get('Content-Type');
const listData = await listResponse.json();
listData;
```

Expected: Promise → Response with 200/true/application/json → parsed array of three seed employees. The promise may already appear fulfilled on a fast connection. Do not promise a visibly pending state. Do not call json() on that consumed body again; use a fresh request if repeating.

```js
const missingResponse = await fetch('/api/does-not-exist');
missingResponse.status;
missingResponse.ok;
```

Expected: the await succeeds; status is 404 and ok is false. Network's response body is `{"message":"Endpoint not found."}`. Open Network and, if needed, repeat `await fetch('/api/does-not-exist')` to capture a new request. Do not redeclare the same const binding in the same Console context.

This lecture stops after the Console experiments; the app source still contains the original unconnected shell. In the next lecture, the API helper will use the shorter fetch call because GET is the default and the endpoint already returns JSON. It will validate the parsed response before React receives it.
