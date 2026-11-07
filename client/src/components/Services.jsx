import { services } from '../content.js'
import Icon from './Icon.jsx'
import { Heading, InlineCta, Section } from './ui.jsx'

export default function Services() {
  return (
    <Section id="services" alt>
      <Heading
        eyebrow="Services"
        title="Less manual work. More time to grow."
        intro="Pick one service or combine them. Everything is built around how your business already works."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {services.map((s) => (
          <article
            key={s.title}
            className="reveal group rounded-2xl border border-line bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:border-accent/60"
          >
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-accent-strong/15 text-accent transition group-hover:bg-accent-strong group-hover:text-on-accent">
              <Icon name={s.icon} className="h-6 w-6" />
            </span>
            <h3 className="mb-2 text-xl font-semibold">{s.title}</h3>
            <p className="text-muted">{s.text}</p>
          </article>
        ))}
      </div>
      <InlineCta text="Not sure which one you need?" />
    </Section>
  )
}
