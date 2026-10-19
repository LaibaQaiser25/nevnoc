import { useState } from 'react'
import Logo from './Logo.jsx'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header id="top" className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-17 max-w-6xl items-center justify-between px-4">
        <Logo />
        <button
          className="cursor-pointer p-2 md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`block h-0.5 w-6 bg-white transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`my-1.5 block h-0.5 w-6 bg-white transition ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-white transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
        <nav
          className={`absolute inset-x-0 top-17 flex flex-col overflow-hidden border-b border-line bg-ink-2 transition-[max-height] duration-300 md:static md:max-h-none md:flex-row md:items-center md:gap-7 md:overflow-visible md:border-0 md:bg-transparent ${open ? 'max-h-96' : 'max-h-0'}`}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={close} className="px-6 py-4 text-[0.95rem] font-medium text-mist hover:text-white md:p-0">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={close} className="bg-grad mx-6 mb-5 mt-3 rounded-xl px-5 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 md:m-0">
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  )
}
