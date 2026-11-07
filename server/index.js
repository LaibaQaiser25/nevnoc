import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ensureSchema, query } from './db/index.js'

const app = express()
const PORT = process.env.PORT || 5050
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

app.set('trust proxy', 1) // behind the host's load balancer (Render, etc.)
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
  const text = (v) => String(v ?? '').trim()
  const name = text(req.body?.name)
  const email = text(req.body?.email)
  const business = text(req.body?.business)
  const automate = text(req.body?.automate)

  // Spam trap: real visitors never see the "website" field.
  if (text(req.body?.website)) return res.status(201).json({ ok: true })

  if (!name || !email || !automate) {
    return res.status(400).json({ error: 'Please fill in your name, email and what you want to automate.' })
  }
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' })
  if (name.length > 120 || email.length > 200 || business.length > 160 || automate.length > 5000) {
    return res.status(400).json({ error: 'One or more fields are too long.' })
  }

  const insert = () =>
    query(
      'INSERT INTO enquiries (name, email, business, automate) VALUES ($1, $2, $3, $4) RETURNING id, created_at',
      [name, email, business || null, automate],
    )

  try {
    let result
    try {
      result = await insert()
    } catch (err) {
      if (err.code !== '42P01') throw err // 42P01: table missing (database was down at startup)
      await ensureSchema()
      result = await insert()
    }
    res.status(201).json({ ok: true, ...result.rows[0] })
  } catch (err) {
    console.error('Saving enquiry failed:', err.message)
    res.status(500).json({ error: 'We could not send your message right now.' })
  }
})

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }))

// In production, serve the built React app from client/dist.
if (process.env.NODE_ENV === 'production') {
  const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../client/dist')
  // Vite gives built assets hashed names, so browsers can cache them for a long time.
  app.use('/assets', express.static(path.join(dist, 'assets'), { immutable: true, maxAge: '1y' }))
  app.use(express.static(dist))
  app.get(/.*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.listen(PORT, () => console.log(`Nevnoc API listening on http://localhost:${PORT}`))

ensureSchema().catch((err) => console.error('Database not ready yet:', err.message))
