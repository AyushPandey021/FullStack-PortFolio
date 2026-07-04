import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.4,
    })

    // expose lenis instance so other parts of the app can reset scroll
    try {
      // attach to window for simple access during navigation
      window.lenis = lenis
    } catch (err) {
      // ignore if window is not available
    }

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }

    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      try {
        // cleanup global reference
        if (window.lenis === lenis) delete window.lenis
      } catch (err) {
        // ignore
      }
    }
  }, [])
}
