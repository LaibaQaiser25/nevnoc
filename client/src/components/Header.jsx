import { useEffect, useState } from 'react'
import { nav } from '../content.js'
import useTheme from '../hooks/useTheme.js'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { Button } from './ui.jsx'

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line text-muted transition hover:border-accent hover:text-accent"
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
    </button>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-lg' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-muted transition hover:text-fg">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden sm:block">
            <Button href="#contact" className="!px-5 !py-2.5 !text-sm">
              Book a free call
            </Button>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line text-fg lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Mobile" hidden={!open} className="border-t border-line px-4 pb-6 pt-2 lg:hidden">
        {nav.map((item) => (
          <a key={item.href} href={item.href} onClick={close} className="block border-b border-line py-4 font-medium text-fg">
            {item.label}
          </a>
        ))}
        <Button href="#contact" onClick={close} className="mt-6 w-full">
          Book a free call
        </Button>
      </nav>
    </header>
  )
}
