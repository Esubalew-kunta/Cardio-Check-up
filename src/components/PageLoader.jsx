import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SEEN_KEY = 'cardio-loaded'

// Decide synchronously (in the useState initializer) whether to play, so the
// page renders beneath the overlay from the very first paint.
function readShouldShow() {
  if (typeof window === 'undefined') return false
  try {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = sessionStorage.getItem(SEEN_KEY) === '1'
    return !reduce && !seen
  } catch {
    return false
  }
}

// Cold-load entrance: a full-screen burgundy overlay where an ECG line draws
// across the centre and the logotype fades in beneath it. Non-blocking — the
// page renders underneath. Plays once per browser session (sessionStorage) and
// is skipped entirely under prefers-reduced-motion.
//
// Note: `show` is computed in the initializer and the hide timeout is scheduled
// whenever `show` is true. This is intentionally robust to React StrictMode's
// double-invoked effects (the previous version set the sessionStorage flag
// inside the effect and early-returned on the second run, leaving the overlay
// stuck on screen until a manual refresh).
export default function PageLoader() {
  const [show, setShow] = useState(readShouldShow)

  // Mark as seen once mounted — idempotent, safe under StrictMode.
  useEffect(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* ignore storage failures (private mode) */
    }
  }, [])

  // Hide after the animation completes (~1.8s), then the exit fade unmounts it.
  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => setShow(false), 1800)
    return () => clearTimeout(t)
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center bg-burgundy-deep"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
        >
          <div className="w-[min(80vw,520px)] flex flex-col items-center">
            <svg viewBox="0 0 600 80" className="w-full h-16" fill="none" preserveAspectRatio="none">
              <motion.path
                d="M0 40 H210 l14 0 8 -26 12 52 9 -66 11 66 9 -26 13 0 H380 l14 0 8 -26 12 52 9 -66 11 66 9 -26 13 0 H600"
                stroke="var(--color-signal)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0.9 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </svg>
            <motion.span
              className="mt-6 font-display text-2xl font-semibold tracking-[0.16em] text-offwhite"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              CARDIO CHECK-UP
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
