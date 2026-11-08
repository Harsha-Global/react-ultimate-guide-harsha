# Check the Staff Permission

Complete inventoryStatus. Its user argument comes from supplied server authentication middleware, which has already checked the session. Return 401 when there is no authenticated user, 403 for an authenticated member, and 200 for an authenticated admin.

The requestBody argument is untrusted request data. A body containing role: "admin" must never grant permission, and a body containing role: "member" must not replace a verified admin's role. Do not parse cookies, build authentication or check client visibility in this focused task. In a real endpoint, apply this check before writing inventory data.

Attempt the task before opening the solution. The local Starter and Solution are inside 23. Module Project — Member Experience/Protect Inventory Operations/Practice/C31 - Check the Staff Permission. Use the course source-code route described in How to Download Source Code. The local companion includes strict TypeScript checking. The hosted result does not establish strict null safety.
