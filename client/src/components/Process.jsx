import { steps } from '../content.js'
import { Heading, InlineCta, Section } from './ui.jsx'

export default function Process() {
  return (
    <Section id="process">
      <Heading eyebrow="How we work" title="Four simple steps" intro="Clear from the first call to launch day." />
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="reveal relative rounded-2xl border border-line bg-surface p-6">
            <span className="text-mark text-4xl font-bold">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mb-2 mt-3 text-lg font-semibold">{s.title}</h3>
            <p className="text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
      <InlineCta text="Step one is free." link="Book your discovery call" />
    </Section>
  )
}
