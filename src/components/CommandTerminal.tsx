import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { WindowId } from '../types'

type Props = {
  open: boolean
  onClose: () => void
  onOpen: (id: WindowId) => void
}

const commands: { cmd: string; hint: string; action: string }[] = [
  { cmd: 'home', hint: 'Scroll to top', action: 'home' },
  { cmd: 'about', hint: 'Open about', action: 'about' },
  { cmd: 'skills', hint: 'Open skills', action: 'skills' },
  { cmd: 'experience', hint: 'Open experience', action: 'experience' },
  { cmd: 'projects', hint: 'Open projects', action: 'projects' },
  { cmd: 'research', hint: 'Open research', action: 'research' },
  { cmd: 'contact', hint: 'Open contact', action: 'contact' },
  { cmd: 'github', hint: 'Open GitHub', action: 'github' },
  { cmd: 'invert', hint: 'Toggle negative mode', action: 'invert' },
  { cmd: 'close', hint: 'Close terminal', action: 'close' },
]

export function CommandTerminal({ open, onClose, onOpen }: Props) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => c.cmd.includes(q) || c.hint.toLowerCase().includes(q))
  }, [query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    const t = setTimeout(() => inputRef.current?.focus(), 80)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

  const run = (action: string) => {
    if (action === 'close') {
      onClose()
      return
    }
    if (action === 'home') {
      document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })
      onClose()
      return
    }
    if (action === 'github') {
      window.open('https://github.com/naik1805', '_blank', 'noreferrer')
      onClose()
      return
    }
    if (action === 'invert') {
      document.documentElement.classList.toggle('negative')
      onClose()
      return
    }
    onOpen(action as WindowId)
    document.getElementById(action)?.scrollIntoView({ behavior: 'smooth' })
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="terminal-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className="terminal-backdrop" aria-label="Close terminal" onClick={onClose} />
          <motion.div
            className="terminal"
            role="dialog"
            aria-label="Command terminal"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <div className="terminal-head">
              <span>TOS Command Terminal</span>
              <button type="button" onClick={onClose}>
                ESC
              </button>
            </div>
            <label className="terminal-input-row">
              <span>:/</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter command…"
                onKeyDown={(e) => {
                  if (e.key === 'Escape') onClose()
                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    setActive((v) => Math.min(v + 1, filtered.length - 1))
                  }
                  if (e.key === 'ArrowUp') {
                    e.preventDefault()
                    setActive((v) => Math.max(v - 1, 0))
                  }
                  if (e.key === 'Enter' && filtered[active]) run(filtered[active].action)
                }}
              />
            </label>
            <p className="terminal-hint">
              Start typing — or pick a prompt. Press <kbd>/</kbd> anytime to reopen.
            </p>
            <ul className="terminal-list">
              {filtered.map((c, i) => (
                <li key={c.cmd}>
                  <button
                    type="button"
                    className={i === active ? 'active' : ''}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => run(c.action)}
                  >
                    <span>{c.cmd}</span>
                    <em>{c.hint}</em>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
