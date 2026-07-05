import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowTopRightOnSquare, HiCodeBracket, HiArrowRight, HiXMark } from 'react-icons/hi2';
import { projects } from '../data/portfolio.js';
import SectionHeader from '../components/SectionHeader.jsx';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Get unique categories
  const categories = [...new Set(projects.map(p => p.category))];

  // Filter projects by category
  const filteredProjects = hoveredCategory 
    ? projects.filter(p => p.category === hoveredCategory)
    : projects;

  // Color scheme for categories
  const categoryColors = {
    'AI Search': 'from-orange-500 to-rose-500',
    'SaaS': 'from-cyan-500 to-blue-600',
    'Learning Platform': 'from-emerald-500 to-teal-600',
    'Productivity': 'from-violet-500 to-fuchsia-600',
    'Document AI': 'from-amber-500 to-orange-600',
    'AI Platform': 'from-sky-500 to-indigo-600',
    'Interactive Web': 'from-neutral-700 to-orange-500'
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      
      {/* Hero Section */}
      <section className="relative px-5 pt-24 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(118,89,233,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(118,89,233,0.08)_0%,transparent_70%)]" />
        
        <div className="relative mx-auto max-w-[1200px] text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/5 dark:bg-purple-500/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-purple-500 dark:text-purple-400">
              My Work
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-tight text-slate-800 dark:text-white mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Signature Builds with 
            <span className="text-gradient">Product-Grade Detail</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-gray-300 leading-relaxed"
          >
            A curated collection of full-stack, AI, SaaS, and interactive web builds. 
            Every project represents real-world solutions with attention to detail, 
            performance, and user experience.
          </motion.p>
        </div>
      </section>

      
      {/* Category Filter */}
      <section className="px-5 py-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            <motion.button
              onClick={() => setHoveredCategory(null)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                hoveredCategory === null
                  ? 'bg-purple-500/20 text-white border border-purple-500/40'
                  : 'text-gray-300 hover:bg-purple-500/10 hover:text-white border border-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              All Projects
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setHoveredCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  hoveredCategory === category
                    ? 'bg-purple-500/20 text-white border border-purple-500/40'
                    : 'text-gray-300 hover:bg-purple-500/10 hover:text-white border border-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      
      {/* Projects Grid */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.map((project, index) => {
              const tone = categoryColors[project.category] || 'from-purple-500 to-cyan-500';
              
              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl transition-colors hover:border-purple-500/30"
                >
                  <button 
                    className="w-full bg-transparent p-0 text-left text-inherit"
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Project Card Header */}
                    <div className={`relative min-h-48 overflow-hidden p-6 bg-gradient-to-br ${tone}`}>
                      {/* Decorative dots */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <span className="size-2.5 rounded-full bg-white/30" />
                        <span className="size-2.5 rounded-full bg-white/50" />
                        <span className="size-2.5 rounded-full bg-white/70" />
                      </div>

                      {/* Category Badge */}
                      <div className="absolute bottom-6 left-6">
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
                          {project.category}
                        </span>
                      </div>

                      {/* Project Icon/Preview */}
                      <div className="absolute bottom-6 right-6">
                        <div className="grid size-12 place-items-center rounded-lg border border-white/30 bg-white/10 text-white">
                          <HiCodeBracket className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Floating Feature Tags */}
                      <div className="absolute inset-x-6 bottom-16 grid gap-2 overflow-hidden">
                        {project.features.slice(0, 2).map((feature, featureIndex) => (
                          <motion.span
                            key={feature}
                            className="inline-flex items-center gap-1 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                        {project.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.stack.slice(0, 4).map((tech) => (
                          <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3 text-sm font-medium text-purple-400">
                        <motion.span 
                          className="inline-flex items-center gap-1 hover:text-purple-300 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          View Details
                          <HiArrowRight className="w-4 h-4" />
                        </motion.span>
                      </div>
                    </div>
                  </button>

                  {/* External Links */}
                  <div className="absolute right-4 top-4 flex gap-2">
                    <motion.a
                      className="grid size-9 place-items-center rounded-lg border border-white/20 bg-white/10 text-white backdrop-blur-xl hover:bg-purple-500/20 hover:border-purple-500/40 transition-colors"
                      href="https://github.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <HiCodeBracket className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      className="grid size-9 place-items-center rounded-lg border border-white/20 bg-white/10 text-white backdrop-blur-xl hover:bg-purple-500/20 hover:border-purple-500/40 transition-colors"
                      href="/contact"
                      aria-label={`${project.title} live demo`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <HiArrowTopRightOnSquare className="w-4 h-4" />
                    </motion.a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      
      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-2xl mx-4 my-8 rounded-xl border border-white/10 bg-white/10 backdrop-blur-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 grid size-10 place-items-center rounded-lg border border-white/20 bg-white/10 text-white hover:bg-purple-500/20 hover:border-purple-500/40 transition-colors z-10"
                aria-label="Close project details"
              >
                <HiXMark className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className={`relative min-h-48 overflow-hidden p-6 bg-gradient-to-br ${categoryColors[selectedProject.category] || 'from-purple-500 to-cyan-500'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white mb-4 block">
                      {selectedProject.category}
                    </span>
                    <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      {selectedProject.title}
                    </h2>
                  </div>
                  <div className="grid size-12 place-items-center rounded-lg border border-white/30 bg-white/10 text-white">
                    <HiCodeBracket className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <p className="text-gray-300 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Key Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.features.map((feature) => (
                      <span key={feature} className="inline-flex items-center gap-1 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-sm font-medium text-purple-400">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <motion.a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex-1 justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HiCodeBracket />
                    View Code
                  </motion.a>
                  <motion.a
                    href="/contact"
                    className="btn-primary flex-1 justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HiArrowTopRightOnSquare />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
      {/* Call to Action */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-[1200px] text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Interested in Working Together?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed mb-8">
              I'm always open to new opportunities and collaborations. Whether you have a project idea, 
              need technical expertise, or just want to connect, feel free to reach out.
            </p>
            <motion.a
              href="/contact"
              className="btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
              <HiArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

    </main>
  );
}