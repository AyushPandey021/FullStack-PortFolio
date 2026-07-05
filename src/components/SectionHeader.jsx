import { motion } from 'framer-motion';

const SectionHeader = ({ eyebrow, title, copy, align = 'left' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`mb-12 ${align === 'center' ? 'text-center mx-auto' : ''}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-purple-400 mb-6">
          {eyebrow}
        </span>
      )}
      <h2
        className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white mb-6"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h2>
      {copy && (
        <p className="max-w-2xl text-lg text-gray-300 leading-relaxed mx-auto lg:mx-0">{copy}</p>
      )}
    </motion.div>
  );
};

export default SectionHeader;