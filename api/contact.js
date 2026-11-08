// Vercel serverless function: POST /api/contact
import { sendEnquiry } from '../server/enquiries.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }
  const { status, body } = await sendEnquiry(req.body)
  res.status(status).json(body)
}
