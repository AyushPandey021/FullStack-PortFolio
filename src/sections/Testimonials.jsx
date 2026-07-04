import { testimonials } from '../data/portfolio.js'
import SectionHeader from '../components/SectionHeader.jsx'

export default function Testimonials() {
  return (
    <section className="section-pad" id="testimonials">
      <div className="container">
        <SectionHeader
          eyebrow="Testimonials"
          title="The work should feel easy to trust."
          copy="A portfolio-ready testimonial system with premium glass surfaces and soft auto-scrolling motion."
        />
      </div>
      <div className="testimonial-rail" data-reveal>
        <div className="testimonial-track">
          {[...testimonials, ...testimonials].map((item, index) => (
            <article className="testimonial-card" key={`${item.name}-${index}`}>
              <p>&quot;{item.quote}&quot;</p>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
