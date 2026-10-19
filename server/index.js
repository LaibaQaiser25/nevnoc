import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { query } from './db/index.js'

const app = express()
const PORT = process.env.PORT || 5000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '20kb' }))

app.get('/api/health', async (_req, res) => {
  try {
    await query('SELECT 1')
    res.json({ status: 'ok', db: 'connected' })
  } catch {
    res.status(503).json({ status: 'degraded', db: 'unreachable' })
  }
})

app.post('/api/contact', async (req, res) => {
  const name = String(req.body?.name ?? '').trim()
  const email = String(req.body?.email ?? '').trim()
  const message = String(req.body?.message ?? '').trim()

  if (!name || !email || !message) return res.status(400).json({ error: 'All fields are required.' })
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' })
  if (name.length > 120 || email.length > 200 || message.length > 5000)
    return res.status(400).json({ error: 'One or more fields are too long.' })

  try {
    const { rows } = await query(
      'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING id, created_at',
      [name, email, message],
    )
    res.status(201).json({ ok: true, ...rows[0] })
  } catch (err) {
    console.error('Insert failed:', err.message)
    res.status(500).json({ error: 'Could not save your message. Please try again later.' })
  }
})

// In production, serve the built React app from client/dist.
if (process.env.NODE_ENV === 'production') {
  const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../client/dist')
  app.use(express.static(dist))
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.listen(PORT, () => console.log(`Nevnoc API listening on http://localhost:${PORT}`))
