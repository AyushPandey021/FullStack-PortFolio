import { HiArrowRight, HiEnvelope } from 'react-icons/hi2'
import MagneticButton from '../components/MagneticButton.jsx'

export default function HomeContactCTA() {
  return (
    <section className="section-pad home-contact-cta" id="contact">
      <div className="container cta-panel" data-reveal>
        <div>
          <span className="eyebrow">Contact</span>
          <h2 data-split>Have a product, AI idea, or dashboard to build?</h2>
          <p>
            The dedicated contact page has the polished form, contact details, and social links. Go there
            when you&apos;re ready to start the conversation.
          </p>
        </div>
        <MagneticButton href="/contact">
          <HiEnvelope />
          Open Contact Page
          <HiArrowRight />
        </MagneticButton>
      </div>
    </section>
  )
}
