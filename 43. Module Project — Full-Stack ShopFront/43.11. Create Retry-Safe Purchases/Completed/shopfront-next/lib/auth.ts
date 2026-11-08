import 'server-only';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { after } from 'next/server';
import { sendAccountMail } from './mail';
import { db } from './db';
import { authOptions } from './authOptions';
export const auth = betterAuth({
  ...authOptions,
  emailAndPassword: {
    ...authOptions.emailAndPassword, requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 60 * 15, revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      after(async () => { try { await sendAccountMail(user.email, 'Reset your ShopFront password', url); }
        catch { console.error('Account recovery mail could not be delivered.'); } });
    },
  },
  emailVerification: {
    expiresIn: 60 * 30, sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      after(async () => { try { await sendAccountMail(user.email, 'Verify your ShopFront email', url); }
        catch { console.error('Account verification mail could not be delivered.'); } });
    },
  },
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  socialProviders: process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? {
    github: { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET },
  } : {},
  database: prismaAdapter(db, { provider: 'postgresql', transaction: true }),
});
