import { useEffect, useState } from 'react'
import { About } from './components/About'
import { CommandTerminal } from './components/CommandTerminal'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { IntroLoader } from './components/IntroLoader'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Research } from './components/Research'
import { Skills } from './components/Skills'
import { SmoothScroll } from './components/SmoothScroll'

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [booting, setBooting] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (terminalOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [terminalOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA'
      if (e.key === '/' && !typing && !terminalOpen) {
        e.preventDefault()
        setTerminalOpen(true)
      }
      if (e.key === 'Escape' && terminalOpen) {
        setTerminalOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [terminalOpen])

  return (
    <SmoothScroll paused={terminalOpen || booting}>
      <IntroLoader
        onDone={() => {
          setBooting(false)
          setReady(true)
        }}
      />

      <div className="noise" aria-hidden />
      <div className="aurora" aria-hidden />
      <div className="grid-bg" aria-hidden />

      <div className={`app-shell${ready ? ' is-ready' : ''}`}>
        <Nav onOpenTerminal={() => setTerminalOpen(true)} />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Research />
          <Contact />
        </main>
      </div>

      <CommandTerminal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </SmoothScroll>
  )
}
