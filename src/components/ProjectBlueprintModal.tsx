import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { ChevronRight, Cpu, GitBranch, Layers, ShieldCheck, X } from 'lucide-react'
import type { Project } from '../types'

type Props = {
  project: Project | null
  onClose: () => void
}

export function ProjectBlueprintModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <div className="blueprint-overlay" role="dialog" aria-modal="true">
        <motion.div
          className="blueprint-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          className="blueprint-panel"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        >
          <header className="blueprint-header">
            <div className="blueprint-title-group">
              <span className="blueprint-badge">{project.status}</span>
              <h2 className="blueprint-title">{project.title}</h2>
              <span className="blueprint-focus">{project.focus}</span>
            </div>
            <button
              type="button"
              className="blueprint-close-btn"
              onClick={onClose}
              aria-label="Close architecture inspection"
            >
              <X size={18} />
            </button>
          </header>

          <div className="blueprint-body">
            <section className="blueprint-section">
              <h3 className="blueprint-subhead">
                <Cpu size={15} /> System Overview & Problem Statement
              </h3>
              <p className="blueprint-desc">{project.description}</p>
            </section>

            <section className="blueprint-section">
              <h3 className="blueprint-subhead">
                <Layers size={15} /> Architectural Highlights & Implementation
              </h3>
              <div className="blueprint-grid">
                {project.details.map((detail, idx) => (
                  <div key={idx} className="blueprint-card">
                    <span className="blueprint-step-num">0{idx + 1}</span>
                    <p className="blueprint-card-text">{detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="blueprint-section">
              <h3 className="blueprint-subhead">
                <GitBranch size={15} /> Technology Stack & Infrastructure
              </h3>
              <div className="blueprint-stack-pills">
                {project.stack.map((s) => (
                  <span key={s} className="blueprint-pill">
                    {s}
                  </span>
                ))}
              </div>
            </section>

            <section className="blueprint-section blueprint-terminal-box">
              <div className="blueprint-terminal-head">
                <span>SYSTEM DIAGNOSTIC TELEMETRY</span>
                <span className="terminal-live-dot" />
              </div>
              <pre className="blueprint-code">
                {project.acronym === 'SCDA' &&
`[LOG] ATE Vector Loaded: 48,200 Scan Vectors (STIL Standard)
[PROCESS] Parsing topology tree -> Scan Chain 01..08 initialized
[DETECTION] Shift clock anomaly rejected. Capture clock skew verified.
[ROOT CAUSE] Cell #128 scan flip-flop timing violation
[CONFIDENCE] Random Forest: 98.4% | Isolation Forest: 0.012 anomaly score
[DEPLOYMENT] Containerized via Docker · Cached with PyArrow/Parquet`}
                {project.acronym === 'OPAA' &&
`[CORE] Quantization: 4-bit GGUF via llama.cpp / Ollama
[INFERENCE] Streaming latency: 1.8s TTFT · 42.6 tokens/sec
[VECTOR STORE] FAISS index with cosine similarity threshold 0.82
[VOICE] Whisper STT on-device audio stream -> Piper TTS synthesis
[SECURITY] 100% Airgapped · 0 Cloud Network Telemetry`}
                {project.acronym === 'DFS' &&
`[DATASET] FaceForensics++ & Celeb-DF benchmark callsets
[ARCHITECTURE] EfficientNet CNN spatial features + Bi-LSTM temporal sequence
[EVALUATION] AUC-ROC: 0.972 | EER: 3.4% on compressed video streams
[PUBLICATION] Peer-reviewed paper presentation at ICAIH 2025`}
                {project.acronym === 'CW' &&
`[CONSENSUS] Proof-of-Authority civic smart contracts
[INGESTION] Multi-modal grievance ingestion (NLP classification + CV verification)
[BLOCKCHAIN] Hash: 0x9e4b172a...88c9f · Block 482,914 · Timestamped
[PUBLICATION] IEEE Xplore: Transparent Civic Grievance Framework`}
              </pre>
            </section>
          </div>

          <footer className="blueprint-footer">
            <div className="blueprint-footer-note">
              <ShieldCheck size={14} className="blueprint-note-icon" />
              <span>Verified production & research contribution by Mohith S</span>
            </div>
            <button
              type="button"
              className="blueprint-cta-btn"
              onClick={onClose}
            >
              Close Inspection <ChevronRight size={15} />
            </button>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
