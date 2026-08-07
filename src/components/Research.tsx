import { achievements, education, publications } from '../data/resume'
import { Reveal } from './Reveal'

export function Research() {
  return (
    <section className="section" id="research">
      <Reveal>
        <div className="section-label">Fig. 05 — Research & credentials</div>
        <h2 className="section-title">Published. Awarded. Building next.</h2>
        <p className="section-lead">
          Peer-reviewed work in deepfake detection and AI-blockchain civic systems, plus hands-on wins.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="pub-list">
          {publications.map((pub, i) => (
            <article key={pub.title} className="pub-item">
              <span className="pub-index">0{i + 1}</span>
              <div>
                <h3 className="pub-title">{pub.title}</h3>
                <p className="pub-venue">{pub.venue}</p>
              </div>
              <span className="pub-badge">{pub.type}</span>
            </article>
          ))}
        </div>
      </Reveal>

      <div className="edu-block">
        <Reveal delay={0.15}>
          <div className="edu-card">
            <h3>Education</h3>
            <p className="edu-degree">{education.degree}</p>
            <p className="edu-school">{education.school}</p>
            <p className="edu-period">{education.period}</p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="achieve-card">
            <h3>Achievements</h3>
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
