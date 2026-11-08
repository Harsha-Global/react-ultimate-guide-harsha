Complete decidePayment(order, payment, processedEventIds). The payment input represents a signature-verified event whose current provider session has already been retrieved; this helper does not authenticate a webhook or perform any network request.

Apply these rules in order: (1) an event ID already in processedEventIds returns ignore; (2) live mode, a different checkout session or order ID, an amount different from the saved total, or any currency other than the exact string usd returns reject; (3) an already-paid order or an unpaid session returns ignore; (4) otherwise return mark-paid. Never change an input or downgrade a paid order. The displayed TypeScript shapes are the input contract; this exercise focuses on reconciliation rather than parsing unknown JSON.

The three return strings describe a decision only. The real application must still apply the transition and event bookkeeping transactionally and enforce unique identities in the database. A browser return address is not payment evidence.

Prerequisite: Payment Reconciliation. Allow 12 minutes. Try the Starter before inspecting the Solution. The independent strict-TypeScript companions are in Practice/C45 - Decide a Verified Payment under that lecture in the course source repository, reached through How to Download Source Code. Run npm ci and npm test. Native checks validate behavior; the local companion also checks strict TypeScript.

On Windows, copy Starter to C:\react\c45-starter before running npm ci and npm test. Later copy Solution separately to C:\react\c45-solution and install there too. Check that the entire working path, including all parent folders, contains no &. Preserve the supplied resources and return to the guided ShopFront working project after the comparison.
