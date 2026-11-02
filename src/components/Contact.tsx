import { useState } from 'react'
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, Phone } from 'lucide-react'
import { profile } from '../data/resume'
import { CornerTicks } from './CornerTicks'
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
  const [copied, setCopied] = useState(false)
  const contactCommand = `curl -sL https://systems.mohith.dev/contact.json`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contactCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="section contact-section" id="contact">
      <Reveal>
        <div className="rivet-cta-banner">
          <CornerTicks size={12} />
          <h2 className="rivet-cta-title">
            Built for engineering teams on the frontier of code and silicon.
          </h2>
          <p className="rivet-cta-lead">
            Open to AI software engineer, machine learning systems, and backend platform roles.
          </p>

          {/* Quick CLI Contact Box */}
          <div className="rivet-cta-cli-box">
            <span className="cli-prompt-symbol">&gt;</span>
            <code className="cli-command-text">{contactCommand}</code>
            <button
              type="button"
              className="cli-copy-action"
              onClick={handleCopy}
              aria-label="Copy contact CLI command"
            >
              {copied ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="contact-links-grid">
          <a className="rivet-contact-card" href={`mailto:${profile.email}`} target="_blank" rel="noreferrer">
            <CornerTicks size={8} />
            <div className="contact-card-icon">
              <Mail size={18} />
            </div>
            <div className="contact-card-text">
              <span className="contact-card-k">EMAIL DISPATCH</span>
              <span className="contact-card-v">{profile.email}</span>
            </div>
            <ArrowUpRight size={15} className="contact-card-arrow" />
          </a>

          <a className="rivet-contact-card" href={profile.github} target="_blank" rel="noreferrer">
            <CornerTicks size={8} />
            <div className="contact-card-icon">
              <GitHubIcon />
            </div>
            <div className="contact-card-text">
              <span className="contact-card-k">GITHUB REPOSITORY</span>
              <span className="contact-card-v">github.com/naik1805</span>
            </div>
            <ArrowUpRight size={15} className="contact-card-arrow" />
          </a>

          <a className="rivet-contact-card" href={profile.linkedin} target="_blank" rel="noreferrer">
            <CornerTicks size={8} />
            <div className="contact-card-icon">
              <LinkedInIcon />
            </div>
            <div className="contact-card-text">
              <span className="contact-card-k">LINKEDIN NETWORK</span>
              <span className="contact-card-v">linkedin.com/in/mohith-naik</span>
            </div>
            <ArrowUpRight size={15} className="contact-card-arrow" />
          </a>

          <a className="rivet-contact-card" href={`tel:${profile.phone.replace(/-/g, '')}`}>
            <CornerTicks size={8} />
            <div className="contact-card-icon">
              <Phone size={18} />
            </div>
            <div className="contact-card-text">
              <span className="contact-card-k">DIRECT LINE</span>
              <span className="contact-card-v">{profile.phone}</span>
            </div>
            <ArrowUpRight size={15} className="contact-card-arrow" />
          </a>
        </div>
      </Reveal>

      {/* Rivet Minimal Studio Footer */}
      <footer className="rivet-studio-footer">
        <div className="footer-top-row">
          <div className="footer-brand-mark">
            <span className="f-monogram">M</span>
            <span className="f-title">MOHITH S</span>
            <span className="f-sub">// AI SYSTEMS LAB</span>
          </div>

          <div className="footer-status-pill">
            <span className="status-live-dot" />
            <span>ALL SYSTEMS NOMINAL</span>
          </div>

          <button
            type="button"
            className="footer-back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>TOP</span>
            <ArrowUp size={13} />
          </button>
        </div>

        <div className="footer-bottom-row">
          <span className="footer-copy-text">
            © {new Date().getFullYear()} MOHITH S · BENGALURU, INDIA · ALL RIGHTS RESERVED
          </span>
          <div className="footer-meta-tags">
            <span>ATE DIAGNOSTICS</span>
            <span>·</span>
            <span>AIRGAPPED LLM</span>
            <span>·</span>
            <span>ICAIH 2025</span>
            <span>·</span>
            <span>IEEE XPLORE</span>
          </div>
        </div>
      </footer>
    </section>
  )
}
