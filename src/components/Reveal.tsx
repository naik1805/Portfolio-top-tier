import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.12, margin: '0px 0px -8% 0px' })
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    // Ensure content never stays invisible inside overflow popups / slow observers
    const t = window.setTimeout(() => setFallback(true), 700)
    return () => window.clearTimeout(t)
  }, [])

  const show = inView || fallback

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.65, delay: show ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxTitle({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
