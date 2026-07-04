import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { HiEnvelope, HiMapPin, HiPaperAirplane, HiPhone } from 'react-icons/hi2'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import SectionHeader from '../components/SectionHeader.jsx'
import MagneticButton from '../components/MagneticButton.jsx'

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('')

  const submit = async (event) => {
    event.preventDefault()
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    setStatus('Sending...')
    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey })
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 700))
      }
      formRef.current.reset()
      setStatus('Message sent. Ayush will get back to you soon.')
    } catch (_error) {
      setStatus('Could not send right now. Please use the email link instead.')
    }
  }

  return (
    <section className="section-pad contact-section" id="contact">
      <div className="container contact-layout">
        <div>
          <SectionHeader
            eyebrow="Contact"
            title="Let's build something people remember."
            copy="Share the product, workflow, or AI idea you want to bring to life. The form is EmailJS-ready and gracefully works in demo mode until keys are configured."
          />
          <div className="contact-list" data-stagger>
            <a href="mailto:ayushpandey@example.com">
              <HiEnvelope />
              ayushpandey@example.com
            </a>
            <a href="tel:+910000000000">
              <HiPhone />
              +91 00000 00000
            </a>
            <span>
              <HiMapPin />
              India
            </span>
            <a href="https://github.com/">
              <FaGithub />
              GitHub
            </a>
            <a href="https://linkedin.com/">
              <FaLinkedin />
              LinkedIn
            </a>
          </div>
        </div>

        <form className="contact-form" ref={formRef} onSubmit={submit} data-reveal>
          <label>
            <span>Name</span>
            <input name="from_name" type="text" required placeholder="Your name" />
          </label>
          <label>
            <span>Email</span>
            <input name="reply_to" type="email" required placeholder="you@example.com" />
          </label>
          <label>
            <span>Subject</span>
            <input name="subject" type="text" required placeholder="Project inquiry" />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows="5" required placeholder="Tell me what you want to build" />
          </label>
          <MagneticButton type="submit">
            Send Message
            <HiPaperAirplane />
          </MagneticButton>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  )
}
