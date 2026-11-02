import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CornerTicks } from './CornerTicks'

type Props = {
  onDone: () => void
}

export function IntroLoader({ onDone }: Props) {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return true
    return !sessionStorage.getItem('mohith-visited')
  })
  const [frameIndex, setFrameIndex] = useState(0)

  const strobeFrames = [
    { code: '0x01', label: 'INITIALIZING RUNTIME', sub: 'ATE · LLM · BIOMETRICS' },
    { code: '0x02', label: 'CALIBRATING VECTORS', sub: 'STIL PARSER · 98.4% ACC' },
    { code: '0x03', label: 'SYSTEMS ONLINE', sub: 'MOHITH S // BENGALURU' },
  ]

  useEffect(() => {
    if (!show) {
      onDone()
      return
    }

    sessionStorage.setItem('mohith-visited', 'true')
    const t1 = setTimeout(() => setFrameIndex(1), 220)
    const t2 = setTimeout(() => setFrameIndex(2), 460)
    const t3 = setTimeout(() => setShow(false), 780)
    const t4 = setTimeout(onDone, 1050)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onDone, show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="rivet-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rivet-intro-canvas">
            <CornerTicks size={12} />

            <div className="intro-monogram-bolt">
              <span className="intro-bolt-letter">M</span>
            </div>

            <div className="intro-strobe-content">
              <div className="strobe-frame-header">
                <span className="strobe-code">{strobeFrames[frameIndex].code}</span>
                <span className="strobe-dot" />
                <span className="strobe-status">CALIBRATING</span>
              </div>
              <h2 className="strobe-headline">{strobeFrames[frameIndex].label}</h2>
              <p className="strobe-sub">{strobeFrames[frameIndex].sub}</p>
            </div>

            <div className="intro-bottom-meter">
              <motion.div
                className="intro-progress-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.75, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
