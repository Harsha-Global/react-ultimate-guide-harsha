# 12.12. Axios Advanced Features & Use Cases — thought checks

**Does a fulfilled error interceptor preserve failure?**

No. Return Promise.reject(normalizedError) or throw to preserve rejection; otherwise a caller may treat failure as success.

**Does 100% upload progress prove the API saved the file?**

No. It describes sending progress. Only a successful confirmed response produces the receipt.

**Should the browser manually set multipart/form-data here?**

No. FormData serialization needs a matching boundary; let the request implementation set the header.

**Does cancellation undo a server-side write?**

No. The server may have received or processed it before cancellation.

**What does adapter: fetch change?**

It chooses the underlying transport for that request while retaining Axios client configuration and interceptor behavior. It does not add a React query cache.
