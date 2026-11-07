import { ensureSchema, pool } from './index.js'

try {
  await ensureSchema()
  console.log('Database schema is ready.')
} catch (err) {
  console.error('Failed to initialise database:', err.message)
  process.exitCode = 1
} finally {
  await pool.end()
}
