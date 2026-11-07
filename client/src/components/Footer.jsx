import { nav, site } from '../content.js'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import { SmartLink } from './ui.jsx'

const socials = [
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'github', label: 'GitHub' },
  { key: 'upwork', label: 'Upwork' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="text-[2rem]" />
          <p className="mt-3 font-medium tracking-wide text-accent">{site.tagline}.</p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Web and AI automation studio in {site.location}. {site.locationNote}.
          </p>
          <a href="#contact" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            Book a free call <Icon name="arrow" className="h-4 w-4" />
          </a>
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-4 text-xs font-light uppercase tracking-[0.3em] text-muted">Quick links</h2>
          <ul className="space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-muted transition hover:text-fg">{item.label}</a>
              </li>
            ))}
            <li><a href="#contact" className="text-muted transition hover:text-fg">Contact</a></li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-xs font-light uppercase tracking-[0.3em] text-muted">Follow</h2>
          <ul className="space-y-2.5 text-sm">
            {socials.map((s) => (
              <li key={s.key}>
                <SmartLink
                  href={site.links[s.key]}
                  className="inline-flex items-center gap-2 text-muted transition hover:text-fg"
                  placeholderClassName="inline-flex items-center gap-2 rounded-md px-2 py-0.5 text-muted"
                >
                  <Icon name={s.key} className="h-4 w-4" /> {s.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted sm:px-6">© 2026 Nevnoc. All rights reserved.</p>
      </div>
    </footer>
  )
}
