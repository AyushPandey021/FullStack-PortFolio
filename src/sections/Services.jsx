import { HiArrowRight } from 'react-icons/hi2'
import { services } from '../data/portfolio.js'
import SectionHeader from '../components/SectionHeader.jsx'

export default function Services() {
  return (
    <section className="bg-gradient-to-b from-transparent via-soft to-transparent px-5 py-28 dark:via-zinc-950" id="services">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader
          eyebrow="Services"
          title="End-to-end engineering for ambitious builds."
          copy="From first interface to deployed backend, Ayush can own the full path from prototype to production."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" data-stagger>
          {services.map(([title, copy], index) => (
            <article className="min-h-56 rounded-lg border border-black/10 bg-white/70 p-5 backdrop-blur-xl transition hover:-translate-y-1.5 hover:border-ember/40 hover:shadow-premium dark:border-white/10 dark:bg-panel/70" key={title}>
              <span className="font-black text-ember">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 text-xl font-black text-ink dark:text-white">{title}</h3>
              <p className="mt-3 leading-7 text-muted dark:text-zinc-400">{copy}</p>
              <HiArrowRight className="mt-4 text-ember" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
