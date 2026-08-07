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
    accent: '#C23B22',
    blurb: 'Production services & REST',
    items: skills.backend,
  },
  {
    id: 'languages',
    title: 'Languages',
    accent: '#1A5F4A',
    blurb: 'Primary & supporting',
    items: skills.languages,
  },
  {
    id: 'ml',
    title: 'ML / AI',
    accent: '#2F3B4A',
    blurb: 'Agents, RAG & models',
    items: skills.ml,
  },
  {
    id: 'databases',
    title: 'Databases',
    accent: '#C23B22',
    blurb: 'SQL & NoSQL',
    items: skills.databases,
  },
  {
    id: 'frontend',
    title: 'Frontend',
    accent: '#1A5F4A',
    blurb: 'Dashboards that ship',
    items: skills.frontend,
  },
  {
    id: 'tools',
    title: 'Tools & Data',
    accent: '#2F3B4A',
    blurb: 'Pipelines & analytics',
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
  const signal = theme === 'dark' ? '#E85D3D' : '#C23B22'
  const oxide = theme === 'dark' ? '#3DBA8E' : '#1A5F4A'
  const ink = theme === 'dark' ? '#E8EEF4' : '#12161C'
  const muted = theme === 'dark' ? '#9AA6B5' : '#7A858F'
  const gridStroke = theme === 'dark' ? 'rgba(232,238,244,0.12)' : 'rgba(18,22,28,0.1)'
  const size = 380
  const cx = size / 2
  const cy = size / 2
  const levels = 4
  const maxR = 110
  const n = skillRadar.length
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

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
            <stop offset="0%" stopColor={signal} stopOpacity="0.28" />
            <stop offset="100%" stopColor={signal} stopOpacity="0.04" />
          </radialGradient>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
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
              stroke={hot ? `${signal}8c` : gridStroke}
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
          initial={{ opacity: 0, scale: 0.55 }}
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
                <circle cx={p.x} cy={p.y} r={14} fill={color} opacity={0.12} />
              )}
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={hot ? 7 : 5}
                fill={color}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.35 + i * 0.08, type: 'spring', stiffness: 260 }}
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
              style={{ opacity: hot ? 1 : 0.35 }}
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
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
        <div className="section-label">Fig. 02 — Capabilities</div>
        <h2 className="section-title">A stack built for agents & APIs.</h2>
        <p className="section-lead">
          From FastAPI microservices to RAG pipelines and semiconductor diagnostics — depth where it counts.
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
            >
              All
            </button>
            {groups.map((g) => (
              <button
                key={g.id}
                type="button"
                className={`skill-filter-btn${activeGroup === g.id ? ' active' : ''}`}
                style={
                  activeGroup === g.id
                    ? { borderColor: g.accent, color: g.accent, background: `${g.accent}22` }
                    : undefined
                }
                onClick={() => setActiveGroup((cur) => (cur === g.id ? null : g.id))}
              >
                {g.title}
              </button>
            ))}
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
                    transition={{ delay: 0.04 * gi, duration: 0.4 }}
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
                            transition={{ delay: 0.03 * ii }}
                            whileHover={{ y: -3, scale: 1.04 }}
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
