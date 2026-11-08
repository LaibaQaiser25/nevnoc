// Express server for local development and plain Node hosting.
// On Vercel the same logic runs as serverless functions (see /api).
import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { health, sendEnquiry } from './enquiries.js'

const app = express()
const PORT = process.env.PORT || 5050

app.set('trust proxy', 1) // behind a host's load balancer
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '20kb' }))

app.get('/api/health', async (_req, res) => {
  const { status, body } = await health()
  res.status(status).json(body)
})

app.post('/api/contact', async (req, res) => {
  const { status, body } = await sendEnquiry(req.body)
  res.status(status).json(body)
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
