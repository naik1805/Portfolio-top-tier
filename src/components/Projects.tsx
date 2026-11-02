import { useState, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { Activity, ArrowUpRight, CheckCircle2, Cpu, Database, Eye, FileText, Lock, Play, Shield, Terminal } from 'lucide-react'
import { projects } from '../data/resume'
import type { Project } from '../types'
import { CornerTicks } from './CornerTicks'
import { ProjectBlueprintModal } from './ProjectBlueprintModal'
import { Reveal } from './Reveal'

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeFrame, setActiveFrame] = useState(2)
  const [quantMode, setQuantMode] = useState<'4bit' | 'fp16'>('4bit')
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  const triggerScan = () => {
    if (scanning) return
    setScanning(true)
    setScanResult('Analyzing STIL vectors...')
    setTimeout(() => {
      setScanResult('Localization: Chain 03, Cell #128 · 98.4% Confidence')
      setScanning(false)
    }, 1100)
  }

  return (
    <section className="section projects-section" id="projects">
      <Reveal>
        <div className="section-header-compact">
          <span className="section-tag-mono">PRODUCTION & RESEARCH SYSTEMS</span>
          <h2 className="section-title">Systems that diagnose, reason & detect.</h2>
          <p className="section-lead">
            Production-grade diagnostic tooling for semiconductor test equipment, privacy-first local agents, and peer-reviewed published models.
          </p>
        </div>
      </Reveal>

      <div className="projects-grid">
        {/* Project 1: Scan Chain Diagnosis Agent */}
        <motion.article
          className="project-bento-card"
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <CornerTicks size={10} />
          <div className="card-spotlight" aria-hidden />
          <div className="project-card-header">
            <div className="project-header-left">
              <span className="project-index-num">01 / SILICON ATE</span>
              <h3 className="project-card-title">Scan Chain Diagnosis Agent</h3>
              <p className="project-card-subtitle">Verileumen Labs · Semiconductor Automated Test Equipment</p>
            </div>
            <span className="project-status-pill production">
              <span className="status-live-dot" /> PRODUCTION
            </span>
          </div>

          <p className="project-card-summary">
            Full-stack diagnosis engine that parses chip scan-test fail logs (STIL/topology) to localize failed chains/cells, classify shift vs. capture issues, and predict root causes via calibrated ML models.
          </p>

          {/* Interactive Console: Silicon ATE Simulator */}
          <div className="interactive-console aate-console">
            <div className="console-top-bar">
              <span className="console-label">
                <Cpu size={13} /> SCAN CHAIN TELEMETRY
              </span>
              <button
                type="button"
                className={`console-action-btn${scanning ? ' is-running' : ''}`}
                onClick={triggerScan}
              >
                {scanning ? <Activity size={13} className="spin-icon" /> : <Play size={13} />}
                <span>{scanning ? 'SCANNING...' : 'RUN DIAGNOSTIC VECTOR'}</span>
              </button>
            </div>

            <div className="scan-circuit-visual">
              <div className="scan-node scan-in">
                <span>SCAN IN</span>
              </div>
              <div className="scan-path-line active" />
              <div className="scan-node flip-flop">
                <span>FF-01</span>
              </div>
              <div className="scan-path-line active" />
              <div className="scan-node flip-flop">
                <span>FF-02</span>
              </div>
              <div className="scan-path-line alert">
                <span className="pulse-fault" />
              </div>
              <div className="scan-node flip-flop fault-cell">
                <span>CELL #128</span>
              </div>
              <div className="scan-path-line" />
              <div className="scan-node scan-out">
                <span>SCAN OUT</span>
              </div>
            </div>

            <div className="console-telemetry-output">
              <span className="telemetry-prompt">ATE://</span>
              <span className="telemetry-text">
                {scanResult ?? 'STIL vector parsed (48.2k flops) · Root cause: Capture clock skew anomaly'}
              </span>
            </div>
          </div>

          <div className="project-feature-bullets">
            <div className="feature-bullet">
              <CheckCircle2 size={14} className="bullet-icon" />
              <span>FastAPI backend with Pydantic v2 & Uvicorn serving calibrated ML root cause</span>
            </div>
            <div className="feature-bullet">
              <CheckCircle2 size={14} className="bullet-icon" />
              <span>Next.js 15 / React 19 dashboard with 12 KPI cards and 10 auto-generated FR reports</span>
            </div>
            <div className="feature-bullet">
              <CheckCircle2 size={14} className="bullet-icon" />
              <span>PyArrow/Parquet caching pipeline with Docker deployment & pytest suites</span>
            </div>
          </div>

          <div className="project-card-footer">
            <div className="project-stack-tags">
              {['FastAPI', 'scikit-learn', 'Next.js 15', 'Docker', 'PyArrow'].map((t) => (
                <span key={t} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="blueprint-inspect-btn"
              onClick={() => setSelectedProject(projects[0])}
            >
              <span>Architecture Blueprint</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </motion.article>

        {/* Project 2: Offline Personal AI Assistant */}
        <motion.article
          className="project-bento-card"
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <CornerTicks size={10} />
          <div className="card-spotlight" aria-hidden />
          <div className="project-card-header">
            <div className="project-header-left">
              <span className="project-index-num">02 / EDGE AI & RAG</span>
              <h3 className="project-card-title">Offline Personal AI Assistant</h3>
              <p className="project-card-subtitle">Local Quantized LLMs · Airgapped Speech & Document RAG</p>
            </div>
            <span className="project-status-pill privacy">
              <Lock size={11} /> 100% PRIVATE
            </span>
          </div>

          <p className="project-card-summary">
            Completely offline, privacy-first conversational assistant powered by 4-bit quantized LLMs (LLaMA, Mistral) via Ollama, integrated with on-device Whisper STT, Piper TTS, and local FAISS vector search.
          </p>

          {/* Interactive Console: Local Inference HUD */}
          <div className="interactive-console rag-console">
            <div className="console-top-bar">
              <span className="console-label">
                <Terminal size={13} /> LOCAL INFERENCE BENCHMARK
              </span>
              <div className="quant-toggle-group">
                <button
                  type="button"
                  className={`quant-toggle-btn${quantMode === '4bit' ? ' active' : ''}`}
                  onClick={() => setQuantMode('4bit')}
                >
                  4-BIT GGUF
                </button>
                <button
                  type="button"
                  className={`quant-toggle-btn${quantMode === 'fp16' ? ' active' : ''}`}
                  onClick={() => setQuantMode('fp16')}
                >
                  FP16 BASE
                </button>
              </div>
            </div>

            <div className="audio-inference-row">
              <div className="waveform-box">
                <span className="waveform-title">WHISPER STT</span>
                <div className="waveform-bars">
                  {[24, 45, 80, 52, 92, 40, 68, 85, 30, 70, 95, 48, 62, 34].map((h, i) => (
                    <motion.span
                      key={i}
                      className="wave-bar"
                      animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.5}%`] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.08 }}
                    />
                  ))}
                </div>
              </div>

              <div className="inference-stats-block">
                <div className="stat-subitem">
                  <span className="stat-subitem-label">STREAMING SPEED</span>
                  <span className="stat-subitem-val accent">
                    {quantMode === '4bit' ? '42.8 tok/s' : '9.4 tok/s'}
                  </span>
                </div>
                <div className="stat-subitem">
                  <span className="stat-subitem-label">TIME TO FIRST TOKEN</span>
                  <span className="stat-subitem-val">
                    {quantMode === '4bit' ? '< 1.8s' : '4.6s'}
                  </span>
                </div>
                <div className="stat-subitem">
                  <span className="stat-subitem-label">NETWORK TELEMETRY</span>
                  <span className="stat-subitem-val success">0.0 KB (Airgapped)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="project-feature-bullets">
            <div className="feature-bullet">
              <CheckCircle2 size={14} className="bullet-icon" />
              <span>Whisper STT voice ingestion with Piper speech synthesis loop</span>
            </div>
            <div className="feature-bullet">
              <CheckCircle2 size={14} className="bullet-icon" />
              <span>3-5x acceleration over baseline via 4-bit integer weights</span>
            </div>
            <div className="feature-bullet">
              <CheckCircle2 size={14} className="bullet-icon" />
              <span>Local RAG pipeline indexing documents with LangChain & FAISS embeddings</span>
            </div>
          </div>

          <div className="project-card-footer">
            <div className="project-stack-tags">
              {['Ollama', 'FAISS', 'LangChain', 'Whisper', 'GGUF'].map((t) => (
                <span key={t} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="blueprint-inspect-btn"
              onClick={() => setSelectedProject(projects[1])}
            >
              <span>Architecture Blueprint</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </motion.article>

        {/* Project 3: Deepfake Detection System */}
        <motion.article
          className="project-bento-card"
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <CornerTicks size={10} />
          <div className="card-spotlight" aria-hidden />
          <div className="project-card-header">
            <div className="project-header-left">
              <span className="project-index-num">03 / APPLIED RESEARCH</span>
              <h3 className="project-card-title">Deepfake Detection System</h3>
              <p className="project-card-subtitle">ICAIH 2025 · Peer-Reviewed Publication</p>
            </div>
            <span className="project-status-pill published">
              <FileText size={11} /> ICAIH 2025
            </span>
          </div>

          <p className="project-card-summary">
            End-to-end spatial-temporal deepfake detection framework combining convolutional neural networks (CNNs) for facial boundary anomaly extraction and recurrent neural networks (RNNs) for temporal coherence tracking.
          </p>

          {/* Interactive Console: Spatial-Temporal Frame Scrubber */}
          <div className="interactive-console cv-console">
            <div className="console-top-bar">
              <span className="console-label">
                <Eye size={13} /> TEMPORAL FRAME CONSISTENCY
              </span>
              <span className="console-confidence-tag">AUC-ROC: 0.972</span>
            </div>

            <div className="frame-scrubber-row">
              {[
                { id: 1, label: 'FR-014', time: '0.45s', score: '98.1%', status: 'Valid' },
                { id: 2, label: 'FR-028', time: '0.92s', score: '97.2%', status: 'Valid' },
                { id: 3, label: 'FR-042', time: '1.40s', score: '96.8%', status: 'Valid' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`frame-cell${activeFrame === f.id ? ' active' : ''}`}
                  onClick={() => setActiveFrame(f.id)}
                >
                  <div className="frame-cell-top">
                    <span className="frame-name">{f.label}</span>
                    <span className="frame-time">{f.time}</span>
                  </div>
                  <div className="frame-heatmap-box">
                    <div className="heatmap-gradient" />
                    <span className="heatmap-node-marker" />
                  </div>
                  <div className="frame-cell-footer">
                    <span>Temporal Score:</span>
                    <strong>{f.score}</strong>
                  </div>
                </button>
              ))}
            </div>

            <div className="console-telemetry-output">
              <span className="telemetry-prompt">ICAIH://</span>
              <span className="telemetry-text">
                Spatial artifacts localized at facial boundary · Zero temporal flicker detected
              </span>
            </div>
          </div>

          <div className="project-feature-bullets">
            <div className="feature-bullet">
              <CheckCircle2 size={14} className="bullet-icon" />
              <span>Hybrid CNN + RNN architecture capturing micro-expression temporal drift</span>
            </div>
            <div className="feature-bullet">
              <CheckCircle2 size={14} className="bullet-icon" />
              <span>Optimized for near-real-time streaming inference on benchmark datasets</span>
            </div>
            <div className="feature-bullet">
              <CheckCircle2 size={14} className="bullet-icon" />
              <span>Accepted & presented at ICAIH 2025 international research conference</span>
            </div>
          </div>

          <div className="project-card-footer">
            <div className="project-stack-tags">
              {['CNN + RNN', 'TensorFlow', 'OpenCV', 'Python', 'NumPy'].map((t) => (
                <span key={t} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="blueprint-inspect-btn"
              onClick={() => setSelectedProject(projects[2])}
            >
              <span>Architecture Blueprint</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </motion.article>

        {/* Project 4: Corrupt Watch */}
        <motion.article
          className="project-bento-card"
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <CornerTicks size={10} />
          <div className="card-spotlight" aria-hidden />
          <div className="project-card-header">
            <div className="project-header-left">
              <span className="project-index-num">04 / CIVIC TECH & WEB3</span>
              <h3 className="project-card-title">Corrupt Watch</h3>
              <p className="project-card-subtitle">IEEE Xplore · Decentralized Grievance Verification</p>
            </div>
            <span className="project-status-pill published">
              <Shield size={11} /> IEEE XPLORE
            </span>
          </div>

          <p className="project-card-summary">
            AI-Blockchain integrated architecture for civic grievance redressal. Multi-modal AI verifies and classifies evidence, while an immutable distributed ledger guarantees case records cannot be quietly suppressed or altered.
          </p>

          {/* Interactive Console: Blockchain Ledger State */}
          <div className="interactive-console block-console">
            <div className="console-top-bar">
              <span className="console-label">
                <Database size={13} /> IMMUTABLE LEDGER STATE
              </span>
              <span className="console-confidence-tag">BLOCK #482,914</span>
            </div>

            <div className="blockchain-ledger-track">
              <div className="block-pill verified">
                <span className="block-num">#482912</span>
                <span className="block-hash">0x4a18...f8e2</span>
                <span className="block-check">VALID</span>
              </div>
              <div className="block-chain-link" />
              <div className="block-pill verified">
                <span className="block-num">#482913</span>
                <span className="block-hash">0x7c9d...b03a</span>
                <span className="block-check">VALID</span>
              </div>
              <div className="block-chain-link" />
              <div className="block-pill active-block">
                <span className="block-num">#482914</span>
                <span className="block-hash">0x9e4b...c4e9</span>
                <span className="block-check mining">MINED</span>
              </div>
            </div>

            <div className="console-telemetry-output">
              <span className="telemetry-prompt">IEEE://</span>
              <span className="telemetry-text">
                Multi-modal evidence validated · Merkle root anchored on decentralized chain
              </span>
            </div>
          </div>

          <div className="project-feature-bullets">
            <div className="feature-bullet">
              <CheckCircle2 size={14} className="bullet-icon" />
              <span>NLP & Computer Vision pipeline classifying civic complaints & metadata</span>
            </div>
            <div className="feature-bullet">
              <CheckCircle2 size={14} className="bullet-icon" />
              <span>Decentralized ledger ensuring tamper-proof whistleblower records</span>
            </div>
            <div className="feature-bullet">
              <CheckCircle2 size={14} className="bullet-icon" />
              <span>Peer-reviewed & published in IEEE Xplore smart-city proceedings</span>
            </div>
          </div>

          <div className="project-card-footer">
            <div className="project-stack-tags">
              {['Blockchain', 'NLP', 'Computer Vision', 'Solidity', 'Python'].map((t) => (
                <span key={t} className="tech-badge">
                  {t}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="blueprint-inspect-btn"
              onClick={() => setSelectedProject(projects[3])}
            >
              <span>Architecture Blueprint</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </motion.article>
      </div>

      <ProjectBlueprintModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
