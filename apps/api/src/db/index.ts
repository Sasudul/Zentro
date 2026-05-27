import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create postgres connection
// Use max 1 connection for serverless (Neon), more for local
const connectionString = process.env.DATABASE_URL;

const client = postgres(connectionString, {
  max: process.env.NODE_ENV === 'production' ? 10 : 5,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create drizzle instance with schema for relational queries
export const db = drizzle(client, { schema });

export default db;
