import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring-smoothed values — updates happen outside React re-renders
  const dotX = useSpring(mouseX, { damping: 30, stiffness: 700, mass: 0.3 })
  const dotY = useSpring(mouseY, { damping: 30, stiffness: 700, mass: 0.3 })
  const ringX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.5 })
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.5 })

  const scale = useMotionValue(1)
  const ringScale = useSpring(scale, { damping: 20, stiffness: 300 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const mouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      const isInteractive = e.target.closest(
        'a, button, [data-cursor-hover], .magnetic-button, .btn-primary, .btn-secondary, .glass-card, .icon-container'
      )
      scale.set(isInteractive ? 1.6 : 1)
    }

    const mouseDown = () => scale.set(0.6)
    const mouseUp = () => scale.set(1)

    window.addEventListener('mousemove', mouseMove, { passive: true })
    window.addEventListener('mousedown', mouseDown)
    window.addEventListener('mouseup', mouseUp)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mousedown', mouseDown)
      window.removeEventListener('mouseup', mouseUp)
    }
  }, [mouseX, mouseY, scale])

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null
  }

  return (
    <>
      {/* Cursor Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[300] hidden md:block rounded-full border border-purple-400/50"
        style={{
          width: 26,
          height: 26,
          x: ringX,
          y: ringY,
          scale: ringScale,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 14px rgba(108, 92, 231, 0.35)'
        }}
      />

      {/* Cursor Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[301] hidden md:block rounded-full bg-purple-500"
        style={{
          width: 8,
          height: 8,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 8px rgba(108, 92, 231, 0.6)'
        }}
      />
    </>
  )
}