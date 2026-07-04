import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiEnvelope, HiPhone, HiMapPin, HiUser, HiPaperAirplane } from 'react-icons/hi2';
import { socials } from '../data/portfolio.js';
import SectionHeader from '../components/SectionHeader.jsx';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0f2c] via-[#0a0f2c] to-[#1a1f3a] text-white">
      
      {/* Hero Section */}
      <section className="relative px-5 pt-24 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(118,89,233,0.08)_0%,transparent_70%)]" />
        
        <div className="relative mx-auto max-w-[1200px] text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-purple-400">
              Contact Studio
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-tight text-white mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Let's Talk About the Next 
            <span className="text-gradient">Sharp Build</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed"
          >
            A focused contact page with direct details, social links, and a form 
            for serious project conversations. Share your product vision, workflow needs, 
            or AI ideas you want to bring to life.
          </motion.p>
        </div>
      </section>

      
      {/* Availability Status */}
      <section className="px-5 py-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="glass-card rounded-xl border border-white/10 p-8 text-center"
          >
            <motion.div 
              className="relative inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-3"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-sm font-medium uppercase tracking-wider text-emerald-400">
                Available for New Projects
              </span>
            </motion.div>
            <p className="mt-4 text-gray-400">
              Currently accepting new projects and collaborations. Let's build something amazing together.
            </p>
          </motion.div>
        </div>
      </section>

      
      {/* Contact Info and Form */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="space-y-8"
            >
              <SectionHeader 
                eyebrow="Get in Touch"
                title="Connect With Me"
                copy="Feel free to reach out through any of these channels. I'm always happy to discuss new opportunities and collaborations."
                align="left"
              />

              <div className="glass-card rounded-xl border border-white/10 p-8 space-y-6">
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                  >
                    <div className="grid size-12 place-items-center rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-400">
                      <HiEnvelope className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">
                        Email
                      </h3>
                      <a 
                        href="mailto:ayushpandey@example.com"
                        className="text-white hover:text-purple-400 transition-colors link-hover"
                      >
                        ayushpandey@example.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                  >
                    <div className="grid size-12 place-items-center rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-400">
                      <HiPhone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">
                        Phone
                      </h3>
                      <a 
                        href="tel:+91000000000"
                        className="text-white hover:text-purple-400 transition-colors link-hover"
                      >
                        +91 00000 00000
                      </a>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-4"
                    whileHover={{ x: 5 }}
                  >
                    <div className="grid size-12 place-items-center rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-400">
                      <HiMapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">
                        Location
                      </h3>
                      <p className="text-gray-300">India</p>
                    </div>
                  </motion.div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                    Social Links
                  </h3>
                  <div className="flex gap-4">
                    {socials.map(([name, Icon, href]) => (
                      <motion.a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/30 transition-colors"
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              <SectionHeader 
                eyebrow="Send a Message"
                title="Tell Me What You Want to Build"
                copy="Fill out the form below and I'll get back to you as soon as possible. All fields are required."
                align="left"
              />

              <form onSubmit={handleSubmit} className="glass-card rounded-xl border border-white/10 p-8">
                {submitStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div 
                      className="grid size-20 place-items-center rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto mb-4"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <HiPaperAirplane className="w-8 h-8 text-emerald-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-300">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="grid gap-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div 
                          className="relative"
                          whileHover={{ scale: 1.01 }}
                        >
                          <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="w-full rounded-lg border border-white/10 bg-white/5 pl-12 pr-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/40 focus:bg-white/10 transition-colors"
                            required
                          />
                        </motion.div>
                        <motion.div 
                          className="relative"
                          whileHover={{ scale: 1.01 }}
                        >
                          <HiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="w-full rounded-lg border border-white/10 bg-white/5 pl-12 pr-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/40 focus:bg-white/10 transition-colors"
                            required
                          />
                        </motion.div>
                      </div>
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.01 }}
                      >
                        <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Subject (e.g., Project Inquiry)"
                          className="w-full rounded-lg border border-white/10 bg-white/5 pl-12 pr-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/40 focus:bg-white/10 transition-colors"
                          required
                        />
                      </motion.div>
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.01 }}
                      >
                        <HiMapPin className="absolute left-4 top-6 w-5 h-5 text-purple-400" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell me about your project, what you're trying to build, your timeline, and any other details that would be helpful."
                          rows={5}
                          className="w-full rounded-lg border border-white/10 bg-white/5 pl-12 pr-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/40 focus:bg-white/10 transition-colors resize-none"
                          required
                        />
                      </motion.div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full mt-8 inline-flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <HiPaperAirplane />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </>
                )}
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}