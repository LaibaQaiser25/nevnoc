// Vercel serverless function: GET /api/health
import { health } from '../server/enquiries.js'

export default async function handler(_req, res) {
  const { status, body } = await health()
  res.status(status).json(body)
}
