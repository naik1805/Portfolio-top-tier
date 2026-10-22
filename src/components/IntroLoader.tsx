import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  onDone: () => void
}

export function IntroLoader({ onDone }: Props) {
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return true
    return !sessionStorage.getItem('mohith-visited')
  })
  const [step, setStep] = useState(0)
  const lines = ['MOHITH S', 'AI SYSTEMS', 'INITIALIZING']

  useEffect(() => {
    if (!show) {
      onDone()
      return
    }

    sessionStorage.setItem('mohith-visited', 'true')
    const t1 = setTimeout(() => setStep(1), 260)
    const t2 = setTimeout(() => setStep(2), 520)
    const t3 = setTimeout(() => setShow(false), 950)
    const t4 = setTimeout(onDone, 1250)
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
          className="intro-loader"
          initial={{ y: 0 }}
          exit={{ y: '-102%', opacity: 0.95 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="intro-loader-inner">
            <p className="intro-path">M:\\SYSTEMS_LAB</p>
            <div className="intro-words">
              {lines.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 18 }}
                  animate={step >= i ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="intro-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
