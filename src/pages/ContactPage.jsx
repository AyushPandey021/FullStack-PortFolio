import Contact from '../sections/Contact.jsx'
import Footer from '../sections/Footer.jsx'

export default function ContactPage() {
  return (
    <>
      <section className="page-hero section-pad contact-page-hero">
        <div className="container page-hero-grid">
          <div data-reveal>
            <span className="eyebrow">Contact Studio</span>
            <h1 data-split>Let&apos;s talk about the next sharp build.</h1>
            <p>
              A focused contact page with direct details, social links, and an EmailJS-ready form for
              serious project conversations.
            </p>
          </div>
          <div className="contact-orbital" data-reveal>
            <i />
            <i />
            <i />
            <strong>Available</strong>
          </div>
        </div>
      </section>
      <Contact />
      <Footer />
    </>
  )
}
