# A20 API contract

The supplied local service extends the Form Component Integration service without changing ports or startup.

GET /api/products returns all four Product records, now including reorderLevel: number. The default is 5 for each product. PATCH /api/products/:id accepts JSON{name,stock,reorderLevel} and returns 200{product}, including the accepted level. reorderLevel must be an integer from 0 to 999; invalid values return 422 with fieldErrors.reorderLevel. The other name/stock rules remain in force. All data is in memory and resets when the API restarts.

The service, schema, default values, response parser and typed field-error mapping are supplied in both copies. Learners implement the visible registered field and the shared low-stock rule. Use accepted response values for the catalog. The guided Admin Workspace project does not inherit this assignment extension.
