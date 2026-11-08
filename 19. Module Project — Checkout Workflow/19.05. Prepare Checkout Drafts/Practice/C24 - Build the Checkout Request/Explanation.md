# Solution explanation

The request options use POST and the JSON content type. JSON.stringify serializes both the parsed form values and the current cart under the expected property names. JSON serialization also handles quotes and newlines correctly. Building this request leaves the form and cart untouched; the server validates the request and calculates the authoritative subtotal and delivery fee. Preparing a checkout draft is not placing an order.
