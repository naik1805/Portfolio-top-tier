import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  ArrowUpRight,
  ChevronRight,
  Cpu,
  Eye,
  Lock,
  Pause,
  Play,
  Shield,
} from 'lucide-react'
import { CornerTicks } from './CornerTicks'

export type DirectionId = 'ate' | 'assistant' | 'deepfake' | 'corrupt'

interface DirectionInfo {
  id: DirectionId
  number: string
  title: string
  category: string
  badge: string
  metrics: { label: string; value: string }[]
  summary: string
  stack: string[]
  github: string
}

const DIRECTIONS: DirectionInfo[] = [
  {
    id: 'ate',
    number: '01',
    title: 'Scan Chain Diagnosis Agent',
    category: 'Semiconductor ATE Diagnostics',
    badge: 'PRODUCTION READY',
    metrics: [
      { label: 'Localization Acc', value: '98.4%' },
      { label: 'Parser Latency', value: '<42ms' },
      { label: 'Report Types', value: '10 Generated' },
    ],
    summary:
      'Parses chip scan-test fail logs (STIL/topology) to localize failed chains/cells, classify shift vs. capture faults, and predict root causes via calibrated ML models.',
    stack: ['FastAPI', 'scikit-learn', 'Docker', 'Next.js', 'Pandas'],
    github: 'https://github.com/naik1805',
  },
  {
    id: 'assistant',
    number: '02',
    title: 'Offline Personal AI Assistant',
    category: 'Privacy-First Edge LLMs',
    badge: '100% LOCAL & AIRGAPPED',
    metrics: [
      { label: 'Token Speed', value: '48.2 tok/s' },
      { label: 'RAM Footprint', value: '<4.2 GB' },
      { label: 'Privacy Level', value: 'Zero Egress' },
    ],
    summary:
      'Air-gapped voice/chat intelligence engine using local quant models with zero external API calls. Features real-time voice synthesis and localized vector memory.',
    stack: ['Python', 'Ollama', 'LangChain', 'FAISS', 'FastAPI'],
    github: 'https://github.com/naik1805',
  },
  {
    id: 'deepfake',
    number: '03',
    title: 'Deepfake Video & Audio Detection',
    category: 'Computer Vision & Biometrics',
    badge: 'ICAIH 2025 PUBLISHED',
    metrics: [
      { label: 'Video Accuracy', value: '94.2%' },
      { label: 'Inference Time', value: '38ms/frame' },
      { label: 'Peer Review', value: 'ICAIH 2025' },
    ],
    summary:
      'Multi-modal neural network combining ResNet/Vision Transformers with MFCC audio spectrogram analysis to detect synthetic facial manipulation and cloned speech.',
    stack: ['PyTorch', 'OpenCV', 'Librosa', 'TensorFlow', 'FastAPI'],
    github: 'https://github.com/naik1805',
  },
  {
    id: 'corrupt',
    number: '04',
    title: 'Corrupt Watch / Anomaly Sentinel',
    category: 'Real-Time Financial Anomaly ML',
    badge: 'REAL-TIME SENTINEL',
    metrics: [
      { label: 'Detection Rate', value: '99.1%' },
      { label: 'Processing Latency', value: '18ms' },
      { label: 'False Positives', value: '<0.08%' },
    ],
    summary:
      'Continuous anomaly detection engine utilizing Isolation Forests and XGBoost on streaming financial telemetry to intercept anomalous flows before settlement.',
    stack: ['Python', 'Scikit-Learn', 'FastAPI', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/naik1805',
  },
]

export function RivetWorkbench() {
  const [activeId, setActiveId] = useState<DirectionId>('ate')
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [progress, setProgress] = useState(0)

  // Simulation states
  const [ateScanning, setAteScanning] = useState(false)
  const [ateResult, setAteResult] = useState<string | null>(
    'STIL Topology parsed. Chain 03, Cell #128 identified as primary capture failure (98.4% confidence).',
  )
  const [activeCell, setActiveCell] = useState(128)

  // Assistant simulation
  const [assistantPrompt, setAssistantPrompt] = useState(
    'Analyze STIL test vector failure on Chain 03',
  )
  const [assistantThinking, setAssistantThinking] = useState(false)
  const [assistantResponse, setAssistantResponse] = useState(
    'Fault localized to Scan Chain 03, cell 128. Pattern indicates stuck-at-0 fault during capture phase with clock skew < 1.2ns.',
  )

  // Deepfake simulation
  const [activeFrame, setActiveFrame] = useState(2)

  // Auto-play cycling effect
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = 50
    const totalDuration = 6000
    const step = (interval / totalDuration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next direction
          setActiveId((curr) => {
            const idx = DIRECTIONS.findIndex((d) => d.id === curr)
            return DIRECTIONS[(idx + 1) % DIRECTIONS.length].id
          })
          return 0
        }
        return prev + step
      })
    }, interval)

    return () => clearInterval(timer)
  }, [isAutoPlay])

  const activeDirection = DIRECTIONS.find((d) => d.id === activeId) || DIRECTIONS[0]

  const triggerAteScan = () => {
    if (ateScanning) return
    setAteScanning(true)
    setAteResult('Injecting pseudo-random test vector (PRPG seed: 0x8F4A)...')
    setTimeout(() => {
      setActiveCell(Math.floor(Math.random() * 200) + 50)
      setAteResult(
        `Analysis complete: Chain 03, Cell #${activeCell} · Stuck-at-0 verified (Confidence: 98.4%)`,
      )
      setAteScanning(false)
    }, 1200)
  }

  const handleAssistantSubmit = (query: string) => {
    setAssistantPrompt(query)
    setAssistantThinking(true)
    setTimeout(() => {
      if (query.includes('STIL')) {
        setAssistantResponse(
          'Telemetry report: Scan Chain 03 capture error validated. Recommended fix: calibrate capture clock latency.',
        )
      } else {
        setAssistantResponse(
          `Local model (Q4_K_M) processed query in 32ms. Zero cloud egress. Parameters secure in encrypted local VRAM.`,
        )
      }
      setAssistantThinking(false)
    }, 800)
  }

  return (
    <div className="rivet-workbench-container relative">
      {/* Chrome Header */}
      <div className="rivet-workbench-chrome">
        <div className="chrome-left">
          <div className="chrome-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="chrome-address">
            <span className="chrome-protocol">https://</span>
            <span className="chrome-host">systems.mohith.dev</span>
            <span className="chrome-path">/directions/{activeId}</span>
          </div>
        </div>

        <div className="chrome-center">
          <span className="chrome-status-pill">
            <span className="status-live-dot" />
            <span className="status-text">PARALLEL WORKBENCH</span>
          </span>
        </div>

        <div className="chrome-right">
          <button
            type="button"
            className={`chrome-autoplay-btn ${isAutoPlay ? 'is-active' : ''}`}
            onClick={() => {
              setIsAutoPlay(!isAutoPlay)
              setProgress(0)
            }}
            title={isAutoPlay ? 'Pause auto-cycle' : 'Auto-cycle directions'}
          >
            {isAutoPlay ? <Pause size={12} /> : <Play size={12} />}
            <span>{isAutoPlay ? 'AUTO: ON' : 'AUTO-PLAY'}</span>
          </button>
        </div>
      </div>

      {/* Main Split Window */}
      <div className="rivet-workbench-body">
        <CornerTicks size={12} />

        {/* Left Column: Directions Navigation */}
        <div className="workbench-directions-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-title-row">
              <span className="sidebar-label">DIRECTIONS</span>
              <span className="sidebar-counter">{DIRECTIONS.length} ACTIVE</span>
            </div>
            <p className="sidebar-hint">Select a production direction to inspect live</p>
          </div>

          <div className="directions-list">
            {DIRECTIONS.map((dir) => {
              const isActive = dir.id === activeId
              return (
                <button
                  key={dir.id}
                  type="button"
                  className={`direction-nav-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveId(dir.id)
                    setIsAutoPlay(false)
                    setProgress(0)
                  }}
                >
                  <div className="direction-item-top">
                    <span className="direction-num">{dir.number}</span>
                    <span className="direction-tag">{dir.category}</span>
                  </div>
                  <h4 className="direction-item-title">{dir.title}</h4>
                  <div className="direction-item-footer">
                    <span className="direction-badge-tiny">{dir.badge}</span>
                    <ChevronRight size={14} className="direction-chevron" />
                  </div>
                  {isActive && isAutoPlay && (
                    <div className="direction-progress-bar">
                      <div
                        className="direction-progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          <div className="sidebar-footer">
            <div className="sidebar-telemetry">
              <span className="telemetry-label">SYSTEM CLUSTER</span>
              <span className="telemetry-val">NODE 01 // BLR-AZ1</span>
            </div>
          </div>
        </div>

        {/* Right Column: Direction Inspector Canvas */}
        <div className="workbench-inspector-canvas">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDirection.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="inspector-content-wrap"
            >
              {/* Header Bar */}
              <div className="inspector-head">
                <div className="inspector-title-area">
                  <div className="inspector-stamp">
                    <span className="inspector-dir-num">DIR.{activeDirection.number}</span>
                    <span className="inspector-status-badge">{activeDirection.badge}</span>
                  </div>
                  <h3 className="inspector-title">{activeDirection.title}</h3>
                  <p className="inspector-summary">{activeDirection.summary}</p>
                </div>

                <div className="inspector-actions">
                  <a
                    href={activeDirection.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inspector-action-btn"
                  >
                    <span>Inspect Code</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Metrics Ribbon */}
              <div className="inspector-metrics-ribbon">
                {activeDirection.metrics.map((m) => (
                  <div key={m.label} className="metric-pill">
                    <span className="metric-k">{m.label}</span>
                    <span className="metric-v">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* Interactive Telemetry Stage */}
              <div className="inspector-interactive-stage">
                {/* 1. ATE Scan Chain Simulator */}
                {activeDirection.id === 'ate' && (
                  <div className="sim-pane ate-sim">
                    <div className="sim-header">
                      <div className="sim-title">
                        <Cpu size={14} />
                        <span>STIL SCAN CHAIN VECTOR TELEMETRY</span>
                      </div>
                      <button
                        type="button"
                        className={`sim-action-btn ${ateScanning ? 'is-running' : ''}`}
                        onClick={triggerAteScan}
                      >
                        {ateScanning ? (
                          <Activity size={13} className="spin-icon" />
                        ) : (
                          <Play size={13} />
                        )}
                        <span>{ateScanning ? 'ANALYZING STIL...' : 'INJECT TEST VECTOR'}</span>
                      </button>
                    </div>

                    <div className="sim-circuit-grid">
                      <div className="chain-pins-col">
                        <span className="chain-pin is-healthy">SCAN_IN_01 [OK]</span>
                        <span className="chain-pin is-healthy">SCAN_IN_02 [OK]</span>
                        <span className="chain-pin is-fault">SCAN_IN_03 [FAIL]</span>
                        <span className="chain-pin is-healthy">SCAN_IN_04 [OK]</span>
                      </div>

                      <div className="circuit-cells-matrix">
                        {Array.from({ length: 24 }).map((_, i) => {
                          const isFaultCell = i === 11
                          return (
                            <div
                              key={i}
                              className={`cell-node ${isFaultCell ? 'is-fault-cell' : 'is-pass'}`}
                              title={`Cell #${i * 10}`}
                            >
                              <span className="cell-id">C{i}</span>
                            </div>
                          )
                        })}
                      </div>

                      <div className="chain-pins-col">
                        <span className="chain-pin is-healthy">OUT_01</span>
                        <span className="chain-pin is-healthy">OUT_02</span>
                        <span className="chain-pin is-fault">OUT_03 [0x00]</span>
                        <span className="chain-pin is-healthy">OUT_04</span>
                      </div>
                    </div>

                    <div className="sim-telemetry-console">
                      <div className="console-line">
                        <span className="console-prompt">&gt;</span>
                        <span className="console-text">{ateResult}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Offline AI Assistant Simulator */}
                {activeDirection.id === 'assistant' && (
                  <div className="sim-pane assistant-sim">
                    <div className="sim-header">
                      <div className="sim-title">
                        <Lock size={14} />
                        <span>LOCAL LLM RUNTIME // ZERO NETWORK EGRESS</span>
                      </div>
                      <span className="model-chip">LLaMA-3-8B-Q4_K_M (Ollama)</span>
                    </div>

                    <div className="assistant-dialogue">
                      <div className="dialogue-msg user-msg">
                        <span className="msg-author">USER:</span>
                        <span className="msg-text">{assistantPrompt}</span>
                      </div>

                      <div className="dialogue-msg ai-msg">
                        <span className="msg-author">LOCAL AGENT:</span>
                        <span className="msg-text">
                          {assistantThinking ? 'Synthesizing response on local GPU...' : assistantResponse}
                        </span>
                      </div>
                    </div>

                    <div className="assistant-controls">
                      <div className="preset-prompts">
                        <button
                          type="button"
                          className="prompt-preset-chip"
                          onClick={() =>
                            handleAssistantSubmit(
                              'Analyze STIL test vector failure on Chain 03',
                            )
                          }
                        >
                          Analyze STIL Log
                        </button>
                        <button
                          type="button"
                          className="prompt-preset-chip"
                          onClick={() =>
                            handleAssistantSubmit(
                              'Summarize local vector embeddings in FAISS index',
                            )
                          }
                        >
                          Vector Memory Check
                        </button>
                        <button
                          type="button"
                          className="prompt-preset-chip"
                          onClick={() =>
                            handleAssistantSubmit(
                              'Run hardware diagnostic across all 8 scan chains',
                            )
                          }
                        >
                          Diagnostic Sweep
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Deepfake Video & Audio Detection */}
                {activeDirection.id === 'deepfake' && (
                  <div className="sim-pane deepfake-sim">
                    <div className="sim-header">
                      <div className="sim-title">
                        <Eye size={14} />
                        <span>MULTI-FRAME BIOMETRIC FORENSIC INSPECTOR</span>
                      </div>
                      <span className="peer-chip">ICAIH 2025 Validated</span>
                    </div>

                    <div className="deepfake-scrubber-row">
                      <span className="scrubber-label">INSPECT FRAME:</span>
                      <div className="frames-strip">
                        {[1, 2, 3, 4, 5].map((f) => (
                          <button
                            key={f}
                            type="button"
                            className={`frame-btn ${activeFrame === f ? 'is-selected' : ''}`}
                            onClick={() => setActiveFrame(f)}
                          >
                            Frame 0{f}
                            {f === 3 && <span className="frame-anomaly-dot" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="forensic-readout-grid">
                      <div className="forensic-card">
                        <span className="f-title">FACIAL WARPING SCORE</span>
                        <div className="f-bar-wrap">
                          <div
                            className="f-bar"
                            style={{ width: '100%', transform: `scaleX(${activeFrame === 3 ? 0.89 : 0.24})`, transformOrigin: 'left' }}
                          />
                        </div>
                        <span className="f-num">{activeFrame === 3 ? '0.89 (HIGH WARP)' : '0.24 (NOMINAL)'}</span>
                      </div>

                      <div className="forensic-card">
                        <span className="f-title">AUDIO SPECTROGRAM MFCC</span>
                        <div className="f-bar-wrap">
                          <div
                            className="f-bar"
                            style={{ width: '100%', transform: `scaleX(${activeFrame === 3 ? 0.94 : 0.18})`, transformOrigin: 'left' }}
                          />
                        </div>
                        <span className="f-num">{activeFrame === 3 ? '0.94 (SYNTHETIC VOCODER)' : '0.18 (NATURAL)'}</span>
                      </div>
                    </div>

                    <div className="forensic-verdict">
                      <span className="verdict-tag">MODEL VERDICT:</span>
                      <span className="verdict-text">
                        {activeFrame === 3
                          ? 'DEEPFAKE DETECTED (ResNet + Transformer Temporal Inconsistency: 94.2%)'
                          : 'AUTHENTIC STREAM (Temporal consistency within baseline bounds)'}
                      </span>
                    </div>
                  </div>
                )}

                {/* 4. Corrupt Watch Simulator */}
                {activeDirection.id === 'corrupt' && (
                  <div className="sim-pane corrupt-sim">
                    <div className="sim-header">
                      <div className="sim-title">
                        <Shield size={14} />
                        <span>TRANSACTION FLOW ANOMALY SENTINEL</span>
                      </div>
                      <span className="model-chip">Isolation Forest + XGBoost</span>
                    </div>

                    <div className="corrupt-flow-telemetry">
                      <div className="telemetry-stat">
                        <span className="t-label">STREAM THROUGHPUT</span>
                        <span className="t-val">12,480 tx/sec</span>
                      </div>
                      <div className="telemetry-stat">
                        <span className="t-label">ANOMALY THRESHOLD</span>
                        <span className="t-val">&gt; 0.85 σ</span>
                      </div>
                      <div className="telemetry-stat">
                        <span className="t-label">INTERCEPT LATENCY</span>
                        <span className="t-val">18 ms</span>
                      </div>
                    </div>

                    <div className="stream-events-feed">
                      <div className="event-row pass">
                        <span className="ev-time">14:47:01</span>
                        <span className="ev-id">TX_8921B</span>
                        <span className="ev-amt">₹ 4,200.00</span>
                        <span className="ev-score">Score: 0.12</span>
                        <span className="ev-status">CLEAR</span>
                      </div>
                      <div className="event-row pass">
                        <span className="ev-time">14:47:02</span>
                        <span className="ev-id">TX_8922C</span>
                        <span className="ev-amt">₹ 1,150.00</span>
                        <span className="ev-score">Score: 0.18</span>
                        <span className="ev-status">CLEAR</span>
                      </div>
                      <div className="event-row alert">
                        <span className="ev-time">14:47:03</span>
                        <span className="ev-id">TX_8923F</span>
                        <span className="ev-amt">₹ 890,000.00</span>
                        <span className="ev-score">Score: 0.94</span>
                        <span className="ev-status">INTERCEPTED</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Stack Pills Footer */}
              <div className="inspector-stack-foot">
                <span className="stack-label">ARCHITECTURE STACK:</span>
                <div className="stack-pills">
                  {activeDirection.stack.map((item) => (
                    <span key={item} className="stack-pill-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
