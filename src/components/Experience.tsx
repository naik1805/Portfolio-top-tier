import { useState } from 'react'
import { motion } from 'framer-motion'
import { experience } from '../data/resume'
import { Reveal } from './Reveal'

export function Experience() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="section" id="experience">
      <Reveal>
        <div className="section-label">Fig. 03 — Experience</div>
        <h2 className="section-title">Shipping AI into production systems.</h2>
        <p className="section-lead">
          Internships focused on diagnostic engines, recommendation systems, and real-time data pipelines.
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
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            >
              <div className="timeline-rail">
                <div className="timeline-dot">
                  {job.current && <span className="timeline-pulse" />}
                </div>
              </div>

              <div className="exp-card">
                <div className="exp-card-glow" aria-hidden />

                <div className="exp-top">
                  <div className="exp-badges">
                    {job.current && <span className="exp-live">Now live</span>}
                    <span className="exp-focus">{job.focus}</span>
                  </div>
                  <span className="exp-period">{job.period}</span>
                </div>

                <div className="exp-header">
                  <h3 className="exp-role">{job.role}</h3>
                  <p className="exp-company">
                    <strong>{job.company}</strong>
                    <span className="exp-sep">·</span>
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
