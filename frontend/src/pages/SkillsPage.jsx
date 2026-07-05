import { useState } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "../data/portfolio.js";
import SectionHeader from "../components/SectionHeader.jsx";
import CountUp from "react-countup";

function SkillFlipCard({ name, level, Icon, hoveredSkill, setHoveredSkill }) {
  const isHovered = hoveredSkill === name;
  const proficiency =
    level >= 90
      ? "Expert"
      : level >= 80
        ? "Advanced"
        : level >= 70
          ? "Intermediate"
          : "Proficient";

  return (
    <div
      className="[perspective:1200px]"
      onMouseEnter={() => setHoveredSkill(name)}
      onMouseLeave={() => setHoveredSkill(null)}
    >
      <motion.div
        className="relative h-36 w-full [transform-style:preserve-3d]"
        animate={{ rotateY: isHovered ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 [backface-visibility:hidden]">
          <div className="grid size-11 place-items-center rounded-lg border border-dashed border-purple-500/40 bg-white/10 text-purple-400 [&_svg]:size-5">
            <Icon />
          </div>
          <span className="text-center text-sm font-medium text-white">
            {name}
          </span>
          <span
            className="text-xs font-bold text-purple-400"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <CountUp end={level} enableScrollSpy scrollSpyOnce duration={1.6} />
            %
          </span>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl border border-purple-500/30 bg-purple-500/10 p-4 [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <span
            className="text-xs uppercase tracking-[0.14em] text-purple-300"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {proficiency}
          </span>
          <div className="h-1.5 w-3/4 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? level / 100 : 0 }}
              style={{ originX: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <span className="text-center text-xs text-gray-300">
            {level}% proficiency
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const allCategories = ["All", ...skillGroups.map((g) => g.title)];
  const allSkills = skillGroups.flatMap((group) => group.skills);
  const orbitSkills = allSkills.slice(0, 8);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Hero Section */}
      <section className="relative px-5 pt-24 pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(118,89,233,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(118,89,233,0.08)_0%,transparent_70%)]" />

        <div className="relative mx-auto max-w-[1200px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-purple-500 dark:bg-purple-500/10 dark:text-purple-400">
              Technical Skills
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="mb-6 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-tight text-slate-800 dark:text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A Practical Stack for Modern{" "}
            <span className="text-gradient">Product Teams</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-gray-300"
          >
            Frontend polish, backend reliability, database confidence, cloud
            delivery, and AI application design in one focused toolkit.
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
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-card rounded-xl border border-white/10 p-8 lg:p-12"
          >
            <div className="grid items-center gap-12 lg:grid-cols-2">
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

                {/* Orbit Ring — handles rotation/position only */}
                <motion.div
                  className="absolute aspect-square w-[min(300px,78vw)] rounded-full border border-dashed border-purple-500/30"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 26,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {orbitSkills.map(([name, _level, Icon], index) => (
                    <div
                      key={name}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `rotate(${index * 45}deg) translateX(150px)`,
                      }}
                    >
                      {/* Counter-rotates at the same rate so the icon stays upright,
                          bounce handled as a separate transition so it doesn't fight the rotation */}
                      <motion.div
                        className="grid size-12 place-items-center rounded-lg border border-dashed border-purple-500/40 bg-white/10 text-purple-400 shadow-lg [&_svg]:size-5"
                        animate={{ rotate: -360, y: [-8, 8, -8] }}
                        transition={{
                          rotate: {
                            duration: 26,
                            ease: "linear",
                            repeat: Infinity,
                          },
                          y: {
                            duration: 2.4,
                            ease: "easeInOut",
                            repeat: Infinity,
                            delay: index * 0.12,
                          },
                        }}
                      >
                        <Icon />
                      </motion.div>
                    </div>
                  ))}
                </motion.div>

                {/* Center Core */}
                <motion.div
                  className="grid size-20 place-items-center rounded-full border border-dashed border-purple-500/40 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <strong
                    className="text-lg font-bold uppercase tracking-[0.14em] text-white"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    Core
                  </strong>
                </motion.div>
              </div>

              <div>
                <span
                  className="text-xs uppercase tracking-[0.14em] text-purple-400"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Fig. 02 - Component Orbit
                </span>
                <h3
                  className="mt-2 text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-none text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Every tool, mapped and measured.
                </h3>
                <p className="mt-4 leading-7 text-gray-300">
                  The instruments rotate around a shared core, each one a
                  component in the same build. Hover a card below to flip it and
                  see proficiency.
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
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-2"
          >
            {allCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "border border-purple-500/40 bg-purple-500/20 text-white"
                    : "border border-white/10 text-gray-300 hover:bg-purple-500/10 hover:text-white"
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

      {/* Skills Grid — now with 3D flip cards */}
      <section className="px-5 py-16">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {skillGroups.map((group, groupIndex) => {
              const Icon = group.icon;
              const isActive =
                activeCategory === group.title || activeCategory === "All";

              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                  whileHover={{ scale: 1.01, y: -5 }}
                  className={`rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 ${
                    isActive
                      ? "border-purple-500/40 bg-white/10"
                      : "hover:border-purple-500/20"
                  }`}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="grid size-12 place-items-center rounded-lg border border-dashed border-purple-500/40 bg-white/10 text-purple-400 [&_svg]:size-6"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                      >
                        <Icon />
                      </motion.div>
                      <h3
                        className="text-xl font-bold text-white"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {group.title}
                      </h3>
                    </div>
                    <span
                      className="text-xs uppercase tracking-[0.14em] text-gray-400"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      mod.{String(groupIndex + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {(activeCategory === "All" ||
                    activeCategory === group.title) && (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {group.skills.map(([name, level, SkillIcon]) => (
                        <SkillFlipCard
                          key={name}
                          name={name}
                          level={level}
                          Icon={SkillIcon}
                          hoveredSkill={hoveredSkill}
                          setHoveredSkill={setHoveredSkill}
                        />
                      ))}
                    </div>
                  )}
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
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="mb-8 text-2xl font-bold text-white">
              Skill Proficiency Levels
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { level: 90, label: "Expert", color: "bg-purple-500" },
                { level: 80, label: "Advanced", color: "bg-cyan-500" },
                { level: 70, label: "Intermediate", color: "bg-orange-500" },
                { level: 60, label: "Proficient", color: "bg-emerald-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-bold text-gray-400"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {item.level}%+
                    </span>
                    <div className={`h-1.5 w-20 rounded-full ${item.color}`} />
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
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SectionHeader
              eyebrow="Technology Stack"
              title="Languages, Frameworks & Tools I Work With"
              copy="A comprehensive set of technologies that enable me to build modern, scalable applications from frontend to backend to deployment."
              align="center"
            />

            <div className="relative mt-12 flex flex-wrap justify-center gap-4">
              {allSkills.map(([name, level, Icon], index) => (
                <motion.div
                  key={name}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <div
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 transition-colors group-hover:border-purple-500/30 group-hover:bg-purple-500/10"
                    style={{
                      boxShadow:
                        hoveredSkill === name
                          ? "0 10px 30px rgba(118, 89, 233, 0.3)"
                          : "none",
                    }}
                  >
                    <Icon className="h-5 w-5 text-purple-400" />
                    <span className="text-white">{name}</span>
                    <span
                      className="text-xs text-gray-400"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {level}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
