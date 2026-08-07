import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Minus, Square, X } from 'lucide-react'
import type { ReactNode } from 'react'

type Props = {
  id: string
  title: string
  code: string
  onClose: () => void
  children: ReactNode
}

export function FloatingWindow({ id, title, code, onClose, children }: Props) {
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    // Focus body so wheel/trackpad scroll targets the popup, not the page
    bodyRef.current?.focus()
  }, [])

  return (
    <motion.div
      className="window-layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button className="window-backdrop" aria-label="Close window" onClick={onClose} />
      <motion.div
        className="floating-window"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`window-title-${id}`}
        initial={{ opacity: 0, scale: 0.92, y: 36 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onWheel={(e) => e.stopPropagation()}
      >
        <header className="window-chrome">
          <div className="window-traffic">
            <button type="button" className="traffic close" aria-label="Close" onClick={onClose}>
              <X size={10} strokeWidth={3} />
            </button>
            <button type="button" className="traffic minimize" aria-label="Minimize" onClick={onClose}>
              <Minus size={10} strokeWidth={3} />
            </button>
            <span className="traffic maximize" aria-hidden>
              <Square size={8} strokeWidth={3} />
            </span>
          </div>
          <div className="window-title-wrap">
            <span className="window-code">{code}</span>
            <h2 id={`window-title-${id}`} className="window-title">
              {title}
            </h2>
          </div>
          <button type="button" className="window-esc" onClick={onClose}>
            ESC
          </button>
        </header>
        <div className="window-body" ref={bodyRef} tabIndex={0}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}
