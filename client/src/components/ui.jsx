import { isPlaceholder } from '../content.js'
import Icon from './Icon.jsx'

export function Section({ id, alt = false, className = '', children }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${alt ? 'bg-surface-2/60' : ''} ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  )
}

// Small spaced-out caps label, like "WEB DESIGN • WEB DEVELOPMENT" in the logo artwork.
export function Eyebrow({ children }) {
  return <p className="mb-4 text-xs font-light uppercase tracking-[0.3em] text-accent">{children}</p>
}

export function Heading({ eyebrow, title, intro, center = false }) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-[2.6rem]">{title}</h2>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
    </div>
  )
}

const btnBase =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-[0.95rem] font-medium transition duration-200'
const btnStyles = {
  primary: 'bg-accent-strong text-on-accent shadow-[0_8px_30px_-8px_rgba(0,207,255,0.6)] hover:-translate-y-0.5 hover:shadow-[0_12px_36px_-8px_rgba(0,207,255,0.75)]',
  ghost: 'border border-line text-fg hover:border-accent hover:text-accent',
}

export function Button({ href, variant = 'primary', icon, children, className = '', ...rest }) {
  return (
    <a href={href} className={`${btnBase} ${btnStyles[variant]} ${className}`} {...rest}>
      {icon && <Icon name={icon} className="h-[1.1em] w-[1.1em]" />}
      {children}
    </a>
  )
}

// Visible marker for content still to be added (see content.js).
export function Placeholder({ label, icon = 'image', className = '' }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-accent/35 bg-surface p-6 text-center text-sm text-muted ${className}`}
    >
      <Icon name={icon} className="h-7 w-7 opacity-70" />
      <span className="font-medium">{label}</span>
      <span className="text-xs uppercase tracking-widest opacity-70">Placeholder</span>
    </div>
  )
}

// A link that falls back to a dashed "placeholder" pill when its URL is not set yet.
export function SmartLink({ href, children, className = '', placeholderClassName = '', external = true, ...rest }) {
  if (isPlaceholder(href)) {
    return (
      <span
        title={`Placeholder: add ${href || 'the link'} in src/content.js`}
        className={`cursor-not-allowed border border-dashed border-accent/50 opacity-80 ${placeholderClassName || className}`}
      >
        {children}
        <span className="sr-only"> (link coming soon)</span>
      </span>
    )
  }
  const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a href={href} className={className} {...ext} {...rest}>
      {children}
    </a>
  )
}

export function Tag({ children }) {
  return (
    <span className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-muted">{children}</span>
  )
}

// Inline "talk to us" prompt used at the end of sections.
export function InlineCta({ text = 'Not sure where to start?', link = 'Book a free call' }) {
  return (
    <p className="reveal mt-12 text-center text-muted">
      {text}{' '}
      <a href="#contact" className="inline-flex items-center gap-1 font-medium text-accent hover:underline">
        {link} <Icon name="arrow" className="h-4 w-4" />
      </a>
    </p>
  )
}
