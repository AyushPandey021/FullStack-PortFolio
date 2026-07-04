import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowDownTray, HiDocumentText, HiEye, HiXMark } from 'react-icons/hi2';
import ResumePDF from '../Assets/Ayush_Resume.pdf';
import SectionHeader from '../components/SectionHeader.jsx';

export default function ResumePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for PDF
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = ResumePDF;
    link.download = 'Ayush_Pandey_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
    }
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
              <HiDocumentText className="w-4 h-4" />
              Professional Resume
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-tight text-slate-800 dark:text-white mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            My Professional <span className="text-gradient">Resume</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-gray-300 leading-relaxed"
          >
            View and download my comprehensive resume showcasing my skills, experience, 
            and projects in Full Stack Development, AI Engineering, and Product Building.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <motion.button
              onClick={toggleModal}
              className="btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <HiEye className="w-5 h-5" />
              View Resume
            </motion.button>
            
            <motion.button
              onClick={handleDownload}
              className="btn-secondary inline-flex items-center gap-2"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <HiArrowDownTray className="w-5 h-5" />
              Download PDF
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Resume Preview Section */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="glass-card rounded-xl border border-white/10 p-8 lg:p-12"
          >
            <SectionHeader 
              eyebrow="Quick Preview"
              title="Resume Highlights"
              copy="A summary of my professional journey, skills, and achievements."
              align="left"
            />

            {/* Resume Preview Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mt-12">
              {/* Experience Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="space-y-6"
              >
                <h3 className="text-lg font-bold text-purple-500 dark:text-purple-400" style={{ fontFamily: 'var(--font-display)' }}>
                  Experience
                </h3>
                <div className="space-y-6">
                  <div className="border-l-2 border-purple-500/30 pl-6">
                    <h4 className="font-semibold text-white dark:text-white">Full Stack Developer</h4>
                    <p className="text-sm text-gray-300 dark:text-gray-400">Product Engineering Lab | 2024 - Present</p>
                  </div>
                  <div className="border-l-2 border-purple-500/30 pl-6">
                    <h4 className="font-semibold text-white dark:text-white">Frontend & AI Developer</h4>
                    <p className="text-sm text-gray-300 dark:text-gray-400">Independent Client Studio | 2023 - 2024</p>
                  </div>
                  <div className="border-l-2 border-purple-500/30 pl-6">
                    <h4 className="font-semibold text-white dark:text-white">Software Engineer</h4>
                    <p className="text-sm text-gray-300 dark:text-gray-400">Open Source & Research | 2022 - 2023</p>
                  </div>
                </div>
              </motion.div>

              {/* Skills Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                className="space-y-6"
              >
                <h3 className="text-lg font-bold text-purple-500 dark:text-purple-400" style={{ fontFamily: 'var(--font-display)' }}>
                  Core Competencies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['React', 'Node.js', 'Python', 'FastAPI', 'MongoDB', 'AWS', 'Docker', 'Tailwind CSS', 'Framer Motion', 'LangChain', 'OpenAI', 'RAG'].map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-4 py-2 rounded-lg border border-purple-500/20 bg-purple-500/5 dark:bg-purple-500/10 text-purple-400 text-sm font-medium"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Education & Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                className="space-y-6"
              >
                <h3 className="text-lg font-bold text-purple-500 dark:text-purple-400" style={{ fontFamily: 'var(--font-display)' }}>
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-white dark:text-white">34+</p>
                    <p className="text-sm text-gray-300 dark:text-gray-400">Projects Completed</p>
                  </div>
                  <div className="glass-card rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-white dark:text-white">9+</p>
                    <p className="text-sm text-gray-300 dark:text-gray-400">AI Applications</p>
                  </div>
                  <div className="glass-card rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-white dark:text-white">42+</p>
                    <p className="text-sm text-gray-300 dark:text-gray-400">GitHub Repos</p>
                  </div>
                  <div className="glass-card rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-white dark:text-white">3+</p>
                    <p className="text-sm text-gray-300 dark:text-gray-400">Years Experience</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resume Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleModal}
          >
            <motion.div
              className="absolute inset-4 md:inset-8 rounded-xl shadow-2xl overflow-hidden bg-[var(--bg-secondary)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[var(--bg-secondary)]">
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <HiDocumentText className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="font-bold text-white dark:text-white">Ayush Pandey - Resume</h3>
                    <p className="text-sm text-gray-300 dark:text-gray-400">Full Stack Developer & AI Engineer</p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-3"
                >
                  <motion.button
                    onClick={handleDownload}
                    className="btn-primary inline-flex items-center gap-2 px-4 py-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HiArrowDownTray className="w-4 h-4" />
                    Download
                  </motion.button>
                  <motion.button
                    onClick={toggleModal}
                    className="p-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HiXMark className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              </div>

              {/* PDF Viewer - Full Height */}
              <div className="h-[calc(90  vh-73px)] overflow-auto bg-white dark:bg-[#1a1f3a]">
                {isLoading ? (
                  <motion.div
                    className="grid place-items-center h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="size-12 rounded-full border-4 border-purple-500 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Resume...</p>
                  </motion.div>
                ) : (
                  <iframe
                    src={ResumePDF + '#toolbar=0&navpanes=0&view=FitH'}
                    className="w-full h-full"
                    title="Ayush Pandey Resume"
                    frameBorder="0"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
