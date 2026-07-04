import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiSparkles, HiXMark } from 'react-icons/hi2'

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-[70] grid justify-items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            className="relative w-[min(320px,calc(100vw-40px))] rounded-lg border border-black/10 bg-white/80 p-5 shadow-premium backdrop-blur-2xl dark:border-white/10 dark:bg-panel/80"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
          >
            <button
              className="absolute right-3 top-3 grid size-8 place-items-center rounded-lg border border-black/10 bg-white/70 dark:border-white/10 dark:bg-white/10"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
            >
              <HiXMark />
            </button>
            <strong>Ask about Ayush</strong>
            <p className="mt-2 leading-7 text-muted dark:text-zinc-400">
              Try the command palette with Ctrl + K, jump to projects, or head straight to contact.
            </p>
            <a className="font-black text-ember" href="/contact">
              Start a conversation
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="relative grid size-14 place-items-center rounded-full bg-ember text-white shadow-[0_18px_44px_rgba(255,106,0,0.34)]"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="absolute -inset-1.5 animate-pulse rounded-full border border-ember/60" />
        <HiSparkles />
      </button>
    </div>
  )
}
