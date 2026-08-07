import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const words = ['AI', 'Software', 'ML', 'Data', 'Systems', 'Agents']

export function KineticLine() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((v) => (v + 1) % words.length), 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <p className="kinetic-line" aria-live="polite">
      <span className="kinetic-static">Building</span>
      <span className="kinetic-slot">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            className="kinetic-word"
            initial={{ y: '110%', opacity: 0, rotateX: -40 }}
            animate={{ y: '0%', opacity: 1, rotateX: 0 }}
            exit={{ y: '-110%', opacity: 0, rotateX: 40 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="kinetic-static">that ships.</span>
    </p>
  )
}
