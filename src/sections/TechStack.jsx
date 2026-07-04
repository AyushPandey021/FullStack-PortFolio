import { techLogos } from '../data/portfolio.js'
import SectionHeader from '../components/SectionHeader.jsx'

export default function TechStack() {
  const doubled = [...techLogos, ...techLogos]

  return (
    <section className="overflow-hidden bg-paper py-28 dark:bg-night" id="tech-stack">
      <div className="mx-auto max-w-[1180px] px-5">
        <SectionHeader
          eyebrow="Tech Stack"
          title="Tools that keep the build sharp."
          copy="A fast-moving stack for modern full-stack, cloud, and AI product development."
          align="center"
        />
      </div>
      <div className="overflow-hidden border-y border-black/10 dark:border-white/10" data-reveal>
        <div className="flex w-max animate-marquee">
          {doubled.map(([name, Icon], index) => (
            <div className="flex min-w-44 items-center justify-center gap-3 px-7 py-5 font-black text-ink dark:text-white" key={`${name}-${index}`}>
              <Icon className="size-6 text-ember" />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
