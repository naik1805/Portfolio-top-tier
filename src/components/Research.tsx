import { Award, BookOpen, GraduationCap, Trophy } from 'lucide-react'
import { achievements, education, publications } from '../data/resume'
import { CornerTicks } from './CornerTicks'
import { Reveal } from './Reveal'

export function Research() {
  return (
    <section className="section" id="research">
      <Reveal>
        <span className="section-label">ACADEMIC & RESEARCH CONTRIBUTIONS</span>
        <h2 className="section-title">Published. Peer-reviewed. Building next.</h2>
        <p className="section-lead">
          Dual-published machine learning research across deepfake detection systems and decentralized blockchain frameworks.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="pub-list">
          {publications.map((pub, i) => (
            <article key={pub.title} className="pub-item" style={{ position: 'relative' }}>
              <CornerTicks size={8} />
              <span className="pub-index">0{i + 1}</span>
              <div className="pub-info">
                <div className="pub-venue-badge">
                  <BookOpen size={13} className="inline-icon" />
                  <span>{i === 0 ? 'ICAIH 2025' : 'IEEE Xplore'}</span>
                </div>
                <h3 className="pub-title">{pub.title}</h3>
                <p className="pub-venue">{pub.venue}</p>
              </div>
              <span className="pub-badge">
                <Award size={12} className="inline-icon" /> {pub.type}
              </span>
            </article>
          ))}
        </div>
      </Reveal>

      <div className="edu-block">
        <Reveal delay={0.15}>
          <div className="edu-card" style={{ position: 'relative' }}>
            <CornerTicks size={8} />
            <div className="edu-card-head">
              <GraduationCap size={16} className="edu-icon" />
              <h3>Education</h3>
            </div>
            <p className="edu-degree">{education.degree}</p>
            <p className="edu-school">{education.school}</p>
            <p className="edu-period">{education.period}</p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="achieve-card" style={{ position: 'relative' }}>
            <CornerTicks size={8} />
            <div className="edu-card-head">
              <Trophy size={16} className="achieve-icon" />
              <h3>Honors & Competitions</h3>
            </div>
            <ul>
              {achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
