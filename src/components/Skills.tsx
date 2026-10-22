import { useMemo, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { skillRadar, skills } from '../data/resume'
import { Reveal } from './Reveal'
import { useTheme } from '../theme'

const featured = new Set([
  'FastAPI',
  'Python',
  'Docker',
  'LangChain',
  'LLMs',
  'scikit-learn',
  'Next.js',
  'React',
  'MongoDB',
  'PostgreSQL',
  'GenAI & Agents',
  'TensorFlow',
])

const groups = [
  {
    id: 'backend',
    title: 'Backend & APIs',
    accent: '#FF4D2E',
    blurb: 'Production services & REST APIs',
    items: skills.backend,
  },
  {
    id: 'languages',
    title: 'Languages',
    accent: '#22C55E',
    blurb: 'Primary & compiled systems',
    items: skills.languages,
  },
  {
    id: 'ml',
    title: 'ML / AI',
    accent: '#FF4D2E',
    blurb: 'Agents, RAG & vision models',
    items: skills.ml,
  },
  {
    id: 'databases',
    title: 'Databases',
    accent: '#3B82F6',
    blurb: 'Relational, document & vector stores',
    items: skills.databases,
  },
  {
    id: 'frontend',
    title: 'Frontend',
    accent: '#22C55E',
    blurb: 'Interactive telemetry dashboards',
    items: skills.frontend,
  },
  {
    id: 'tools',
    title: 'Tools & Data',
    accent: '#3B82F6',
    blurb: 'Pipelines, testing & caching',
    items: skills.tools,
  },
]

function RadarChart({
  activeIndex,
  onHover,
}: {
  activeIndex: number | null
  onHover: (i: number | null) => void
}) {
  const { theme } = useTheme()
  const signal = theme === 'dark' ? '#FF4D2E' : '#EA3815'
  const oxide = theme === 'dark' ? '#22C55E' : '#15803D'
  const ink = theme === 'dark' ? '#F0F4F8' : '#0B0F15'
  const muted = theme === 'dark' ? '#8C9BB0' : '#4B5565'
  const gridStroke = theme === 'dark' ? 'rgba(240,244,248,0.1)' : 'rgba(11,15,21,0.08)'
  const size = 380
  const cx = size / 2
  const cy = size / 2
  const levels = 4
  const maxR = 110
  const n = skillRadar.length
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })

  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2

  const point = (i: number, r: number) => {
    const a = angle(i)
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }
  }

  const grid = useMemo(
    () =>
      Array.from({ length: levels }, (_, li) => {
        const r = (maxR / levels) * (li + 1)
        return skillRadar.map((_, i) => {
          const a = (Math.PI * 2 * i) / n - Math.PI / 2
          return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }
        })
      }),
    [cx, cy, levels, maxR, n],
  )

  const dataPts = skillRadar.map((s, i) => point(i, (s.value / 100) * maxR))
  const poly = dataPts.map((p) => `${p.x},${p.y}`).join(' ')

  const shortLabel = (label: string) => {
    if (label === 'System Design') return 'Sys Design'
    if (label === 'Data Pipelines') return 'Pipelines'
    if (label === 'Backend APIs') return 'Backend'
    return label
  }

  return (
    <div className="radar-panel">
      <div className="radar-glow" aria-hidden />
      <svg ref={ref} className="radar-wrap" viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <defs>
          <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={signal} stopOpacity="0.32" />
            <stop offset="100%" stopColor={signal} stopOpacity="0.04" />
          </radialGradient>
        </defs>

        {grid.map((ring, ri) => (
          <polygon
            key={ri}
            points={ring.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke={ri === levels - 1 ? `${signal}40` : gridStroke}
            strokeWidth={1}
          />
        ))}

        {skillRadar.map((_, i) => {
          const p = point(i, maxR)
          const hot = activeIndex === i
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke={hot ? `${signal}99` : gridStroke}
              strokeWidth={hot ? 1.5 : 1}
            />
          )
        })}

        <motion.polygon
          className="radar-data"
          points={poly}
          fill="url(#radarFill)"
          stroke={signal}
          strokeWidth={2.5}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {dataPts.map((p, i) => {
          const hot = activeIndex === i
          const color = i % 2 ? oxide : signal
          return (
            <g
              key={i}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
              style={{ cursor: 'pointer' }}
            >
              {hot && (
                <circle cx={p.x} cy={p.y} r={14} fill={color} opacity={0.15} />
              )}
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={hot ? 7 : 5}
                fill={color}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 280 }}
              />
            </g>
          )
        })}

        {skillRadar.map((s, i) => {
          const p = point(i, maxR + 36)
          const hot = activeIndex === i
          return (
            <text
              key={s.label}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={hot ? ink : muted}
              fontSize={hot ? 11 : 10}
              fontWeight={hot ? 600 : 400}
              fontFamily="IBM Plex Mono, monospace"
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
              style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
            >
              {shortLabel(s.label)}
            </text>
          )
        })}
      </svg>

      <div className="radar-metrics">
        {skillRadar.map((s, i) => {
          const hot = activeIndex === i || activeIndex === null
          return (
            <button
              key={s.label}
              type="button"
              className={`radar-metric${activeIndex === i ? ' active' : ''}`}
              style={{ opacity: hot ? 1 : 0.4 }}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(i)}
              onBlur={() => onHover(null)}
            >
              <div className="radar-metric-top">
                <span>{s.label}</span>
                <strong style={{ color: i % 2 ? oxide : signal }}>{s.value}%</strong>
              </div>
              <div className="radar-bar">
                <motion.div
                  className="radar-bar-fill"
                  style={{
                    background: i % 2 ? oxide : signal,
                  }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${s.value}%` } : {}}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function Skills() {
  const [activeRadar, setActiveRadar] = useState<number | null>(null)
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  return (
    <section className="section" id="skills">
      <Reveal>
        <span className="section-label">TECHNICAL COMPETENCY MATRIX</span>
        <h2 className="section-title">A stack engineered for AI & APIs.</h2>
        <p className="section-lead">
          From FastAPI microservices to RAG pipelines, semiconductor diagnostics, and distributed systems.
        </p>
      </Reveal>

      <div className="skills-layout">
        <Reveal delay={0.1}>
          <RadarChart activeIndex={activeRadar} onHover={setActiveRadar} />
        </Reveal>

        <div className="skill-groups">
          <div className="skill-filter">
            <button
              type="button"
              className={`skill-filter-btn${!activeGroup ? ' active' : ''}`}
              onClick={() => setActiveGroup(null)}
              style={{ position: 'relative' }}
            >
              {!activeGroup && (
                <motion.span
                  layoutId="skillFilterPill"
                  className="filter-pill-bg"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}
              <span className="filter-btn-text">All Skills</span>
            </button>

            {groups.map((g) => {
              const isSelected = activeGroup === g.id
              return (
                <button
                  key={g.id}
                  type="button"
                  className={`skill-filter-btn${isSelected ? ' active' : ''}`}
                  onClick={() => setActiveGroup((cur) => (cur === g.id ? null : g.id))}
                  style={{ position: 'relative' }}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="skillFilterPill"
                      className="filter-pill-bg"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="filter-btn-text">{g.title}</span>
                </button>
              )
            })}
          </div>

          <div className="skill-cards">
            <AnimatePresence mode="popLayout">
              {groups
                .filter((g) => !activeGroup || g.id === activeGroup)
                .map((g, gi) => (
                  <motion.article
                    key={g.id}
                    className="skill-card"
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ delay: 0.04 * gi, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{ ['--skill-accent' as string]: g.accent }}
                  >
                    <header className="skill-card-head">
                      <div>
                        <h3>{g.title}</h3>
                        <p>{g.blurb}</p>
                      </div>
                      <span className="skill-count">{g.items.length}</span>
                    </header>
                    <div className="skill-chips">
                      {g.items.map((item, ii) => {
                        const isFeatured = featured.has(item)
                        return (
                          <motion.span
                            key={item}
                            className={`skill-chip${isFeatured ? ' featured' : ''}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.02 * ii }}
                            whileHover={{ y: -2, scale: 1.03 }}
                          >
                            {isFeatured && <span className="skill-chip-dot" />}
                            {item}
                          </motion.span>
                        )
                      })}
                    </div>
                  </motion.article>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
