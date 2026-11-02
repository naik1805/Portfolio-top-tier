import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  Check,
  Copy,
} from 'lucide-react'
import { profile } from '../data/resume'
import { CornerTicks } from './CornerTicks'
import { RivetWorkbench } from './RivetWorkbench'

type Platform = 'claude' | 'cursor' | 'codex' | 'terminal'

const PLATFORMS: { id: Platform; label: string; command: string }[] = [
  {
    id: 'terminal',
    label: 'Terminal',
    command: 'npx mohith-diagnostics@latest --inspect',
  },
  {
    id: 'claude',
    label: 'Claude Code',
    command: '/inspect https://github.com/naik1805/mohith-systems',
  },
  {
    id: 'cursor',
    label: 'Cursor',
    command: '@mohith explore production-systems',
  },
  {
    id: 'codex',
    label: 'Codex / API',
    command: 'curl -sL https://systems.mohith.dev/spec.json',
  },
]

export function Hero() {
  const [activePlatform, setActivePlatform] = useState<Platform>('terminal')
  const [copied, setCopied] = useState(false)
  const [hudTime, setHudTime] = useState('--:--:--')

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

  const currentCommand =
    PLATFORMS.find((p) => p.id === activePlatform)?.command || PLATFORMS[0].command

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch {
      // Fallback
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    }
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="rivet-hero-section" id="top">
      {/* Top Banner & Status Lockup */}
      <div className="rivet-hero-container">
        <motion.div
          className="rivet-brand-lockup"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="brand-bolt-icon" aria-hidden>
            <span className="bolt-shape" />
          </div>
          <span className="brand-title-text">MOHITH S</span>
          <span className="brand-slash-sep">/</span>
          <span className="brand-role-sub">AI ENGINEER · SEMICONDUCTORS</span>
          <span className="brand-dot-sep">·</span>
          <span className="brand-status-live">
            <span className="pulse-dot" /> AVAILABLE FOR ROLES
          </span>
        </motion.div>

        {/* Hero Title & Value Proposition */}
        <div className="rivet-hero-headline-block">
          <motion.h1
            className="rivet-hero-display"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Dual-engine AI and systems engineer on the frontier of code and silicon.
          </motion.h1>

          <motion.p
            className="rivet-hero-lead"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Building high-throughput semiconductor diagnostic engines, autonomous agent architectures,
            and privacy-first airgapped models that ship from raw telemetry into production. Dual-published researcher in ICAIH 2025 and IEEE Xplore.
          </motion.p>
        </div>

        {/* Signature Rivet Platform Prompt Bar */}
        <motion.div
          className="rivet-prompt-bar-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rivet-prompt-box">
            <CornerTicks size={8} />

            {/* Platform Selector Tabs */}
            <div className="prompt-platform-tabs">
              {PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  type="button"
                  className={`platform-tab ${activePlatform === platform.id ? 'is-active' : ''}`}
                  onClick={() => setActivePlatform(platform.id)}
                >
                  {platform.label}
                </button>
              ))}
            </div>

            {/* Command Display & Copy Trigger */}
            <div className="prompt-command-row">
              <div className="command-code-text">
                <span className="prompt-dollar">&gt;</span>
                <span className="command-string">{currentCommand}</span>
              </div>

              <button
                type="button"
                className="command-copy-btn"
                onClick={handleCopy}
                aria-label="Copy command to clipboard"
                title="Copy command"
              >
                {copied ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Quick HUD Hint */}
          <div className="hero-prompt-meta">
            <span className="prompt-meta-item">
              <span className="key-kbd">/</span> opens Command HUD
            </span>
            <span className="prompt-meta-divider">·</span>
            <span className="prompt-meta-item">
              <strong>LOC</strong> {profile.location}
            </span>
            <span className="prompt-meta-divider">·</span>
            <span className="prompt-meta-item">
              <strong>PUB</strong> ICAIH 2025 & IEEE Xplore
            </span>
            <span className="prompt-meta-divider">·</span>
            <span className="prompt-meta-item">
              <strong>TIME</strong> {hudTime} IST
            </span>
          </div>
        </motion.div>

        {/* Centerpiece: Interactive Rivet Workbench */}
        <motion.div
          className="rivet-hero-workbench-mount"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <RivetWorkbench />
        </motion.div>

        {/* Scroll Cue */}
        <div className="rivet-scroll-cue" onClick={() => scrollTo('skills')}>
          <span>EXPLORE ARCHITECTURE & RESEARCH</span>
          <ArrowDown size={14} className="scroll-arrow-icon" />
        </div>
      </div>
    </section>
  )
}
