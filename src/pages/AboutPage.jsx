import { motion } from 'framer-motion';
import { aboutFacts, profileStats } from '../data/portfolio.js';
import SectionHeader from '../components/SectionHeader.jsx';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0f2c] via-[#0a0f2c] to-[#1a1f3a] text-white">
      {/* Hero Section */}
      <section className="relative px-5 pt-24 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(118,89,233,0.1)_0%,transparent_70%)]" />
        
        <div className="relative mx-auto max-w-[1200px] text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-purple-400">
              About Me
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-tight text-white mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            A Developer Who <span className="text-gradient">Thinks in Systems</span>,
            <br />
            Interfaces, and Outcomes.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed"
          >
            Ayush combines product taste with full-stack execution: crisp interfaces, 
            reliable APIs, database design, AI integrations, and deployment workflows 
            that hold up after launch.
          </motion.p>
        </div>
      </section>

      {/* Personal Info Section */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="glass-card rounded-xl border border-white/10 p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-8">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aboutFacts.map(([label, value]) => (
                <div 
                  key={label}
                  className="flex flex-col gap-2 border border-white/5 p-4 rounded-lg hover:border-purple-500/30 transition-colors"
                >
                  <span className="text-sm text-gray-400">{label}</span>
                  <strong className="text-white">{value}</strong>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {profileStats.map((stat) => (
              <div 
                key={stat.label}
                className="glass-card rounded-xl border border-white/10 p-6 text-center hover:border-purple-500/30 transition-colors"
              >
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="transition-transform duration-300"
                >
                  <strong 
                    className="block text-4xl font-black text-gradient mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {stat.value}{stat.suffix}
                  </strong>
                  <span className="text-gray-400 text-sm font-medium">{stat.label}</span>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                My Approach to Development
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                I believe in building systems that are not just functional but also maintainable and scalable. 
                Every line of code should have a purpose, every component should be reusable, and every 
                interaction should feel intuitive.
              </p>
              <p className="text-gray-300 leading-relaxed">
                With years of experience across the full stack, I understand how all the pieces fit together - 
                from the database layer to the user interface. This holistic perspective allows me to make 
                better architectural decisions and build more cohesive products.
              </p>
            </div>
            
            <div className="glass-card rounded-xl border border-white/10 p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                What Drives Me
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-300">Building products that solve real problems</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-300">Creating seamless user experiences</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-300">Writing clean, maintainable code</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                  <p className="text-gray-300">Continuously learning and improving</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <SectionHeader 
              eyebrow="Core Competencies"
              title="A Versatile Full Stack Developer"
              copy="From frontend polish to backend reliability, database confidence to cloud delivery, and AI application design - I bring a comprehensive toolkit to every project."
              align="center"
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                { title: 'Frontend', desc: 'React, Next.js, Tailwind, TypeScript' },
                { title: 'Backend', desc: 'Node.js, Express, Python, FastAPI' },
                { title: 'Database', desc: 'MongoDB, PostgreSQL, Redis' },
                { title: 'Cloud', desc: 'AWS, Docker, CI/CD pipelines' },
                { title: 'AI/ML', desc: 'LangChain, LLM apps, RAG systems' },
                { title: 'DevOps', desc: 'Docker, Kubernetes, GitHub Actions' }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-xl border border-white/10 p-6 transition-colors hover:border-purple-500/30"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}