import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowDown, HiArrowRight, HiArrowDownTray, HiCodeBracket } from 'react-icons/hi2';
import { profileStats, titles, achievements, socials } from '../data/portfolio.js';
import SectionHeader from '../components/SectionHeader.jsx';
import CountUp from 'react-countup';

export default function Home() {
  const [titleIndex, setTitleIndex] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTitleIndex((index) => (index + 1) % titles.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, []);

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        heroRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    opacity: Math.random() * 0.1 + 0.05,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`
  }));

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0f2c] via-[#0a0f2c] to-[#1a1f3a] text-white overflow-x-hidden">
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-5 pt-20 pb-16 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(118,89,233,0.1)_0%,transparent_70%)]" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-purple-500/20"
              style={{
                width: particle.size,
                height: particle.size,
                left: particle.left,
                top: particle.top,
                opacity: particle.opacity
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, 50, 0],
                opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />

        <div className="relative mx-auto grid w-full max-w-[1200px] items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] z-10">
          <div>
            {/* Status Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 mb-6"
            >
              <span className="size-2 animate-pulse rounded-full bg-purple-500" />
              <span className="text-xs font-medium uppercase tracking-wider text-purple-400">
                Available for new builds
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="text-[clamp(3rem,8vw,5rem)] font-bold leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Ayush Pandey
            </motion.h1>

            {/* Animated Title */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="flex items-center gap-2 text-xl font-medium text-purple-400 mb-8"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <span aria-hidden>&gt;</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={titles[titleIndex]}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {titles[titleIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="caret" aria-hidden>_</span>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="max-w-xl text-lg text-gray-300 leading-relaxed mb-10"
            >
              I design and ship full-stack systems — React interfaces, Node and
              FastAPI services, and the AI layers that connect them — built to
              hold up long after launch, not just at the demo.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="/projects"
                className="btn-primary"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
                <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download
                className="btn-secondary"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <HiArrowDownTray />
                Resume
              </motion.a>
              <motion.a
                href="/contact"
                className="btn-secondary"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Animated Code Structure */}
              <motion.div 
                className="relative w-80 h-80 rounded-2xl border border-purple-500/20 bg-white/5 backdrop-blur-xl p-6 shadow-2xl"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Decorative Elements */}
                <motion.div 
                  className="absolute top-4 left-4 w-3 h-3 rounded-full bg-purple-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute top-4 right-4 w-3 h-3 rounded-full bg-cyan-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <motion.div 
                  className="absolute bottom-4 left-1/2 w-3 h-3 rounded-full bg-orange-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                />

                {/* Central Code Block */}
                <div className="absolute inset-4 flex items-center justify-center">
                  <motion.div 
                    className="text-center"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <HiCodeBracket className="w-16 h-16 text-purple-400 mx-auto mb-2" />
                    <span className="text-xs text-purple-400 font-mono">fullStack()</span>
                  </motion.div>
                </div>

                {/* Floating Lines */}
                <motion.div 
                  className="absolute top-1/4 left-0 w-16 h-0.5 bg-gradient-to-r from-transparent to-purple-500"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute top-1/3 right-0 w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
                <motion.div 
                  className="absolute bottom-1/3 left-0 w-16 h-0.5 bg-gradient-to-r from-transparent to-orange-500"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="relative mx-auto mt-16 flex w-full max-w-[1200px] flex-wrap gap-8 border-t border-white/10 pt-8"
        >
          {profileStats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5 }}
              className="flex-1 min-w-[200px] text-center"
            >
              <strong 
                className="block text-3xl font-black text-white mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <CountUp 
                  end={stat.value} 
                  enableScrollSpy 
                  scrollSpyOnce 
                  duration={2.4}
                />
                {stat.suffix}
              </strong>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                {stat.label}
              </span>
              <motion.div 
                className="mt-3 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#highlights"
          className="absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-400 hover:text-purple-400 transition-colors"
          whileHover={{ y: -5 }}
        >
          <span>Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <HiArrowDown />
          </motion.span>
        </motion.a>
      </section>

      
      {/* Highlights Section */}
      <section id="highlights" className="px-5 py-20">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeader 
            eyebrow="Highlights"
            title="What Makes My Work Stand Out"
            copy="Clean code architecture, polished user experiences, scalable backend systems, and AI integrations that actually work in production."
            align="center"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                icon: '⚡',
                title: 'Performance First',
                desc: 'Optimized code and lazy loading ensure lightning-fast experiences'
              },
              {
                icon: '🎨',
                title: 'Pixel Perfect',
                desc: 'Attention to detail in every component and interaction'
              },
              {
                icon: '🔧',
                title: 'Scalable Architecture',
                desc: 'Modular codebase designed for growth and maintainability'
              },
              {
                icon: '🤖',
                title: 'AI Integration',
                desc: 'Production-ready AI systems with proper error handling'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="glass-card rounded-xl border border-white/10 p-6 transition-colors hover:border-purple-500/30"
              >
                <motion.div 
                  className="text-3xl mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Achievements Section - Only on Home Page */}
      <section id="achievements" className="px-5 py-20">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeader 
            eyebrow="Achievements"
            title="Numbers That Show Consistent Shipping"
            copy="A concise snapshot of delivered work, practice, certifications, and AI builds."
            align="center"
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {achievements.map(([label, value, suffix], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="glass-card rounded-xl border border-white/10 p-8 text-center transition-colors hover:border-purple-500/30"
              >
                <motion.strong 
                  className="block text-5xl font-black text-gradient mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <CountUp 
                    end={value} 
                    enableScrollSpy 
                    scrollSpyOnce 
                    duration={2.6} 
                    separator=","
                  />
                  {suffix}
                </motion.strong>
                <span className="font-bold text-gray-400">{label}</span>
                <motion.div 
                  className="mt-4 h-1 w-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Introduction Section */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Building the Next Generation of 
                <span className="text-gradient">Digital Experiences</span>
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                I specialize in creating full-stack applications that combine beautiful, 
                responsive interfaces with robust backend systems. From concept to deployment, 
                I ensure every project meets the highest standards of quality and performance.
              </p>
              <p className="text-gray-300 leading-relaxed">
                With expertise in both frontend and backend development, I bridge the gap 
                between design and functionality. My work focuses on delivering value through 
                clean code, intuitive user experiences, and scalable architecture.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="relative"
            >
              <div className="glass-card rounded-xl border border-white/10 p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  My Development Philosophy
                </h3>
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"
                      whileHover={{ scale: 1.2 }}
                    />
                    <p className="text-gray-300">Code should be readable, maintainable, and efficient</p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"
                      whileHover={{ scale: 1.2 }}
                    />
                    <p className="text-gray-300">User experience should be intuitive and delightful</p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"
                      whileHover={{ scale: 1.2 }}
                    />
                    <p className="text-gray-300">Systems should be scalable, secure, and reliable</p>
                  </motion.div>
                  <motion.div 
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0"
                      whileHover={{ scale: 1.2 }}
                    />
                    <p className="text-gray-300">Continuous learning and improvement is essential</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      
      {/* Social Links */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1200px] text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Let's Connect
            </h3>
            <div className="flex justify-center gap-4">
              {socials.map(([name, Icon, href]) => (
                <motion.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/30 transition-colors"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}