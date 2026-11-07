import { useState } from 'react'
import { isPlaceholder, site } from '../content.js'
import Icon from './Icon.jsx'
import { Eyebrow, Section, SmartLink } from './ui.jsx'

const field =
  'w-full rounded-xl border border-line bg-bg px-4 py-3 text-fg placeholder:text-muted/70 outline-none transition focus:border-accent'

function Field({ id, label, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
    </div>
  )
}

export default function Contact() {
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const whatsappHref = isPlaceholder(site.whatsapp) ? site.whatsapp : `https://wa.me/${site.whatsapp.replace(/\D/g, '')}`
  const emailHref = isPlaceholder(site.email) ? site.email : `mailto:${site.email}`

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    setStatus({ state: 'sending', message: 'Sending…' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(typeof data.error === 'string' ? data.error : 'We could not send your message right now.')
      }
      setStatus({ state: 'success', message: 'Thank you! We will reply within one business day.' })
      form.reset()
    } catch (err) {
      setStatus({
        state: 'error',
        message: `${err.message} Please try again, or reach us on WhatsApp or email.`,
      })
    }
  }

  return (
    <Section id="contact" className="relative overflow-hidden">
      <div className="glow pointer-events-none absolute -bottom-40 left-1/2 h-[600px] w-[1000px] -translate-x-1/2" />
      <div className="relative grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-[2.6rem]">
            Tell us what is slowing your business down.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Book a free call. We will show you what can be automated and what it would cost, with no obligation.
          </p>

          <SmartLink
            href={whatsappHref}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-[#04210f] transition hover:-translate-y-0.5"
            placeholderClassName="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-muted"
          >
            <Icon name="whatsapp" /> Chat on WhatsApp
          </SmartLink>

          <ul className="mt-8 space-y-4 text-muted">
            <li className="flex items-center gap-3">
              <Icon name="mail" className="h-5 w-5 shrink-0 text-accent" />
              <SmartLink
                href={emailHref}
                external={false}
                className="hover:text-accent"
                placeholderClassName="rounded-md px-2 py-0.5 text-sm"
              >
                {site.email}
              </SmartLink>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="pin" className="h-5 w-5 shrink-0 text-accent" />
              <span>{site.location} · {site.locationNote}</span>
            </li>
          </ul>
        </div>

        <form noValidate onSubmit={onSubmit} className="reveal space-y-5 rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Name">
              <input id="name" name="name" required maxLength={120} autoComplete="name" className={field} />
            </Field>
            <Field id="email" label="Email">
              <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
            </Field>
          </div>
          <Field id="business" label="Business" optional>
            <input id="business" name="business" maxLength={160} autoComplete="organization" placeholder="Company name or website" className={field} />
          </Field>
          <Field id="automate" label="What do you want to automate?">
            <textarea
              id="automate"
              name="automate"
              required
              rows={5}
              maxLength={5000}
              placeholder="For example: we copy every website enquiry into a sheet and reply by hand…"
              className={field}
            />
          </Field>
          {/* Spam trap: hidden from people, bots tend to fill it in. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Leave this empty</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <button
            type="submit"
            disabled={status.state === 'sending'}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent-strong px-6 py-3.5 font-medium text-on-accent shadow-[0_8px_30px_-8px_rgba(0,207,255,0.6)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
          >
            {status.state === 'sending' ? 'Sending…' : 'Send message'}
            <Icon name="arrow" className="h-4 w-4" />
          </button>
          <p
            role="status"
            aria-live="polite"
            className={`min-h-6 text-sm ${status.state === 'error' ? 'text-red-500' : 'text-accent'}`}
          >
            {status.state !== 'sending' && status.message}
          </p>
        </form>
      </div>
    </Section>
  )
}
