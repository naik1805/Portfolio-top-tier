import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects } from '../data/resume'
import { Reveal } from './Reveal'

const meta = [
  { status: 'Production', focus: 'Semiconductor · ATE' },
  { status: 'Privacy-first', focus: 'Local LLM · RAG' },
  { status: 'Published', focus: 'ICAIH 2025 · Research' },
]

type Props = {
  /** Vertical stack for popup windows; rail for the main page */
  layout?: 'rail' | 'stack'
}

export function Projects({ layout = 'rail' }: Props) {
  const [hovered, setHovered] = useState<number | null>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0.05, 0.95], ['4%', '-35%'])
  const isStack = layout === 'stack'

  return (
    <section className={`section projects-section${isStack ? ' is-stack' : ''}`} id={isStack ? undefined : 'projects'}>
      <Reveal>
        <div className="section-label">Fig. 04 — Selected work</div>
        <h2 className="section-title">Systems that diagnose, reason & detect.</h2>
        <p className="section-lead">
          Full-stack diagnostic tooling, privacy-first local agents, and research-grade deepfake detection.
        </p>
      </Reveal>

      <div className={`projects-rail-wrap${isStack ? ' is-stack' : ''}`} ref={isStack ? undefined : railRef}>
        <motion.div
          className={`projects-rail${isStack ? ' is-stack' : ''}`}
          style={isStack ? undefined : { x }}
        >
          {projects.map((p, i) => (
            <motion.article
              key={p.acronym}
              className={`project-card${hovered === i ? ' is-hot' : ''}${hovered !== null && hovered !== i ? ' is-dim' : ''}`}
              style={{ ['--accent' as string]: p.accent }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              whileHover={isStack ? { y: -4 } : { y: -10 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <div className="project-visual" aria-hidden>
                <div className="project-orb project-orb-a" />
                <div className="project-orb project-orb-b" />
                <div className="project-grid-lines" />
                <div className="project-visual-top">
                  <span className="project-index">0{i + 1}</span>
                  <span className="project-status">{meta[i]?.status}</span>
                </div>
                <div className="project-mark">{p.acronym}</div>
                <div className="project-focus">{meta[i]?.focus}</div>
              </div>

              <div className="project-body">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>

                <ul className="project-details">
                  {p.details.map((d) => (
                    <li key={d}>
                      <span className="project-check" />
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="project-stack">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
