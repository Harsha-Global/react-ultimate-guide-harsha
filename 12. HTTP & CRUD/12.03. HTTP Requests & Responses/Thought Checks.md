# 12.03. HTTP Requests & Responses — thought checks

**How do request and response bodies differ?**

The request body carries content to the server. The response body carries content back; each has its own headers and purpose.

**Is an empty array the same as a missing resource?**

No. This API can successfully return 200 with []; a missing resource returns 404.
