import { readFile } from 'node:fs/promises'
import pg from 'pg'

// Uses DATABASE_URL if set, otherwise the standard PG* env vars (PGHOST, PGUSER, ...).
// For a hosted database that requires SSL, add ?sslmode=require to DATABASE_URL.
export const pool = new pg.Pool(
  process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {},
)

export const query = (text, params) => pool.query(text, params)

// Creates the tables if they don't exist yet (safe to run on every start).
export async function ensureSchema() {
  const sql = await readFile(new URL('./schema.sql', import.meta.url), 'utf8')
  await pool.query(sql)
}
