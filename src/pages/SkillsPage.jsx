import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { skillGroups } from '../data/portfolio.js';
import SectionHeader from '../components/SectionHeader.jsx';
import CountUp from 'react-countup';

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Filter skills by category
  const getSkillsByCategory = (category) => {
    const group = skillGroups.find(g => g.title === category);
    return group ? group.skills : [];
  };

  const allCategories = ['All', ...skillGroups.map(g => g.title)];

  // Get all skills for orbit animation
  const allSkills = skillGroups.flatMap(group => group.skills);
  const orbitSkills = allSkills.slice(0, 8);

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
              Technical Skills
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-tight text-white mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            A Practical Stack for Modern 
            <span className="text-gradient">Product Teams</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed"
          >
            Frontend polish, backend reliability, database confidence, cloud delivery, 
            and AI application design in one focused toolkit.
          </motion.p>
        </div>
      </section>

      
      {/* Orbit Visualization */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="glass-card rounded-xl border border-white/10 p-8 lg:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative grid min-h-[320px] place-items-center [perspective:900px]">
                {/* Dial ticks */}
                <div className="absolute aspect-square w-[min(320px,80vw)] rounded-full">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute left-1/2 top-1/2 h-2 w-px origin-bottom bg-purple-500/20"
                      style={{
                        transform: `rotate(${i * 10}deg) translateY(-160px)`,
                      }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.02 }}
                    />
                  ))}
                </div>

                {/* Orbit Ring */}
                <motion.div
                  className="absolute aspect-square w-[min(300px,78vw)] rounded-full border border-dashed border-purple-500/30 [transform-style:preserve-3d]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
                >
                  {orbitSkills.map(([name, _level, Icon], index) => (
                    <motion.div
                      key={name}
                      className="absolute left-1/2 top-1/2 grid size-12 place-items-center rounded-lg border border-dashed border-purple-500/40 bg-white/10 text-purple-400 shadow-lg [&_svg]:size-5"
                      style={{
                        transform: `rotate(${index * 45}deg) translateX(150px) rotate(${-index * 45}deg)`,
                      }}
                      animate={{ y: [-8, 8, -8] }}
                      transition={{ duration: 2.4, ease: 'sine.inOut', repeat: Infinity, delay: index * 0.12 }}
                      whileHover={{ scale: 1.2, z: 10 }}
                    >
                      <Icon />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Center Core */}
                <motion.div 
                  className="grid size-20 place-items-center rounded-full border border-dashed border-purple-500/40 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 shadow-lg"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <strong
                    className="text-lg font-bold uppercase tracking-[0.14em] text-white"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Core
                  </strong>
                </motion.div>
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.14em] text-purple-400" style={{ fontFamily: 'var(--font-mono)' }}>
                  Fig. 02 - Component Orbit
                </span>
                <h3 className="mt-2 text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-none text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  Every tool, mapped and measured.
                </h3>
                <p className="mt-4 leading-7 text-gray-300">
                  The instruments rotate around a shared core, each one a component
                  in the same build. Hover a card below to explore the full skill set.
                </p>
              </div>
            </div>
          </motion.div>
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
            className="flex flex-wrap justify-center gap-2"
          >
            {allCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
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

      
      {/* Skills Grid */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {skillGroups.map((group, groupIndex) => {
              const Icon = group.icon;
              const isActive = activeCategory === group.title || activeCategory === 'All';
              
              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                  whileHover={{ scale: 1.01, y: -5 }}
                  className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 ${
                    isActive 
                      ? 'border-purple-500/40 bg-white/10'
                      : 'hover:border-purple-500/20'
                  }`}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="grid size-12 place-items-center rounded-lg border border-dashed border-purple-500/40 bg-white/10 text-purple-400 [&_svg]:size-6"
                        whileHover={{ scale: 1.1, rotate: [0, 360] }}
                        transition={{ duration: 0.7, ease: 'easeInOut' }}
                      >
                        <Icon />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                        {group.title}
                      </h3>
                    </div>
                    <span className="text-xs uppercase tracking-[0.14em] text-gray-400" style={{ fontFamily: 'var(--font-mono)' }}>
                      mod.{String(groupIndex + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="grid gap-4">
                    {(activeCategory === 'All' || activeCategory === group.title) && (
                      group.skills.map(([name, level, SkillIcon]) => (
                        <motion.div
                          key={name}
                          onMouseEnter={() => setHoveredSkill(name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className={`relative overflow-hidden rounded-lg p-4 transition-all duration-300 ${
                            hoveredSkill === name 
                              ? 'bg-purple-500/10 border border-purple-500/30' 
                              : 'bg-white/5 border border-white/5'
                          }`}
                          whileHover={{ scale: 1.01, x: 5 }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <motion.div
                                className="grid size-9 place-items-center rounded-lg border border-dashed border-purple-500/30 bg-white/10 text-purple-400 [&_svg]:size-4"
                                whileHover={{ scale: 1.1, rotate: 360 }}
                                transition={{ duration: 0.7, ease: 'easeInOut' }}
                              >
                                <SkillIcon />
                              </motion.div>
                              <span className="font-medium text-white">{name}</span>
                            </div>
                            <span className="text-sm font-bold text-purple-400" style={{ fontFamily: 'var(--font-mono)' }}>
                              <CountUp end={level} enableScrollSpy scrollSpyOnce duration={1.6} />%
                            </span>
                          </div>
                          
                          {/* Progress Bar */}
                          <motion.div 
                            className="h-1.5 overflow-hidden rounded-full bg-white/10"
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2 }}
                          >
                            <motion.i
                              className="block h-full origin-left rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                              style={{ width: `${level}%` }}
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, delay: 0.2 }}
                            />
                          </motion.div>
                          
                          {/* Hover Glow Effect */}
                          {hoveredSkill === name && (
                            <motion.div
                              className="absolute inset-0 rounded-lg border border-purple-500/20"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </motion.div>
                      ))
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      
      {/* Skill Level Legend */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1200px] text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Skill Proficiency Levels
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { level: 90, label: 'Expert', color: 'bg-purple-500' },
                { level: 80, label: 'Advanced', color: 'bg-cyan-500' },
                { level: 70, label: 'Intermediate', color: 'bg-orange-500' },
                { level: 60, label: 'Proficient', color: 'bg-emerald-500' }
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-400" style={{ fontFamily: 'var(--font-mono)' }}>
                      {item.level}%+
                    </span>
                    <div className={`w-20 h-1.5 rounded-full ${item.color}`} />
                  </div>
                  <span className="text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      
      {/* Interactive Skill Cloud */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <SectionHeader 
              eyebrow="Technology Stack"
              title="Languages, Frameworks & Tools I Work With"
              copy="A comprehensive set of technologies that enable me to build modern, scalable applications from frontend to backend to deployment."
              align="center"
            />

            <div className="mt-12 relative flex flex-wrap justify-center gap-4">
              {allSkills.map(([name, level, Icon], index) => (
                <motion.div
                  key={name}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <motion.div
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 transition-colors group-hover:border-purple-500/30 group-hover:bg-purple-500/10"
                    style={{
                      boxShadow: hoveredSkill === name ? '0 10px 30px rgba(118, 89, 233, 0.3)' : 'none'
                    }}
                  >
                    <Icon className="w-5 h-5 text-purple-400" />
                    <span className="text-white">{name}</span>
                    <span className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-mono)' }}>
                      {level}%
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}