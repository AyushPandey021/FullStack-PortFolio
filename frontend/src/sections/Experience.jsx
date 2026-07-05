import { experience } from '../data/portfolio.js'
import SectionHeader from '../components/SectionHeader.jsx'

export default function Experience() {
  return (
    <section className="bg-gradient-to-b from-transparent via-soft to-transparent px-5 py-28 dark:via-zinc-950" id="experience">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader
          eyebrow="Experience"
          title="Built across product, client, and research-style environments."
          copy="A timeline of practical engineering work: shipping applications, improving workflows, and turning AI prototypes into usable products."
        />
        <div className="relative ml-auto grid max-w-4xl gap-7 before:absolute before:bottom-0 before:left-2 before:top-0 before:w-px before:bg-gradient-to-b before:from-ember before:via-cyan-600 before:to-emerald-600">
          {experience.map((item) => (
            <article className="relative pl-11" key={item.company} data-reveal>
              <div className="absolute left-0 top-5 size-4 rounded-full border-4 border-paper bg-ember shadow-[0_0_0_1px_#ff6a00] dark:border-night" />
              <div className="rounded-lg border border-black/10 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-panel/70">
                <span className="text-xs font-black uppercase text-ember">{item.duration}</span>
                <h3 className="mt-2 text-2xl font-black text-ink dark:text-white">{item.position}</h3>
                <strong className="mt-1 block text-muted dark:text-zinc-400">{item.company}</strong>
                <ul className="my-5 grid gap-2 pl-5 leading-7 text-muted dark:text-zinc-400">
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <small className="rounded-full border border-black/10 px-3 py-2 font-extrabold text-muted dark:border-white/10 dark:text-zinc-400" key={tech}>{tech}</small>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
