import pg from 'pg'
import { schema } from './schema.js'

// Uses DATABASE_URL if set, otherwise the standard PG* env vars (PGHOST, PGUSER, ...).
// For a hosted database that requires SSL, add ?sslmode=require to DATABASE_URL.
// Serverless functions (Vercel) each keep one connection; the local server keeps a small pool.
export const pool = new pg.Pool({
  ...(process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {}),
  max: process.env.VERCEL ? 1 : 10,
})

export const query = (text, params) => pool.query(text, params)

// Creates the tables if they don't exist yet (safe to run any time).
export async function ensureSchema() {
  await pool.query(schema)
}
