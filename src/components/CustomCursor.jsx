import { useEffect, useRef, useState } from 'react'
import { motion, spring, animate } from 'framer-motion'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [trail, setTrail] = useState([])
  const cursorRef = useRef(null)
  const cursorRingRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) {
      setHidden(true)
      return
    }

    const mouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Add to trail
      setTrail(prev => [
        ...prev.slice(-4), // Keep only last 5 positions
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ])
      
      // Check if hovering over interactive elements
      const target = e.target
      const isInteractive = target.closest('a, button, [data-cursor-hover], .magnetic-button, .btn-primary, .btn-secondary, .glass-card, .icon-container')
      setHovering(!!isInteractive)
    }

    const mouseDown = () => setClicking(true)
    const mouseUp = () => setClicking(false)
    const mouseLeave = () => setHovering(false)

    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mousedown', mouseDown)
    window.addEventListener('mouseup', mouseUp)
    window.addEventListener('mouseleave', mouseLeave)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mousedown', mouseDown)
      window.removeEventListener('mouseup', mouseUp)
      window.removeEventListener('mouseleave', mouseLeave)
    }
  }, [])

  // Spring physics configuration for smooth movement
  const cursorVariants = {
    default: {
      x: position.x - 8,
      y: position.y - 8,
      transition: {
        type: spring,
        damping: 35,
        stiffness: 600,
        mass: 0.4,
        restDelta: 0.001
      }
    },
    clicking: {
      x: position.x - 8,
      y: position.y - 8,
      scale: 0.4,
      transition: {
        type: spring,
        damping: 15,
        stiffness: 1000,
        mass: 0.2
      }
    }
  }

  const ringVariants = {
    default: {
      x: position.x - 20,
      y: position.y - 20,
      scale: 1,
      transition: {
        type: spring,
        damping: 30,
        stiffness: 400,
        mass: 0.6,
        restDelta: 0.001
      }
    },
    hovering: {
      x: position.x - 20,
      y: position.y - 20,
      scale: 1.8,
      transition: {
        type: spring,
        damping: 20,
        stiffness: 500,
        mass: 0.4
      }
    },
    clicking: {
      x: position.x - 20,
      y: position.y - 20,
      scale: 0.6,
      transition: {
        type: spring,
        damping: 10,
        stiffness: 800,
        mass: 0.3
      }
    }
  }

  // Trail particle animation
  useEffect(() => {
    if (trail.length > 0) {
      // Animate trail particles to fade out
      const timer = setTimeout(() => {
        setTrail(prev => prev.slice(1))
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [trail])

  if (hidden) return null

  return (
    <>
      {/* Trail Particles */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          initial={{ 
            x: point.x - 4,
            y: point.y - 4,
            opacity: 0.8,
            scale: 1 
          }}
          animate={{ 
            x: point.x - 4 - (trail.length - index) * 2,
            y: point.y - 4 - (trail.length - index) * 2,
            opacity: 0,
            scale: 0.5
          }}
          transition={{ 
            duration: 0.3,
            ease: 'easeOut',
            delay: index * 0.05
          }}
          className="pointer-events-none fixed left-0 top-0 z-[299] hidden md:block"
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'rgba(108, 92, 231, 0.4)',
            boxShadow: '0 0 8px rgba(108, 92, 231, 0.3)'
          }}
        />
      ))}
      
      {/* Cursor Ring - Larger circle that follows with delay */}
      <motion.div
        ref={cursorRingRef}
        variants={ringVariants}
        animate={clicking ? 'clicking' : hovering ? 'hovering' : 'default'}
        className="pointer-events-none fixed left-0 top-0 z-[300] hidden md:block"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '2px solid',
          borderColor: hovering ? 'rgba(108, 92, 231, 0.8)' : 'rgba(108, 92, 231, 0.4)',
          background: clicking ? 'rgba(108, 92, 231, 0.3)' : 'transparent',
          boxShadow: hovering 
            ? '0 0 40px rgba(108, 92, 231, 0.6)'
            : clicking 
              ? '0 0 25px rgba(108, 92, 231, 0.5)'
              : '0 0 20px rgba(108, 92, 231, 0.3)',
          transition: 'all 0.2s ease-out'
        }}
      />
      
      {/* Cursor Dot - Small circle that follows with spring */}
      <motion.div
        ref={cursorRef}
        variants={cursorVariants}
        animate={clicking ? 'clicking' : 'default'}
        className="pointer-events-none fixed left-0 top-0 z-[301] hidden md:block"
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: clicking ? '#6c5ce7' : hovering ? '#a29bfe' : 'rgba(108, 92, 231, 0.9)',
          boxShadow: clicking 
            ? '0 0 20px rgba(108, 92, 231, 0.9)'
            : hovering 
              ? '0 0 25px rgba(108, 92, 231, 0.7)'
              : '0 0 12px rgba(108, 92, 231, 0.5)',
          transition: 'all 0.15s ease-out'
        }}
      />
    </>
  )
}
