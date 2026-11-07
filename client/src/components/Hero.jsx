import { hero } from '../content.js'
import Icon from './Icon.jsx'
import { Button, Eyebrow } from './ui.jsx'

// Illustrative automation flow (not client data): shows the kind of work we do.
const flow = [
  { icon: 'mail', label: 'New lead arrives', sub: 'Website form' },
  { icon: 'bot', label: 'AI agent qualifies it', sub: 'Asks the right questions' },
  { icon: 'flow', label: 'n8n updates your tools', sub: 'CRM · Sheets · Slack' },
  { icon: 'whatsapp', label: 'Meeting booked', sub: 'Confirmed on WhatsApp' },
]

function FlowCard() {
  return (
    <div className="relative rounded-3xl border border-line bg-surface/80 p-6 shadow-2xl shadow-black/20 backdrop-blur" aria-hidden="true">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-light uppercase tracking-[0.3em] text-muted">Example workflow</span>
        <span className="flex items-center gap-1.5 text-xs font-medium text-accent">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent-strong" /> Automated
        </span>
      </div>
      <ol>
        {flow.map((step, i) => (
          <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
            {i < flow.length - 1 && (
              <span className="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-px overflow-hidden bg-line">
                <span className="flow-dot block h-1/3 w-px bg-accent-strong" style={{ animationDelay: `${i * 0.6}s` }} />
              </span>
            )}
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-strong/15 text-accent">
              <Icon name={step.icon} />
            </span>
            <span>
              <span className="block font-medium">{step.label}</span>
              <span className="block text-sm text-muted">{step.sub}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="glow pointer-events-none absolute left-1/2 top-0 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/4" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-24 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[1.15fr_1fr] lg:pb-32">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1 className="text-[clamp(2.3rem,5.4vw,3.9rem)] font-semibold leading-[1.1] tracking-tight">
            We automate the work that <span className="text-mark">slows your business down.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">{hero.subtitle}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="#contact" icon="arrow">Book a free call</Button>
            <Button href="#work" variant="ghost">See our work</Button>
          </div>
        </div>
        <FlowCard />
      </div>
    </section>
  )
}
