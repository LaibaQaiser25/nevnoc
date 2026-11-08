// Contact-form logic shared by the Express server (local / Node hosts)
// and the Vercel serverless functions in /api.
// Each enquiry is emailed to Nevnoc through Resend (https://resend.com).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const text = (v) => String(v ?? '').trim()
const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

const config = () => ({
  apiKey: process.env.RESEND_API_KEY,
  to: process.env.CONTACT_TO || 'laibaqaiser2005@gmail.com',
  // resend.dev works before nevnoc.com is verified, but only delivers to the Resend account's own email.
  from: process.env.CONTACT_FROM || 'Nevnoc website <onboarding@resend.dev>',
})

const FAILED = { status: 500, body: { error: 'We could not send your message right now.' } }

// Returns { status, body } so each host can send it in its own way.
export async function sendEnquiry(input) {
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

  const { apiKey, to, from } = config()
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set')
    return FAILED
  }

  const subject = `New enquiry from ${name}${business ? ` (${business})` : ''}`.replace(/[\r\n]+/g, ' ')
  const rows = [
    ['Name', name],
    ['Email', email],
    ['Business', business || '-'],
    ['What to automate', automate],
  ]
  const html =
    `<h2 style="font-family:sans-serif">New enquiry from nevnoc.com</h2>` +
    `<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">` +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#555"><b>${k}</b></td>` +
          `<td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
      )
      .join('') +
    `</table><p style="font-family:sans-serif;color:#777;font-size:12px">Reply to this email to answer ${escapeHtml(name)} directly.</p>`
  const plain = rows.map(([k, v]) => `${k}: ${v}`).join('\n\n')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, html, text: plain }),
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) {
      console.error('Resend error', res.status, await res.text())
      return FAILED
    }
    return { status: 201, body: { ok: true } }
  } catch (err) {
    console.error('Sending enquiry failed:', err.message)
    return FAILED
  }
}

export function health() {
  return config().apiKey
    ? { status: 200, body: { status: 'ok', email: 'configured' } }
    : { status: 503, body: { status: 'degraded', email: 'not configured' } }
}
