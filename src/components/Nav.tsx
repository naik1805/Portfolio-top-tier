import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Mail, Menu, Moon, Sun, Terminal, X } from 'lucide-react'
import type { WindowId } from '../types'
import { profile } from '../data/resume'
import { useTheme } from '../theme'

const links: { id: WindowId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
]

type Props = {
  active: WindowId | null
  onOpen: (id: WindowId) => void
  onOpenTerminal: () => void
}

export function Nav({ active, onOpen, onOpenTerminal }: Props) {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [sectionActive, setSectionActive] = useState<WindowId | null>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setSectionActive(entry.target.id as WindowId)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const goTo = (id: WindowId) => {
    onOpen(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const highlight = active ?? sectionActive

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <header className={`nav${scrolled || active ? ' scrolled' : ''}`}>
        <a href="#top" className="nav-brand">
          MOHITH <span>S</span>
        </a>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                className={highlight === l.id ? 'active' : ''}
                onClick={() => goTo(l.id)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <button
            type="button"
            className="nav-theme"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Dark mode' : 'Light mode'}
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          <button
            type="button"
            className="nav-cmd"
            onClick={onOpenTerminal}
            aria-label="Open command terminal"
            title="Press /"
          >
            <Terminal size={14} />
            <kbd>/</kbd>
          </button>
          <a
            className="nav-github"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.23 0 1.61-.01 2.91-.01 3.3 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a className="nav-cta" href={`mailto:${profile.email}`}>
            <Mail size={14} /> Hire me
          </a>
        </div>
        <div className="nav-mobile-tools">
          <button
            type="button"
            className="nav-theme"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="nav-mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((l, i) => (
              <motion.button
                key={l.id}
                type="button"
                onClick={() => {
                  goTo(l.id)
                  setMenuOpen(false)
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                {l.label}
              </motion.button>
            ))}
            <button
              type="button"
              onClick={() => {
                toggleTheme()
                setMenuOpen(false)
              }}
            >
              {theme === 'light' ? 'Dark mode' : 'Light mode'}
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenTerminal()
                setMenuOpen(false)
              }}
            >
              Terminal /
            </button>
            <a href={profile.github} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
              GitHub
            </a>
            <a href={`mailto:${profile.email}`} onClick={() => setMenuOpen(false)}>
              Email
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
