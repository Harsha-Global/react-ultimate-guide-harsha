import 'server-only';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is missing.');
const globalForDb = globalThis as unknown as { courseDb?: PrismaClient };
export const db = globalForDb.courseDb ?? new PrismaClient({
  adapter: new PrismaPg({ connectionString, max: 5, connectionTimeoutMillis: 5000, idleTimeoutMillis: 30000 }),
});
if (process.env.NODE_ENV !== 'production') globalForDb.courseDb = db;
