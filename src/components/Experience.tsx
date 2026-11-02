import { useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { Building2, Calendar, MapPin } from 'lucide-react'
import { experience } from '../data/resume'
import { CornerTicks } from './CornerTicks'
import { Reveal } from './Reveal'

export function Experience() {
  const [hovered, setHovered] = useState<number | null>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <section className="section" id="experience">
      <Reveal>
        <span className="section-label">PRODUCTION HISTORY</span>
        <h2 className="section-title">Shipping AI into production systems.</h2>
        <p className="section-lead">
          Engineering roles focused on semiconductor diagnostic engines, autonomous agents, and real-time streaming data pipelines.
        </p>
      </Reveal>

      <div className="timeline">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={0.1 * i}>
            <motion.article
              className={`timeline-item${job.current ? ' current' : ''}${hovered === i ? ' is-hot' : ''}${hovered !== null && hovered !== i ? ' is-dim' : ''}`}
              style={{ ['--exp-accent' as string]: job.accent }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            >
              <div className="timeline-rail">
                <div className="timeline-dot">
                  {job.current && <span className="timeline-pulse" />}
                </div>
              </div>

              <div className="exp-card" onMouseMove={handleMouseMove} style={{ position: 'relative' }}>
                <CornerTicks size={8} />
                <div className="card-spotlight" aria-hidden />

                <div className="exp-top">
                  <div className="exp-badges">
                    {job.current && <span className="exp-live">Active Engagement</span>}
                    <span className="exp-focus">{job.focus}</span>
                  </div>
                  <span className="exp-period">
                    <Calendar size={12} className="inline-icon" /> {job.period}
                  </span>
                </div>

                <div className="exp-header">
                  <h3 className="exp-role">{job.role}</h3>
                  <p className="exp-company">
                    <Building2 size={14} className="inline-icon" />
                    <strong>{job.company}</strong>
                    <span className="exp-sep">·</span>
                    <MapPin size={13} className="inline-icon" />
                    <span>{job.location}</span>
                  </p>
                </div>

                <ul className="exp-list">
                  {job.highlights.map((h) => (
                    <li key={h.slice(0, 48)}>
                      <span className="exp-bullet" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="exp-tags">
                  {job.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
