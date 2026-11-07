import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import CaseStudy from './components/CaseStudy.jsx'
import Portfolio from './components/Portfolio.jsx'
import Process from './components/Process.jsx'
import Founder from './components/Founder.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import useReveal from './hooks/useReveal.js'

export default function App() {
  useReveal()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent-strong focus:px-5 focus:py-2.5 focus:text-on-accent"
      >
        Skip to content
      </a>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <CaseStudy />
        <Portfolio />
        <Process />
        <Founder />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
