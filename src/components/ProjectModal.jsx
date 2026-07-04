import { AnimatePresence, motion } from 'framer-motion'
import { HiArrowTopRightOnSquare, HiCodeBracket, HiXMark } from 'react-icons/hi2'
import MagneticButton from './MagneticButton.jsx'

export default function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[110] grid place-items-center bg-black/50 p-5 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.article
            className="relative grid max-h-[calc(100vh-40px)] w-full max-w-5xl overflow-auto rounded-lg border border-black/10 bg-white/85 shadow-premium backdrop-blur-2xl md:grid-cols-[0.9fr_1.1fr] dark:border-white/10 dark:bg-panel/90"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.97 }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-lg border border-black/10 bg-white/80 dark:border-white/10 dark:bg-white/10"
              onClick={onClose}
              aria-label="Close project modal"
            >
              <HiXMark />
            </button>
            <div className={`relative min-h-72 overflow-hidden p-5 md:min-h-[520px] bg-gradient-to-br ${project.tone}`}>
              <div className="mb-4 flex gap-2">
                <span className="size-2.5 rounded-full bg-rose-400" />
                <span className="size-2.5 rounded-full bg-yellow-300" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="absolute inset-x-5 bottom-5 grid gap-2">
                {project.features.map((feature) => (
                  <i
                    className="rounded-lg border border-white/20 bg-night/45 px-3 py-2 text-sm font-extrabold not-italic text-white backdrop-blur-xl"
                    key={feature}
                  >
                    {feature}
                  </i>
                ))}
              </div>
            </div>
            <div className="p-8">
              <span className="text-xs font-black uppercase text-ember">{project.category}</span>
              <h3 className="mt-3 text-[clamp(2rem,5vw,4rem)] font-black leading-none text-ink dark:text-white">
                {project.title}
              </h3>
              <p className="mt-4 leading-7 text-muted dark:text-zinc-400">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    className="rounded-full border border-black/10 px-3 py-2 text-sm font-extrabold text-muted dark:border-white/10 dark:text-zinc-400"
                    key={tech}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="my-6 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div
                    className="flex items-center gap-2 rounded-lg border border-black/10 p-3 font-extrabold text-muted dark:border-white/10 dark:text-zinc-400"
                    key={feature}
                  >
                    <HiCodeBracket />
                    {feature}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <MagneticButton href="https://github.com/" variant="secondary">
                  <HiCodeBracket />
                  GitHub
                </MagneticButton>
                <MagneticButton href="/contact">
                  <HiArrowTopRightOnSquare />
                  Live Demo
                </MagneticButton>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
