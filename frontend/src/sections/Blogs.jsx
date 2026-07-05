import { HiArrowRight } from 'react-icons/hi2'
import { blogs } from '../data/portfolio.js'
import SectionHeader from '../components/SectionHeader.jsx'

export default function Blogs() {
  return (
    <section className="section-pad section-band" id="blogs">
      <div className="container">
        <SectionHeader
          eyebrow="Blogs"
          title="Thinking in public about better software."
          copy="Editorial-style cards for writing on AI engineering, shipping habits, and premium frontend craft."
          align="center"
        />
        <div className="blog-grid" data-stagger>
          {blogs.map((blog) => (
            <article className="blog-card tilt-card" key={blog.title}>
              <span>{blog.category}</span>
              <h3>{blog.title}</h3>
              <div>
                <small>{blog.read}</small>
                <HiArrowRight />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
