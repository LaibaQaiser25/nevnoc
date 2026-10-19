import { Section, Heading, Card } from './Section.jsx'

const Code = ({ children }) => <code className="rounded-md bg-[#16223a] px-2 py-0.5 text-[0.9em] text-brand-cyan">{children}</code>

const useCases = [
  { title: 'Cybersecurity & Monitoring', text: 'The “Noc” ending gives an immediate subconscious nod to a Network Operations Center (NOC) or threat detection software.' },
  { title: 'Cloud Infrastructure', text: 'It sounds like a secure, airtight gateway for handling high-volume, flowing data streams.' },
  { title: 'Automation Frameworks', text: 'Smooth, mechanical, and highly technical.' },
]

const letters = [
  ['n', 'text-brand'], ['e', ''], ['v', 'text-brand-cyan'],
  ['n', 'text-brand'], ['o', ''], ['c', 'text-brand-cyan'],
]

export default function About() {
  return (
    <Section id="about" alt>
      <div className="mb-16 grid items-start gap-12 md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-4 text-mist">
          <Heading eyebrow="About">The story behind <span className="text-grad">nevnoc</span></Heading>
          <p>Nevnoc is a clever, highly creative word choice because it blends the premium natural aesthetic of “Neva” with the high-tech precision of “Noc”.</p>
          <p>By combining the two concepts, Nevnoc functions exceptionally well as a brand name due to its distinct, dual-layered linguistics.</p>
          <p className="text-snow">Nevnoc — <b>Global Web Solutions™</b></p>
        </div>
        <div className="reveal rounded-2xl border border-line bg-card p-7.5">
          <h3 className="mb-3.5 text-lg font-semibold">🎛️ The Architectural Breakdown</h3>
          <ul className="grid gap-4 text-[0.96rem] text-mist">
            <li><b className="text-brand-cyan">Nev (from Neva):</b> Evokes the clarity, purity, and blank-canvas appeal of pristine snow (Latin <i>nivalis</i>) combined with the high-volume streaming capacity of the historic Neva River.</li>
            <li><b className="text-brand-cyan">Noc (from Nociceptor):</b> Rooted in biology as the body’s ultimate alarm, detection, and monitoring cell.</li>
          </ul>
        </div>
      </div>

      <h3 className="mb-2.5 text-2xl font-semibold">⚡ Ideal Tech Brand Use-Cases</h3>
      <p className="text-mist">Because of its unique phonetic construction, Nevnoc instantly sounds like an advanced system or a high-performance framework. It serves as an excellent candidate for:</p>
      <div className="mt-6 grid gap-5.5 md:grid-cols-3">
        {useCases.map((u) => <Card key={u.title} title={u.title}>{u.text}</Card>)}
      </div>

      <div className="reveal mt-16 text-center">
        <h3 className="mb-2.5 text-2xl font-semibold">🎨 Visual Symmetry</h3>
        <div aria-hidden="true" className="my-5 flex justify-center gap-1.5 text-[clamp(3rem,12vw,6.5rem)] font-extrabold tracking-tighter">
          {letters.map(([ch, cls], i) => <span key={i} className={cls}>{ch}</span>)}
        </div>
        <p className="mx-auto max-w-3xl text-mist">
          Typographically, <Code>nevnoc</Code> is a linguistic palindrome-hybrid. The letters balance each other perfectly: it starts and ends with <Code>n</Code>, and has matching structural curves (<Code>v</Code> and <Code>c</Code>). It looks beautifully symmetrical when typed out in a clean, sans-serif minimalist logo.
        </p>
      </div>
    </Section>
  )
}
