import { useEffect, useState } from 'react'

function CountUp({ end, suffix = '' }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const t0 = performance.now()
    let raf
    const tick = (t) => {
      const p = Math.min((t - t0) / 1400, 1)
      setN(Math.round(end * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end])
  return <>{n}{suffix}</>
}

const stats = [
  { end: 120, suffix: '+', label: 'Projects delivered' },
  { end: 35, suffix: '+', label: 'Countries served' },
  { end: 99, suffix: '.9%', label: 'Uptime target' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-18 md:py-28">
      <div className="pointer-events-none absolute -left-24 -top-32 h-[440px] w-[440px] rounded-full bg-brand opacity-35 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-36 -right-16 h-[380px] w-[380px] rounded-full bg-brand-cyan opacity-20 blur-[110px]" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <p className="mb-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-cyan">Global Web Solutions™</p>
          <h1 className="text-[clamp(2.4rem,6.5vw,4.6rem)] font-extrabold leading-[1.08] tracking-tight">
            Build the web <span className="text-grad">without limits.</span>
          </h1>
          <p className="mb-9 mt-6 max-w-2xl text-lg text-mist">
            Nevnoc delivers secure, high-performance websites, cloud infrastructure and automation — engineered with the clarity of snow and the precision of a network operations center.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a href="#contact" className="bg-grad rounded-xl px-7 py-3.5 font-semibold text-white shadow-xl shadow-brand/35 transition hover:-translate-y-0.5">Start a project</a>
            <a href="#about" className="rounded-xl border border-line px-7 py-3.5 font-semibold transition hover:border-brand-cyan">Why “Nevnoc”?</a>
          </div>
          <ul className="mt-16 flex flex-wrap gap-11">
            {stats.map((s) => (
              <li key={s.label}>
                <b className="text-4xl font-extrabold"><CountUp end={s.end} suffix={s.suffix} /></b>
                <span className="block text-sm font-medium text-mist">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
