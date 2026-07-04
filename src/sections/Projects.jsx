import { useState } from 'react'
import { HiArrowTopRightOnSquare, HiCodeBracket } from 'react-icons/hi2'
import { projects } from '../data/portfolio.js'
import SectionHeader from '../components/SectionHeader.jsx'
import ProjectModal from '../components/ProjectModal.jsx'

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="bg-paper px-5 py-28 dark:bg-night" id="projects">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader
          eyebrow="Projects"
          title="Signature builds with product depth."
          copy="Large, interactive cards for the projects recruiters and clients care about: AI search, visitor systems, learning platforms, workflow tools, and polished portfolio work."
          align="center"
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-stagger>
          {projects.map((project) => (
            <article className="group relative overflow-hidden rounded-lg border border-black/10 bg-white/70 backdrop-blur-xl transition hover:-translate-y-1.5 hover:border-ember/40 hover:shadow-premium dark:border-white/10 dark:bg-panel/70" key={project.title}>
              <button className="w-full bg-transparent p-0 text-left text-inherit" onClick={() => setSelected(project)}>
                <div className={`relative min-h-60 overflow-hidden p-5 bg-gradient-to-br ${project.tone}`}>
                  <div className="mb-4 flex gap-2">
                    <span className="size-2.5 rounded-full bg-rose-400" />
                    <span className="size-2.5 rounded-full bg-yellow-300" />
                    <span className="size-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="absolute inset-x-5 bottom-5 grid gap-2">
                    {project.features.slice(0, 3).map((feature) => (
                      <i className="rounded-lg border border-white/20 bg-night/45 px-3 py-2 text-sm font-extrabold not-italic text-white backdrop-blur-xl" key={feature}>
                        {feature}
                      </i>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-black uppercase text-ember">{project.category}</span>
                  <h3 className="mt-2 text-2xl font-black text-ink dark:text-white">{project.title}</h3>
                  <p className="mt-3 leading-7 text-muted dark:text-zinc-400">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech) => (
                      <small className="rounded-full border border-black/10 px-3 py-2 font-extrabold text-muted dark:border-white/10 dark:text-zinc-400" key={tech}>{tech}</small>
                    ))}
                  </div>
                </div>
              </button>
              <div className="absolute right-4 top-4 flex gap-2">
                <a className="grid size-10 place-items-center rounded-lg border border-white/20 bg-white/25 text-white backdrop-blur-xl" href="https://github.com/" aria-label={`${project.title} GitHub`}>
                  <HiCodeBracket />
                </a>
                <a className="grid size-10 place-items-center rounded-lg border border-white/20 bg-white/25 text-white backdrop-blur-xl" href="/contact" aria-label={`${project.title} live demo`}>
                  <HiArrowTopRightOnSquare />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
