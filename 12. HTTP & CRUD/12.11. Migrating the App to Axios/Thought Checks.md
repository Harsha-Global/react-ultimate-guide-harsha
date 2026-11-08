# 12.11. Migrating the App to Axios — thought checks

**Which parts of the app change during migration?**

The shared client and employee API implementation change. Components, custom Hook contracts and backend endpoint meanings remain stable.

**What replaces response.json()?**

Axios supplies decoded data through response.data. Runtime shape validation remains required.

**Why normalize cancellation before generic Axios errors?**

The existing detail Hook deliberately ignores AbortError cancellation. Normalization preserves that contract.

**Where does DELETE data go?**

This endpoint succeeds with 204 and no content. Await completion and return void; do not parse or validate an employee body.
