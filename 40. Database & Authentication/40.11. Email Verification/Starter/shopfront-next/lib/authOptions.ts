import type { BetterAuthOptions } from 'better-auth';
// Shared by the server configuration and the schema-generation command.
export const authOptions = {
  emailAndPassword: { enabled: true, minPasswordLength: 12 },
  session: { expiresIn: 60 * 60 * 24, updateAge: 60 * 60, cookieCache: { enabled: false } },
  rateLimit: { enabled: true, storage: 'database', window: 60, max: 60 },
} satisfies BetterAuthOptions;
