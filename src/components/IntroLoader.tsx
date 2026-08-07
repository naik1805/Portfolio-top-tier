import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  onDone: () => void
}

export function IntroLoader({ onDone }: Props) {
  const [show, setShow] = useState(true)
  const [step, setStep] = useState(0)
  const lines = ['LOADING', 'PLS', 'WAIT']

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 450)
    const t2 = setTimeout(() => setStep(2), 900)
    const t3 = setTimeout(() => setShow(false), 1700)
    const t4 = setTimeout(onDone, 2100)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro-loader"
          initial={{ y: 0 }}
          exit={{ y: '-105%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="intro-loader-inner">
            <p className="intro-path">M:\\Portfolio</p>
            <div className="intro-words">
              {lines.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 24 }}
                  animate={step >= i ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="intro-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
