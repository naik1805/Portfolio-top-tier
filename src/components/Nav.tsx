import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Menu, Moon, Sun, Terminal, X } from 'lucide-react'
import type { WindowId } from '../types'
import { useTheme } from '../theme'

const links: { id: WindowId; label: string }[] = [
  { id: 'projects', label: 'Directions' },
  { id: 'skills', label: 'Capabilities' },
  { id: 'experience', label: 'Experience' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
]

type Props = {
  activeSection?: WindowId | null
  onOpenTerminal: () => void
}

export function Nav({ onOpenTerminal }: Props) {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentSection, setCurrentSection] = useState<WindowId>('projects')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
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
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id as WindowId)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: WindowId) => {
    setCurrentSection(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <motion.div className="rivet-scroll-progress" style={{ scaleX }} />
      <header className={`rivet-nav-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="rivet-nav-inner">
          {/* Brand Lockup */}
          <a
            href="#top"
            className="rivet-nav-brand"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <div className="nav-monogram">
              <span className="mono-letter">M</span>
            </div>
            <div className="nav-brand-text">
              <span className="nav-brand-name">MOHITH S</span>
              <span className="nav-brand-tag">SYSTEMS</span>
            </div>
          </a>

          {/* Navigation Links Capsule */}
          <nav className="rivet-nav-links-wrap" aria-label="Main Navigation">
            <ul className="rivet-nav-links">
              {links.map((l) => {
                const isActive = currentSection === l.id
                return (
                  <li key={l.id} className="nav-link-item">
                    <button
                      type="button"
                      className={`nav-link-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => scrollToSection(l.id)}
                    >
                      {isActive && <span className="nav-active-pip" />}
                      <span>{l.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right Action Tools */}
          <div className="rivet-nav-actions">
            {/* Terminal Command Button */}
            <button
              type="button"
              className="nav-terminal-trigger"
              onClick={onOpenTerminal}
              title="Open Command Terminal (/)"
            >
              <Terminal size={13} />
              <span className="nav-cmd-text">CLI</span>
              <kbd className="nav-cmd-kbd">/</kbd>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              className="nav-theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Primary Contact CTA */}
            <button
              type="button"
              className="nav-cta-btn"
              onClick={() => scrollToSection('contact')}
            >
              <span>Get in touch</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="nav-mobile-burger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="rivet-mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu-inner">
              <nav className="mobile-links-list">
                {links.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    className={`mobile-link-item ${currentSection === l.id ? 'is-active' : ''}`}
                    onClick={() => {
                      setMenuOpen(false)
                      scrollToSection(l.id)
                    }}
                  >
                    <span>{l.label}</span>
                    <ArrowUpRight size={16} />
                  </button>
                ))}
              </nav>

              <div className="mobile-actions-row">
                <button
                  type="button"
                  className="mobile-cli-btn"
                  onClick={() => {
                    setMenuOpen(false)
                    onOpenTerminal()
                  }}
                >
                  <Terminal size={15} />
                  <span>Command HUD (/)</span>
                </button>

                <button
                  type="button"
                  className="mobile-theme-btn"
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
