import { useCallback, useState } from 'react'

// Dark is the default; the choice is remembered in localStorage.
// index.html applies the saved theme before first paint to avoid a flash.
export default function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', next === 'dark')
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#02060d' : '#f6f9fc')
      try {
        localStorage.setItem('theme', next)
      } catch {
        // storage unavailable (private mode); the toggle still works for this visit
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
