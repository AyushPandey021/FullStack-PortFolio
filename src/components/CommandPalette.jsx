import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { navItems, projects } from '../data/portfolio.js'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const items = useMemo(
    () => [
      ...navItems.map((item) => ({ label: item.label, detail: 'Section', href: item.href })),
      ...projects.map((project) => ({
        label: project.title,
        detail: project.category,
        href: '#projects',
      })),
    ],
    [],
  )

  const filtered = items.filter((item) =>
    `${item.label} ${item.detail}`.toLowerCase().includes(query.toLowerCase()),
  )

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((current) => !current)
      }
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const go = (href) => {
    if (href.startsWith('/')) {
      window.location.href = href
    } else {
      window.location.hash = href.replace('#', '')
    }
    setOpen(false)
    setQuery('')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] grid place-items-start bg-black/50 px-5 pt-24 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setOpen(false)}
        >
          <motion.div
            className="w-full max-w-2xl overflow-hidden rounded-lg border border-black/10 bg-white/80 shadow-premium backdrop-blur-2xl dark:border-white/10 dark:bg-panel/80"
            initial={{ y: 24, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 16, scale: 0.98, opacity: 0 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="grid grid-cols-[22px_1fr_auto] items-center gap-3 border-b border-black/10 p-4 dark:border-white/10">
              <HiMagnifyingGlass className="text-muted dark:text-zinc-400" />
              <input
                className="w-full bg-transparent py-3 text-ink outline-none placeholder:text-muted dark:text-white dark:placeholder:text-zinc-500"
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sections and projects"
              />
              <kbd className="rounded-md border border-black/10 px-2 py-1 text-sm text-muted dark:border-white/10 dark:text-zinc-400">
                Esc
              </kbd>
            </div>
            <div className="grid max-h-[360px] gap-1 overflow-auto p-2">
              {filtered.map((item) => (
                <button
                  className="flex justify-between gap-4 rounded-lg p-3 text-left text-ink transition hover:bg-ember/10 dark:text-white"
                  key={`${item.label}-${item.detail}`}
                  onClick={() => go(item.href)}
                >
                  <span>{item.label}</span>
                  <small className="text-muted dark:text-zinc-400">{item.detail}</small>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
