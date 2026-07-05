import { useRef } from 'react'

export default function MagneticButton({
  children,
  href,
  className = '',
  variant = 'primary',
  onClick,
  type = 'button',
  download,
}) {
  const ref = useRef(null)

  const move = (event) => {
    const element = ref.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    element.style.transform = `translate(${x * 0.16}px, ${y * 0.2}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  const base =
    'inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border px-5 font-black leading-none transition duration-200 will-change-transform'
  const styles =
    variant === 'secondary'
      ? 'border-black/10 bg-white/70 text-ink shadow-none backdrop-blur-xl hover:border-ember/40 dark:border-white/10 dark:bg-panel/70 dark:text-white'
      : 'border-ember bg-ember text-white shadow-[0_18px_44px_rgba(255,106,0,0.28)] hover:shadow-[0_24px_62px_rgba(255,106,0,0.36)]'
  const classes = `${base} ${styles} ${className}`
  const shared = {
    ref,
    className: classes,
    onMouseMove: move,
    onMouseLeave: reset,
    onClick,
  }

  if (href) {
    return (
      <a {...shared} href={href} download={download}>
        {children}
      </a>
    )
  }

  return (
    <button {...shared} type={type}>
      {children}
    </button>
  )
}
