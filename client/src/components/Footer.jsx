import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-line py-8.5">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 text-sm text-mist">
        <Logo small />
        <p>© {new Date().getFullYear()} Nevnoc. Global Web Solutions™. All rights reserved.</p>
      </div>
    </footer>
  )
}
