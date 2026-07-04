import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Enhanced spring-smoothed values for ultra-smooth following
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 800, mass: 0.2 })
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 800, mass: 0.2 })
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 300, mass: 0.4 })
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 300, mass: 0.4 })

  const scale = useMotionValue(1)
  const ringScale = useSpring(scale, { damping: 25, stiffness: 400 })
  const ringOpacity = useSpring(scale, { damping: 25, stiffness: 400 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const mouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      const isInteractive = e.target.closest(
        'a, button, [data-cursor-hover], .magnetic-button, .btn-primary, .btn-secondary, .glass-card, .icon-container, .link-hover, input, textarea, select'
      )
      scale.set(isInteractive ? 1.8 : 1)
    }

    const mouseDown = () => scale.set(0.5)
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
      {/* Cursor Ring - Enhanced with theme-aware styling */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[300] hidden md:block rounded-full border border-purple-500/30 dark:border-purple-400/50"
        style={{
          width: 30,
          height: 30,
          x: ringX,
          y: ringY,
          scale: ringScale,
          translateX: '-50%',
          translateY: '-50%',
          opacity: ringOpacity,
          boxShadow: '0 0 20px rgba(108, 92, 231, 0.3)',
          background: 'rgba(108, 92, 231, 0.05)'
        }}
      />

      {/* Cursor Dot - Enhanced with theme-aware styling */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[301] hidden md:block rounded-full bg-purple-500 dark:bg-purple-500"
        style={{
          width: 10,
          height: 10,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 12px rgba(108, 92, 231, 0.5)'
        }}
      />
    </>
  )
}