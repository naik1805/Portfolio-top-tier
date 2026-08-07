import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { About } from './components/About'
import { CommandTerminal } from './components/CommandTerminal'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { FloatingWindow } from './components/FloatingWindow'
import { Hero } from './components/Hero'
import { IntroLoader } from './components/IntroLoader'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Research } from './components/Research'
import { Skills } from './components/Skills'
import { SmoothScroll } from './components/SmoothScroll'
import type { WindowId } from './types'

const windows: Record<WindowId, { title: string; code: string }> = {
  about: { title: 'About', code: 'FIG. 01' },
  skills: { title: 'Skills', code: 'FIG. 02' },
  experience: { title: 'Experience', code: 'FIG. 03' },
  projects: { title: 'Projects', code: 'FIG. 04' },
  research: { title: 'Research', code: 'FIG. 05' },
  contact: { title: 'Contact', code: 'FIG. 06' },
}

function WindowContent({ id }: { id: WindowId }) {
  switch (id) {
    case 'about':
      return <About />
    case 'skills':
      return <Skills />
    case 'experience':
      return <Experience />
    case 'projects':
      return <Projects layout="stack" />
    case 'research':
      return <Research />
    case 'contact':
      return <Contact />
  }
}

export default function App() {
  const [active, setActive] = useState<WindowId | null>(null)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [booting, setBooting] = useState(true)
  const [ready, setReady] = useState(false)

  const openWindow = useCallback((id: WindowId) => setActive(id), [])
  const closeWindow = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (active || terminalOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [active, terminalOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      const typing = tag === 'INPUT' || tag === 'TEXTAREA'
      if (e.key === '/' && !typing && !terminalOpen) {
        e.preventDefault()
        setTerminalOpen(true)
      }
      if (e.key === 'Escape') {
        if (terminalOpen) setTerminalOpen(false)
        else if (active) setActive(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, terminalOpen])

  return (
    <SmoothScroll paused={Boolean(active) || terminalOpen || booting}>
      <IntroLoader
        onDone={() => {
          setBooting(false)
          setReady(true)
        }}
      />

      <div className="noise" aria-hidden />
      <div className="aurora" aria-hidden />
      <div className="grid-bg" aria-hidden />

      <div
        className={`app-shell${active ? ' window-open' : ''}${ready ? ' is-ready' : ''}`}
      >
        <Nav
          active={active}
          onOpen={openWindow}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
        <main>
          <Hero onOpen={openWindow} />
          <Marquee />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Research />
          <Contact />
        </main>
      </div>

      <AnimatePresence>
        {active && (
          <FloatingWindow
            key={active}
            id={active}
            title={windows[active].title}
            code={windows[active].code}
            onClose={closeWindow}
          >
            <WindowContent id={active} />
          </FloatingWindow>
        )}
      </AnimatePresence>

      <CommandTerminal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpen={openWindow}
      />
    </SmoothScroll>
  )
}
