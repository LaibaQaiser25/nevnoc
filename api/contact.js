// Vercel serverless function: POST /api/contact
import { saveEnquiry } from '../server/enquiries.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }
  const { status, body } = await saveEnquiry(req.body)
  res.status(status).json(body)
}
