# A10 Solution — Merchant Order Notes

Independent copy of the revised guided the "Deploy & Observe ShopFront" lecture project. Use a separate local PostgreSQL instance/port with its own shopfront_dev and shopfront_test databases, configured in private .env. Follow the exact commands, safe Windows working paths and private environment steps in A10 Run Guide.md. The reference Solution uses its own additional instance so an attempted schema is preserved. Never apply the optional solution migration to the guided main. Keep the existing local test-database guard.

Install with npm ci; run npm run db:generate and npm run db:deploy. Seed and fixtures are for disposable local data only. Start the familiar sample API and Next server in separate terminals, or use the established release launcher after building. Stop them before a launcher that owns a server.

The Starter has no merchant-note feature. Attempt the three tasks in Assignment.md before reviewing the "Merchant Order Notes Solution" lecture. The Solution adds the schema/migration, helper, route, form, page selection and checks. Its test:merchant-notes command owns the isolated test app/database; run its browser command as node scripts/test-server.mjs tests/merchant-note.browser.mjs after the integration command exits, with normal Next stopped. This launcher uses an isolated development server on3140. The Run Guide includes the optional visible Inspector capture commands. It makes no external payment.

The regular guided source remains separate; this solution is not a later course prerequisite.
