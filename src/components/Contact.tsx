import { Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '../data/resume'
import { Reveal } from './Reveal'

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.23 0 1.61-.01 2.91-.01 3.3 0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

export function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <Reveal>
        <div className="section-label" style={{ justifyContent: 'center' }}>
          Fig. 06 — Connect
        </div>
        <h2 className="section-title">Let&apos;s build something that ships.</h2>
        <p className="section-lead">
          Open to AI software, ML engineering, and data-driven backend roles where systems meet intelligence.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="contact-links">
          <a className="contact-link" href={`mailto:${profile.email}`}>
            <Mail size={18} /> {profile.email}
          </a>
          <a className="contact-link" href={profile.github} target="_blank" rel="noreferrer">
            <GitHubIcon /> GitHub
          </a>
          <a className="contact-link" href={profile.linkedin} target="_blank" rel="noreferrer">
            <LinkedInIcon /> LinkedIn
          </a>
          <a className="contact-link" href={`tel:${profile.phone.replace(/-/g, '')}`}>
            <Phone size={18} /> {profile.phone}
          </a>
          <span className="contact-link" style={{ pointerEvents: 'none' }}>
            <MapPin size={18} /> {profile.location}
          </span>
        </div>
      </Reveal>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href={profile.github} target="_blank" rel="noreferrer">
          github.com/naik1805
        </a>
      </footer>
    </section>
  )
}
