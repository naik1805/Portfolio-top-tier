import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { profile } from '../data/resume'
import { Reveal } from './Reveal'

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (inView) motionVal.set(value)
  }, [inView, motionVal, value])

  useEffect(() => {
    const unsub = spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`
    })
    return unsub
  }, [spring, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export function About() {
  return (
    <section className="section" id="about">
      <Reveal>
        <div className="section-label">Fig. 01 — Profile</div>
        <h2 className="section-title">Engineer at the edge of AI & silicon.</h2>
        <p className="section-lead">
          Dual-published researcher shipping production diagnostics, agent pipelines, and backend systems.
        </p>
      </Reveal>

      <div className="about-grid">
        <Reveal className="about-text" delay={0.1}>
          <p>{profile.summary}</p>
          <p>
            Currently at Verileumen Labs building AI agents for semiconductor ATE workflows — from
            scan-chain fault localization to confidence-scored root-cause prediction served over FastAPI.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="stat-grid">
            <div className="stat-cell">
              <div className="stat-value">
                <Counter value={2} />
              </div>
              <div className="stat-label">Peer-reviewed papers</div>
            </div>
            <div className="stat-cell">
              <div className="stat-value">
                <Counter value={40} suffix="%" />
              </div>
              <div className="stat-label">Latency cut (pipelines)</div>
            </div>
            <div className="stat-cell">
              <div className="stat-value">
                <Counter value={12} />
              </div>
              <div className="stat-label">KPI dashboard cards</div>
            </div>
            <div className="stat-cell">
              <div className="stat-value">
                <Counter value={2} suffix="s" />
              </div>
              <div className="stat-label">Offline LLM response</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
