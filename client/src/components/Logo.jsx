import { useId } from 'react'

// The Nevnoc logo from Figma: slanted gradient "n" mark + "evnoc" in Poppins Bold.
// The mark is sized in em so it scales with the font size of the wordmark.
export function LogoMark({ className = '', style }) {
  const id = useId()
  return (
    <svg viewBox="0 0 216.72 167.4" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="108.36" y1="0" x2="108.36" y2="167.4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00D4FF" />
          <stop offset="1" stopColor="#1E9BFF" />
        </linearGradient>
      </defs>
      <path d="M0 167.4L50.22 0H216.72L166.5 167.4H115.2L150.03 51.3H86.13L51.3 167.4H0Z" fill={`url(#${id})`} />
    </svg>
  )
}

export default function Logo({ className = 'text-[1.7rem]', href = '#top' }) {
  return (
    <a href={href} aria-label="Nevnoc, back to top" className={`inline-block whitespace-nowrap font-bold leading-none tracking-tight text-fg ${className}`}>
      <LogoMark className="inline-block" style={{ width: '0.72em', height: '0.558em', marginRight: '0.03em' }} />
      <span aria-hidden="true">evnoc</span>
    </a>
  )
}
