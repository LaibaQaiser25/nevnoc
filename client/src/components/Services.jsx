import { Section, Heading, Card } from './Section.jsx'

const services = [
  { title: 'Web Development', text: 'Fast, responsive, conversion-focused websites and web apps built on modern frameworks.',
    icon: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 21h8M12 18v3" /></> },
  { title: 'Cloud Infrastructure', text: 'Secure, airtight gateways and architecture for high-volume, flowing data streams.',
    icon: <path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18Z" /> },
  { title: 'Security & Monitoring', text: '24/7 threat detection and uptime monitoring inspired by the NOC mindset.',
    icon: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z" /><path d="m9 12 2 2 4-4" /></> },
  { title: 'Automation', text: 'Smooth, mechanical, highly technical workflows that remove repetitive work.',
    icon: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></> },
  { title: 'Global SEO & Growth', text: 'Reach audiences worldwide with performance-driven SEO and analytics.',
    icon: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></> },
  { title: 'Support & Maintenance', text: 'Dedicated care after launch: updates, backups and rapid response.',
    icon: <path d="M4 4h16v12H8l-4 4Z" /> },
]

export default function Services() {
  return (
    <Section id="services">
      <Heading eyebrow="What we do">Solutions built to <span className="text-grad">scale</span></Heading>
      <div className="grid gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => <Card key={s.title} icon={s.icon} title={s.title}>{s.text}</Card>)}
      </div>
    </Section>
  )
}
