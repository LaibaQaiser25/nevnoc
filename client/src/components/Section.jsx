export function Section({ id, alt = false, children }) {
  return (
    <section id={id} className={`py-18 md:py-24 ${alt ? 'border-y border-line bg-ink-2' : ''}`}>
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </section>
  )
}

export function Heading({ eyebrow, children }) {
  return (
    <>
      <p className="mb-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-cyan">{eyebrow}</p>
      <h2 className="mb-7 text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight text-snow">{children}</h2>
    </>
  )
}

export function Card({ icon, title, children }) {
  return (
    <article className="reveal rounded-2xl border border-line bg-card p-7 transition duration-300 hover:-translate-y-1.5 hover:border-brand-cyan/50">
      {icon && (
        <div className="mb-4.5 grid h-12 w-12 place-items-center rounded-xl bg-brand/15">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-brand-cyan" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-[0.96rem] text-mist">{children}</p>
    </article>
  )
}
