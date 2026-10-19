import { Section, Heading } from './Section.jsx'

const steps = [
  ['01', 'Discover', 'We learn your goals, audience and constraints.'],
  ['02', 'Design', 'Clean, minimal interfaces with a premium finish.'],
  ['03', 'Build', 'Performant, secure, thoroughly tested code.'],
  ['04', 'Monitor', 'Launch, observe and improve — continuously.'],
]

export default function Process() {
  return (
    <Section id="process">
      <Heading eyebrow="How we work">A clear, <span className="text-grad">precise</span> process</Heading>
      <ol className="grid gap-5.5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(([n, title, text]) => (
          <li key={n} className="reveal border-l-2 border-line py-1 pl-5.5">
            <b className="text-grad text-4xl font-extrabold">{n}</b>
            <h3 className="my-1 font-semibold">{title}</h3>
            <p className="text-[0.95rem] text-mist">{text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
