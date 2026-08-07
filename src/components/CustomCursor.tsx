import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useSpring(dotX, { stiffness: 280, damping: 28 })
  const ringY = useSpring(dotY, { stiffness: 180, damping: 24 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const finePointer = useRef(false)

  useEffect(() => {
    finePointer.current = window.matchMedia('(pointer: fine)').matches
    if (!finePointer.current) return

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      setVisible(true)
    }

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      if (!t) return
      const interactive = t.closest(
        'a, button, .skill-chip, .project-card, .contact-link, .traffic, .radar-metric, .skill-filter-btn',
      )
      setHovering(Boolean(interactive))
    }

    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', leave)
    }
  }, [dotX, dotY])

  if (!visible) return null

  return (
    <>
      <motion.div className="cursor-dot" style={{ x: dotX, y: dotY }} />
      <motion.div
        className={`cursor-ring${hovering ? ' hover' : ''}`}
        style={{ x: ringX, y: ringY }}
      />
    </>
  )
}
