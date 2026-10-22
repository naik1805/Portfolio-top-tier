import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Cpu, Sparkles } from 'lucide-react'
import { profile } from '../data/resume'
import { KineticLine } from './KineticLine'
import { MagneticButton } from './MagneticButton'

const NeuralScene = lazy(() =>
  import('./NeuralScene').then((m) => ({ default: m.NeuralScene })),
)

export function Hero() {
  const [hudTime, setHudTime] = useState('--:--:--')
  const { scrollY } = useScroll()
  const visualY = useTransform(scrollY, [0, 600], [0, 80])
  const copyY = useTransform(scrollY, [0, 600], [0, -30])
  const opacity = useTransform(scrollY, [0, 480], [1, 0.4])

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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="top">
      <motion.div className="hero-copy" style={{ y: copyY, opacity }}>
        <motion.div
          className="hero-status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="hero-status-dot" />
          <span>Available for AI · ML · Systems Engineering</span>
        </motion.div>

        <motion.div
          className="hero-headline-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="hero-brand" aria-label={profile.name}>
            MOHITH <span className="hero-accent-mark">S</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <KineticLine />
        </motion.div>

        <motion.p
          className="hero-role"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.6 }}
        >
          Dual-published AI Systems Engineer specialized in semiconductor ATE diagnostics, autonomous agents, and high-throughput Python backends.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <MagneticButton
            className="btn-primary"
            onClick={() => scrollTo('projects')}
          >
            Explore Systems <Cpu size={16} />
          </MagneticButton>
          <MagneticButton
            className="btn-ghost"
            onClick={() => scrollTo('contact')}
          >
            Get in touch <ArrowUpRight size={16} />
          </MagneticButton>
        </motion.div>

        <motion.div
          className="hero-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.6 }}
        >
          <span className="hero-meta-item">
            <strong>LOC</strong> {profile.location}
          </span>
          <span className="hero-meta-item">
            <strong>PUB</strong> ICAIH 2025 · IEEE Xplore
          </span>
          <a
            className="hero-meta-item"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            <strong>GH</strong> naik1805
          </a>
          <span className="hero-cmd-tip">
            <Sparkles size={12} className="tip-sparkle" /> Press <kbd>/</kbd> for command HUD
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visual"
        style={{ y: visualY }}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-visual-stage">
          <Suspense fallback={<div className="neural-fallback" />}>
            <NeuralScene />
          </Suspense>
          <div className="hero-visual-caption">
            <div className="caption-live-indicator">
              <span className="caption-pulse" />
              <span>DIAGNOSTIC GRAPH</span>
            </div>
            <span className="caption-time">{hudTime} IST</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="hero-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        onClick={() => scrollTo('about')}
      >
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown size={14} className="scroll-arrow" />
      </motion.div>
    </section>
  )
}
