// Contact-form logic shared by the Express server (local / Node hosts)
// and the Vercel serverless functions in /api.
import { ensureSchema, query } from './db/index.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const text = (v) => String(v ?? '').trim()

// Returns { status, body } so each host can send it in its own way.
export async function saveEnquiry(input) {
  const name = text(input?.name)
  const email = text(input?.email)
  const business = text(input?.business)
  const automate = text(input?.automate)

  // Spam trap: real visitors never see the "website" field.
  if (text(input?.website)) return { status: 201, body: { ok: true } }

  if (!name || !email || !automate) {
    return { status: 400, body: { error: 'Please fill in your name, email and what you want to automate.' } }
  }
  if (!EMAIL_RE.test(email)) return { status: 400, body: { error: 'Please enter a valid email address.' } }
  if (name.length > 120 || email.length > 200 || business.length > 160 || automate.length > 5000) {
    return { status: 400, body: { error: 'One or more fields are too long.' } }
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
      if (err.code !== '42P01') throw err // 42P01: table doesn't exist yet (first enquiry)
      await ensureSchema()
      result = await insert()
    }
    return { status: 201, body: { ok: true, ...result.rows[0] } }
  } catch (err) {
    console.error('Saving enquiry failed:', err.message)
    return { status: 500, body: { error: 'We could not send your message right now.' } }
  }
}

export async function health() {
  try {
    await query('SELECT 1')
    return { status: 200, body: { status: 'ok', db: 'connected' } }
  } catch {
    return { status: 503, body: { status: 'degraded', db: 'unreachable' } }
  }
}
