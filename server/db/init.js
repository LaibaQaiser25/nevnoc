import { readFile } from 'node:fs/promises'
import { pool } from './index.js'

const sql = await readFile(new URL('./schema.sql', import.meta.url), 'utf8')

try {
  await pool.query(sql)
  console.log('Database schema is ready.')
} catch (err) {
  console.error('Failed to initialise database:', err.message)
  process.exitCode = 1
} finally {
  await pool.end()
}
