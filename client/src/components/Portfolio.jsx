import { projects } from '../content.js'
import Icon from './Icon.jsx'
import { Heading, InlineCta, Section, SmartLink, Tag } from './ui.jsx'

export default function Portfolio() {
  return (
    <Section id="work" alt>
      <Heading
        eyebrow="Our work"
        title="Demo projects"
        intro="Short video walkthroughs of automations we build. Watch one to see how it could work for you."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p) => (
          <article key={p.title} className="reveal flex flex-col rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/60">
            <h3 className="mb-2 text-lg font-semibold">{p.title}</h3>
            <p className="mb-5 text-muted">{p.text}</p>
            <ul className="mb-6 flex flex-wrap gap-2" aria-label="Technologies">
              {p.tags.map((t) => (
                <li key={t}><Tag>{t}</Tag></li>
              ))}
            </ul>
            <SmartLink
              href={p.demo}
              aria-label={`Watch demo: ${p.title}`}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-accent/50 px-5 py-2.5 text-sm font-medium text-accent transition hover:bg-accent-strong hover:text-on-accent"
              placeholderClassName="mt-auto inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-muted"
            >
              <Icon name="play" className="h-4 w-4" /> Watch demo
            </SmartLink>
          </article>
        ))}
      </div>
      <InlineCta text="Want one of these for your business?" link="Let's talk" />
    </Section>
  )
}
