import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const ring = useRef(null)
  const dot = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let ringX = x
    let ringY = y
    let frame

    const move = (event) => {
      x = event.clientX
      y = event.clientY
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`
    }

    const animate = () => {
      ringX += (x - ringX) * 0.16
      ringY += (y - ringY) * 0.16
      if (ring.current) ring.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      frame = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', move)
    animate()
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[300] hidden size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ember/80 md:block"
        ref={ring}
      />
      <div
        className="pointer-events-none fixed left-0 top-0 z-[300] hidden size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember shadow-[0_0_26px_rgba(255,106,0,0.8)] md:block"
        ref={dot}
      />
    </>
  )
}
