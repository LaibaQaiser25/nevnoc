import { useState } from 'react'
import { Section, Heading } from './Section.jsx'

const input = 'rounded-lg border border-line bg-ink px-3.5 py-3 text-snow outline-none transition focus:border-brand-cyan'

export default function Contact() {
  const [status, setStatus] = useState({ state: 'idle', msg: '' })

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      setStatus({ state: 'error', msg: 'Please fill in all fields with a valid email.' })
      return
    }
    setStatus({ state: 'sending', msg: 'Sending…' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setStatus({ state: 'ok', msg: 'Thanks! We’ll be in touch within one business day.' })
      form.reset()
    } catch (err) {
      setStatus({ state: 'error', msg: err.message })
    }
  }

  return (
    <Section id="contact" alt>
      <div className="grid items-start gap-14 md:grid-cols-2">
        <div className="space-y-3 text-mist">
          <Heading eyebrow="Contact">Let’s build something <span className="text-grad">remarkable</span></Heading>
          <p>Tell us about your project and we’ll reply within one business day.</p>
          <p>hello@nevnoc.com</p>
        </div>
        <form noValidate onSubmit={onSubmit} className="reveal grid gap-4 rounded-2xl border border-line bg-card p-7.5">
          <label className="grid gap-1.5 text-sm font-medium text-mist">Name
            <input name="name" required maxLength={120} autoComplete="name" className={input} />
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-mist">Email
            <input name="email" type="email" required maxLength={200} autoComplete="email" className={input} />
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-mist">Message
            <textarea name="message" rows={4} required maxLength={5000} className={input} />
          </label>
          <button
            type="submit"
            disabled={status.state === 'sending'}
            className="bg-grad cursor-pointer rounded-xl px-7 py-3.5 font-semibold text-white shadow-xl shadow-brand/35 transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            Send message
          </button>
          <p role="status" className={`min-h-6 text-sm ${status.state === 'error' ? 'text-red-400' : 'text-brand-cyan'}`}>{status.msg}</p>
        </form>
      </div>
    </Section>
  )
}
