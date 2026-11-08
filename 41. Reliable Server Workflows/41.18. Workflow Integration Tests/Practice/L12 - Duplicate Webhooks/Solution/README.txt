A verified payment event is delivered more than once. In this small synchronous notification simulation, the supplied handler records another notice every time. Reproduce the failing checks, identify the missing duplicate-event decision, and repair recordVerifiedNotice without changing the tests.

The function receives an already verified event and a mutable local ledger. Ignore an unpaid event. For a paid event whose exact event ID is already recorded, return false without changing either array. Otherwise append the order ID to notifications, append the event ID to processedEventIds and return true. Preserve the event object and unrelated ledger entries. Run the same paid event three times and require one recorded notice.

Run npm ci and npm test in Starter. Repair the one missing guard, run again, then compare Solution. Expected unmodified Starter:4 passes/3 failures; Solution:7 passes. Allow 15 minutes. Explain why an ignored replay should not be treated as a second charge.

This is an isolated debugging simulation, not a webhook endpoint or production payment implementation. It performs no network, mail or card operation. An in-memory array is not durable across processes or restarts, and event-level deduplication does not guarantee one effect across different event IDs for the same order. In the actual ShopFront application, retain signature verification, current provider-state reconciliation, the database event identity, the paid-order/outbox transaction and the receipt's unique order ID. Do not replace those mechanisms with this ledger.

Source: Practice/L12 - Duplicate Webhooks under Workflow Integration Tests in the course source repository, reached through How to Download Source Code. Keep this repair separate from the guided main. Submit or retain the failing/passing output and a short explanation; the article does not automatically grade a learner submission.

This README accompanies this independent Solution folder. Run npm ci, then npm test here.
