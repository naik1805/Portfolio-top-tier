import { useEffect, useRef, type MouseEvent } from 'react'
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
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <section className="section" id="about">
      <Reveal>
        <span className="section-label">BACKGROUND & SPECIALIZATION</span>
        <h2 className="section-title">Engineer at the intersection of AI & silicon.</h2>
        <p className="section-lead">
          Dual-published researcher shipping production diagnostics, autonomous agent pipelines, and high-throughput backend services.
        </p>
      </Reveal>

      <div className="about-grid">
        <Reveal className="about-text" delay={0.1}>
          <p>{profile.summary}</p>
          <p>
            Currently at Verileumen Labs building AI agents for semiconductor ATE workflows: from
            scan-chain fault localization to confidence-scored root-cause prediction served over FastAPI and containerized with Docker.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="stat-grid">
            <div className="stat-cell" onMouseMove={handleMouseMove}>
              <div className="stat-value">
                <Counter value={2} />
              </div>
              <div className="stat-label">Peer-reviewed publications (ICAIH & IEEE)</div>
            </div>
            <div className="stat-cell" onMouseMove={handleMouseMove}>
              <div className="stat-value">
                <Counter value={40} suffix="%" />
              </div>
              <div className="stat-label">Processing latency cut on real-time pipelines</div>
            </div>
            <div className="stat-cell" onMouseMove={handleMouseMove}>
              <div className="stat-value">
                <Counter value={12} />
              </div>
              <div className="stat-label">Production KPI diagnostics dashboard cards</div>
            </div>
            <div className="stat-cell" onMouseMove={handleMouseMove}>
              <div className="stat-value">
                <Counter value={2} suffix="s" />
              </div>
              <div className="stat-label">Offline 4-bit GGUF quantized TTFT latency</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
