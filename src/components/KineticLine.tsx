import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const phrases = [
  'AI Systems',
  'ML Pipelines',
  'Autonomous Agents',
  'FastAPI Services',
  'Silicon Diagnostics',
  'Production Models',
]

export function KineticLine() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((v) => (v + 1) % phrases.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <p className="kinetic-line" aria-live="polite">
      <span className="kinetic-static">Engineering</span>
      <span className="kinetic-slot">
        <AnimatePresence mode="wait">
          <motion.span
            key={phrases[index]}
            className="kinetic-word"
            initial={{ y: '100%', opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: '-100%', opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {phrases[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="kinetic-static">that ship to production.</span>
    </p>
  )
}
