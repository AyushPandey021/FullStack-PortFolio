import CountUp from 'react-countup'
import { achievements } from '../data/portfolio.js'
import SectionHeader from '../components/SectionHeader.jsx'

export default function Achievements() {
  return (
    <section className="bg-gradient-to-b from-transparent via-soft to-transparent px-5 py-28 dark:via-zinc-950" id="achievements">
      <div className="mx-auto max-w-[1180px]">
        <SectionHeader
          eyebrow="Achievements"
          title="Numbers that show consistent shipping."
          copy="A concise snapshot of delivered work, practice, certifications, and AI builds."
          align="center"
        />
        <div className="grid overflow-hidden rounded-lg border border-black/10 sm:grid-cols-2 lg:grid-cols-3 dark:border-white/10" data-stagger>
          {achievements.map(([label, value, suffix]) => (
            <article className="border-b border-black/10 p-7 lg:border-r dark:border-white/10" key={label}>
              <strong className="block text-5xl font-black text-ink dark:text-white">
                <CountUp end={value} enableScrollSpy scrollSpyOnce duration={2.6} separator="," />
                {suffix}
              </strong>
              <span className="font-bold text-muted dark:text-zinc-400">{label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
