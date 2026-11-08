import { betterAuth } from 'better-auth';
import { authOptions } from './lib/authOptions';
// CLI-only configuration. The --adapter option supplies the generator's adapter.
export const auth = betterAuth(authOptions);
