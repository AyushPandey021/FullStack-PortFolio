import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowDownTray, HiDocumentText, HiEye, HiXMark, HiArrowTopRightOnSquare  } from 'react-icons/hi2';
import ResumePDF from '../Assets/Ayush_Resume.pdf';
import SectionHeader from '../components/SectionHeader.jsx';

export default function ResumePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
      <section className="relative px-4 sm:px-5 pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(118,89,233,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(118,89,233,0.08)_0%,transparent_70%)]" />
        
        <div className="relative mx-auto max-w-[1200px] text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/5 dark:bg-purple-500/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-medium uppercase tracking-wider text-purple-500 dark:text-purple-400">
              <HiDocumentText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Professional Resume
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="text-[clamp(2rem,5vw,4rem)] sm:text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-tight text-slate-800 dark:text-white mb-4 sm:mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            My Professional <span className="text-gradient">Resume</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-gray-300 leading-relaxed px-2"
          >
            View and download my comprehensive resume showcasing my skills, experience, 
            and projects in Full Stack Development, AI Engineering, and Product Building.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-10"
          >
            <motion.button
              onClick={toggleModal}
              className="btn-primary inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base"
              whileHover={{ scale: 1.02, x: 3 }}
              whileTap={{ scale: 0.98 }}
            >
              <HiEye className="w-4 h-4 sm:w-5 sm:h-5" />
              View Resume
            </motion.button>
            
            <motion.button
              onClick={handleDownload}
              className="btn-secondary inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base"
              whileHover={{ scale: 1.02, x: 3 }}
              whileTap={{ scale: 0.98 }}
            >
              <HiArrowDownTray className="w-4 h-4 sm:w-5 sm:h-5" />
              Download PDF
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Resume Preview Section */}
      <section className="px-4 sm:px-5 py-12 sm:py-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="glass-card rounded-xl border border-white/10 p-6 sm:p-8 lg:p-12"
          >
            <SectionHeader 
              eyebrow="Quick Preview"
              title="Resume Highlights"
              copy="A summary of my professional journey, skills, and achievements."
              align="left"
            />

            {/* Resume Preview Grid - Responsive */}
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12">
              {/* Experience Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                className="space-y-4 sm:space-y-6"
              >
                <h3 className="text-base sm:text-lg font-bold text-purple-500 dark:text-purple-400" style={{ fontFamily: 'var(--font-display)' }}>
                  Professional Experience
                </h3>
                <div className="space-y-4 sm:space-y-5">
                  <div className="border-l-2 border-purple-500/30 pl-4 sm:pl-6">
                    <h4 className="font-semibold text-white dark:text-white text-sm sm:text-base">
                      Full Stack Developer
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 mt-1">
                      Product Engineering Lab
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      2024 - Present
                    </p>
                  </div>
                  <div className="border-l-2 border-purple-500/30 pl-4 sm:pl-6">
                    <h4 className="font-semibold text-white dark:text-white text-sm sm:text-base">
                      Frontend & AI Developer
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 mt-1">
                      Independent Client Studio
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      2023 - 2024
                    </p>
                  </div>
                  <div className="border-l-2 border-purple-500/30 pl-4 sm:pl-6">
                    <h4 className="font-semibold text-white dark:text-white text-sm sm:text-base">
                      Software Engineer
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-400 mt-1">
                      Open Source & Research
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      2022 - 2023
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Skills Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="space-y-4 sm:space-y-6"
              >
                <h3 className="text-base sm:text-lg font-bold text-purple-500 dark:text-purple-400" style={{ fontFamily: 'var(--font-display)' }}>
                  Core Competencies
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {['React', 'Node.js', 'Python', 'FastAPI', 'MongoDB', 'AWS', 'Docker', 'Tailwind CSS', 'Framer Motion', 'LangChain', 'OpenAI', 'RAG'].map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-purple-500/20 bg-purple-500/5 dark:bg-purple-500/10 text-purple-400 text-xs sm:text-sm font-medium"
                      whileHover={{ scale: 1.05, y: -1 }}
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
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                className="space-y-4 sm:space-y-6"
              >
                <h3 className="text-base sm:text-lg font-bold text-purple-500 dark:text-purple-400" style={{ fontFamily: 'var(--font-display)' }}>
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <motion.div
                    className="glass-card rounded-lg p-3 sm:p-4 text-center"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <p className="text-xl sm:text-2xl font-bold text-white dark:text-white">34+</p>
                    <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-400 mt-1">Projects Completed</p>
                  </motion.div>
                  <motion.div
                    className="glass-card rounded-lg p-3 sm:p-4 text-center"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <p className="text-xl sm:text-2xl font-bold text-white dark:text-white">9+</p>
                    <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-400 mt-1">AI Applications</p>
                  </motion.div>
                  <motion.div
                    className="glass-card rounded-lg p-3 sm:p-4 text-center"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <p className="text-xl sm:text-2xl font-bold text-white dark:text-white">42+</p>
                    <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-400 mt-1">GitHub Repos</p>
                  </motion.div>
                  <motion.div
                    className="glass-card rounded-lg p-3 sm:p-4 text-center"
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <p className="text-xl sm:text-2xl font-bold text-white dark:text-white">3+</p>
                    <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-400 mt-1">Years Experience</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Additional Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10"
            >
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {['MERN Stack', 'AI/ML Integration', 'REST APIs', 'Database Design', 'Cloud Deployment'].map((item) => (
                      <span key={item} className="px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 dark:bg-purple-500/10 text-purple-400 text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Languages & Frameworks</h4>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL'].map((item) => (
                      <span key={item} className="px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 dark:bg-cyan-500/10 text-cyan-400 text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Resume Modal - Fully Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleModal}
          >
            <motion.div
              className="w-full max-w-4xl h-[90vh] sm:h-[85vh] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden bg-[var(--bg-secondary)]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10 bg-[var(--bg-secondary)]">
                <motion.div 
                  className="flex items-center gap-2 sm:gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <HiDocumentText className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  <div>
                    <h3 className="font-bold text-white dark:text-white text-sm sm:text-base">
                      Ayush Pandey - Resume
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-400">
                      Full Stack Developer & AI Engineer
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-2 sm:gap-3"
                >
                  <motion.a
                    href={ResumePDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HiArrowTopRightOnSquare  className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Open in New Tab
                  </motion.a>
                  <motion.button
                    onClick={handleDownload}
                    className="btn-secondary inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <HiArrowDownTray className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Download
                  </motion.button>
                  <motion.button
                    onClick={toggleModal}
                    className="p-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HiXMark className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </motion.div>
              </div>

              {/* PDF Viewer - Mobile Optimized */}
              <div className="h-[calc(100%-65px)] sm:h-[calc(100%-73px)] overflow-auto bg-white dark:bg-[#1a1f3a]">
                {isLoading ? (
                  <motion.div
                    className="grid place-items-center h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="size-10 sm:size-12 rounded-full border-4 border-purple-500 border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">Loading Resume...</p>
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

              {/* Mobile Notice */}
              {isMobile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[var(--bg-secondary)]/90 backdrop-blur-lg rounded-lg px-4 py-2"
                >
                  <p className="text-xs text-gray-400 text-center">
                    Pinch to zoom on the PDF
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
