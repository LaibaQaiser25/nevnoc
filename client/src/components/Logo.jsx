import { useId } from 'react'

export default function Logo({ small = false }) {
  const id = useId()
  return (
    <a href="#top" aria-label="Nevnoc home" className={`flex items-center font-extrabold tracking-tight leading-none ${small ? 'text-2xl' : 'text-3xl md:text-[2rem]'}`}>
      <svg viewBox="0 0 48 44" className={small ? 'w-7 h-6' : 'w-10 h-9'} aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#1e6bff" />
            <stop offset="1" stopColor="#00d0ff" />
          </linearGradient>
        </defs>
        <path d="M8 38 15 14h17q9 0 6.5 9L34 38" fill="none" stroke={`url(#${id})`} strokeWidth="9" strokeLinejoin="round" />
      </svg>
      <span className="-ml-0.5 text-white">evnoc</span>
    </a>
  )
}
