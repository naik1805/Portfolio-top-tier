import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, LayoutGrid } from 'lucide-react'
import type { WindowId } from '../types'
import { profile } from '../data/resume'
import { KineticLine } from './KineticLine'
import { MagneticButton } from './MagneticButton'

const NeuralScene = lazy(() =>
  import('./NeuralScene').then((m) => ({ default: m.NeuralScene })),
)

const brandLetters = profile.brand.split('')

type Props = {
  onOpen: (id: WindowId) => void
}

export function Hero({ onOpen }: Props) {
  const [hudTime, setHudTime] = useState('--:--:--')
  const { scrollY } = useScroll()
  const visualY = useTransform(scrollY, [0, 500], [0, 90])
  const copyY = useTransform(scrollY, [0, 500], [0, -40])
  const opacity = useTransform(scrollY, [0, 420], [1, 0.35])

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setHudTime(
        now.toLocaleTimeString('en-IN', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="hero" id="top">
      <motion.div className="hero-copy" style={{ y: copyY, opacity }}>
        <motion.div
          className="hero-status"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="hero-status-dot" />
          Available for AI · ML · software roles
        </motion.div>

        <h1 className="hero-brand" aria-label={profile.name}>
          {brandLetters.map((letter, i) => {
            const isLast = i === brandLetters.length - 1
            return (
              <motion.span
                key={`${letter}-${i}`}
                className={isLast ? 'accent' : undefined}
                initial={{ opacity: 0, y: 80, rotateX: 50 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.85,
                  delay: 0.25 + 0.06 * i,
                  ease: [0.76, 0, 0.24, 1],
                }}
                style={{
                  display: 'inline-block',
                  transformOrigin: 'bottom',
                  width: letter === ' ' ? '0.35em' : undefined,
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            )
          })}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          <KineticLine />
        </motion.div>

        <motion.p
          className="hero-role"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {profile.role}
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
        >
          <MagneticButton
            className="btn-primary"
            onClick={() => {
              onOpen('projects')
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View projects <LayoutGrid size={16} />
          </MagneticButton>
          <MagneticButton
            className="btn-ghost"
            onClick={() => {
              onOpen('contact')
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Contact <ArrowUpRight size={16} />
          </MagneticButton>
        </motion.div>

        <motion.div
          className="hero-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <span>
            <strong>LOC</strong> {profile.location}
          </span>
          <span>
            <strong>PUB</strong> ICAIH · IEEE
          </span>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <strong>GH</strong> naik1805
          </a>
          <span className="hero-cmd-tip">
            Press <kbd>/</kbd> for terminal
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visual"
        style={{ y: visualY }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.45, duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="hero-visual-stage">
          <Suspense fallback={null}>
            <NeuralScene />
          </Suspense>
          <div className="hero-visual-caption">
            <span>Diagnostic graph</span>
            <span>{hudTime}</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
