import pg from 'pg'

// Uses DATABASE_URL if set, otherwise the standard PG* env vars (PGHOST, PGUSER, ...).
export const pool = new pg.Pool(
  process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {},
)

export const query = (text, params) => pool.query(text, params)
