import { founder, isPlaceholder, site } from '../content.js'
import Icon from './Icon.jsx'
import { Button, Eyebrow, Placeholder, Section, SmartLink } from './ui.jsx'

const socials = [
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'github', label: 'GitHub' },
  { key: 'upwork', label: 'Upwork' },
]

export default function Founder() {
  return (
    <Section id="about" alt>
      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
        {isPlaceholder(founder.photo) ? (
          <Placeholder label="Founder photo" icon="user" className="reveal mx-auto aspect-[4/5] w-full max-w-xs" />
        ) : (
          <img
            src={founder.photo}
            alt={`${founder.name}, ${founder.role}`}
            loading="lazy"
            className="reveal mx-auto aspect-[4/5] w-full max-w-xs rounded-2xl border border-line object-cover"
          />
        )}

        <div className="reveal">
          <Eyebrow>About the founder</Eyebrow>
          <h2 className="text-3xl font-semibold tracking-tight md:text-[2.6rem]">{founder.name}</h2>
          <p className="mt-1 font-medium text-accent">{founder.role}</p>
          <div className="mt-6 space-y-4 text-lg text-muted">
            {founder.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-8 flex flex-wrap gap-3" aria-label="Profiles">
            {socials.map((s) => (
              <li key={s.key}>
                <SmartLink
                  href={site.links[s.key]}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium transition hover:border-accent hover:text-accent"
                  placeholderClassName="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted"
                >
                  <Icon name={s.key} className="h-4 w-4" /> {s.label}
                </SmartLink>
              </li>
            ))}
          </ul>
          <Button href="#contact" icon="arrow" className="mt-8">Work with Laiba</Button>
        </div>
      </div>
    </Section>
  )
}
