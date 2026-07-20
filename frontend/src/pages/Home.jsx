import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  HiArrowDown,
  HiArrowRight,
  HiArrowDownTray,
  HiCheckCircle,
  HiCircleStack,
  HiCloudArrowUp,
  HiCodeBracketSquare,
  HiCpuChip,
  HiPlay,
} from "react-icons/hi2";
import {
  profileStats,
  titles,
  achievements,
  socials,
} from "../data/portfolio.js";
import SectionHeader from "../components/SectionHeader.jsx";
import CountUp from "react-countup";

// Shared scroll-reveal variants — used by any grid of cards that should
// stagger in together instead of animating on a hard-coded index delay.
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 36, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const buildLayers = [
  {
    label: "Interface",
    title: "Responsive product UI",
    detail: "React · Motion · Accessibility",
    Icon: HiCodeBracketSquare,
    color: "text-violet-500",
  },
  {
    label: "Intelligence",
    title: "Context-aware AI layer",
    detail: "FastAPI · RAG · Model routing",
    Icon: HiCpuChip,
    color: "text-cyan-500",
  },
  {
    label: "Infrastructure",
    title: "Production-ready delivery",
    detail: "Node · Databases · Cloud",
    Icon: HiCloudArrowUp,
    color: "text-emerald-500",
  },
];

function BuildConsole() {
  const [activeLayer, setActiveLayer] = useState(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(tiltY, { stiffness: 180, damping: 22 });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(y * -7);
    tiltY.set(x * 7);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const active = buildLayers[activeLayer];
  const ActiveIcon = active.Icon;

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[520px] [transform-style:preserve-3d]"
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-8 rounded-full bg-violet-500/15 blur-3xl dark:bg-violet-500/20"
        animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.45, 0.8, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/85 p-3 shadow-[0_40px_100px_rgba(61,46,137,0.18)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#11152f]/85 dark:shadow-[0_40px_100px_rgba(0,0,0,0.38)]">
        <div className="flex items-center justify-between border-b border-slate-200/80 px-3 pb-3 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#ff6b6b]" />
            <span className="size-2.5 rounded-full bg-[#ffd166]" />
            <span className="size-2.5 rounded-full bg-[#50d890]" />
          </div>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
            <span className="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-emerald-500" />
            system online
          </span>
        </div>

        <div className="grid gap-3 pt-3 sm:grid-cols-[1fr_0.94fr]">
          <div className="rounded-2xl border border-slate-200/70 bg-slate-950 p-4 text-left shadow-inner dark:border-white/5">
            <div className="mb-5 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
              <span>build.tsx</span>
              <span className="flex items-center gap-1 text-cyan-400"><HiPlay /> running</span>
            </div>
            <div className="space-y-2 font-mono text-[11px] leading-5 sm:text-xs">
              <p><span className="text-violet-400">const</span> <span className="text-cyan-300">developer</span> <span className="text-slate-500">=</span> <span className="text-amber-300">&quot;Ayush&quot;</span>;</p>
              <p><span className="text-violet-400">await</span> <span className="text-cyan-300">craft</span><span className="text-slate-300">&#40;&#123;</span></p>
              <p className="pl-4"><span className="text-slate-400">idea:</span> <span className="text-amber-300">&quot;ambitious&quot;</span>,</p>
              <p className="pl-4"><span className="text-slate-400">quality:</span> <span className="text-emerald-300">&quot;production&quot;</span>,</p>
              <p className="pl-4"><span className="text-slate-400">experience:</span> <span className="text-rose-300">&quot;memorable&quot;</span></p>
              <p className="text-slate-300">&#125;&#41;;</p>
            </div>
            <motion.div
              className="mt-5 h-px origin-left bg-gradient-to-r from-violet-500 via-cyan-400 to-transparent"
              animate={{ scaleX: [0.15, 1, 0.15] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="mt-3 flex items-center gap-2 text-[10px] text-emerald-400">
              <HiCheckCircle className="size-4" /> Build complete · 1.2s
            </div>
          </div>

          <div className="flex min-h-[222px] flex-col rounded-2xl border border-slate-200/70 bg-slate-50/80 p-3 dark:border-white/5 dark:bg-white/[0.035]">
            <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Explore my stack</p>
            <div className="space-y-1.5">
              {buildLayers.map((layer, index) => {
                const Icon = layer.Icon;
                const selected = activeLayer === index;
                return (
                  <button
                    key={layer.label}
                    type="button"
                    onClick={() => setActiveLayer(index)}
                    className={`group flex w-full items-center gap-2.5 rounded-xl border p-2.5 text-left transition-colors ${selected ? "border-violet-400/50 bg-white shadow-sm dark:bg-white/10" : "border-transparent hover:border-slate-200 hover:bg-white/70 dark:hover:border-white/10 dark:hover:bg-white/5"}`}
                  >
                    <span className={`grid size-8 shrink-0 place-items-center rounded-lg bg-slate-900/5 dark:bg-white/5 ${layer.color}`}><Icon className="size-4" /></span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-slate-800 dark:text-white">{layer.label}</span>
                      <span className="block truncate text-[9px] text-slate-500 dark:text-slate-400">{layer.detail}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="mt-3 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-3.5 text-white"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/15"><ActiveIcon className="size-5" /></span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.17em] text-white/65">Selected capability</p>
              <p className="mt-0.5 text-sm font-semibold">{active.title}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute -right-3 -top-5 hidden items-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow-xl backdrop-blur-xl sm:flex dark:border-white/10 dark:bg-[#171a36]/90 dark:text-white"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <HiCircleStack className="text-cyan-500" /> API connected
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [titleIndex, setTitleIndex] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTitleIndex((index) => (index + 1) % titles.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, []);

  // Parallax is scoped to the hero's background layer only (via
  // useScroll + useTransform), never to the section itself — moving the
  // whole section with a manual scroll listener was what pushed the
  // stats bar / CTAs out of alignment with the sections below it.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-28 sm:px-5 lg:pt-32"
      >
        <motion.div className="pointer-events-none absolute inset-0" style={{ y: bgY }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(124,92,255,0.16),transparent_32%),radial-gradient(circle_at_82%_50%,rgba(25,211,218,0.11),transparent_34%)] dark:bg-[radial-gradient(circle_at_18%_30%,rgba(124,92,255,0.22),transparent_32%),radial-gradient(circle_at_82%_50%,rgba(25,211,218,0.13),transparent_34%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(108,92,231,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(108,92,231,0.055)_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />
          <motion.div
            className="absolute left-[8%] top-[23%] size-2 rounded-full bg-violet-500 shadow-[0_0_28px_8px_rgba(124,92,255,0.35)]"
            animate={{ y: [0, -18, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute right-[13%] top-[18%] size-1.5 rounded-full bg-cyan-400 shadow-[0_0_24px_7px_rgba(34,211,238,0.28)]"
            animate={{ y: [0, 16, 0], opacity: [1, 0.45, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </motion.div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1240px] items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-white/65 px-3.5 py-2 shadow-sm backdrop-blur-xl dark:bg-violet-500/10"
            >
              <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" /><span className="relative inline-flex size-2 rounded-full bg-emerald-500" /></span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300">Available for selected projects</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-violet-600 dark:text-violet-300"
            >
              Full-stack & AI product engineer
            </motion.p>

            <motion.h1
            
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-[clamp(2.75rem,8vw,5rem)] font-bold leading-[1.1] tracking-tight mb-5 text-slate-800 dark:text-white"
              style={{ fontFamily: "var(--font-display)" }}
              // transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              // className="text-[clamp(3.2rem,7.5vw,6.5rem)] font-black leading-[0.92] tracking-[-0.055em] text-slate-900 dark:text-white"
              // style={{ fontFamily: "var(--font-display)" }}
            >
              Ayush Pandey
              {/* Ayush<br /><span className="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">Pandey.</span> */}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="mt-6 flex min-h-7 items-center gap-2 font-mono text-base font-medium text-slate-600 dark:text-slate-300 sm:text-lg"
              aria-live="polite"
            >
              <span className="text-violet-500">{"//"}</span>
              <AnimatePresence mode="wait">
                <motion.span key={titles[titleIndex]} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.3 }}>
                  {titles[titleIndex]}
                </motion.span>
              </AnimatePresence>
              <span className="caret text-cyan-500" aria-hidden>_</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8"
            >
              I turn ambitious ideas into fast, thoughtful digital products—pairing expressive interfaces with reliable APIs and practical AI systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.38 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <motion.a href="/projects" className="btn-primary group rounded-xl px-6 py-3.5" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                Explore my work <HiArrowRight className="transition-transform group-hover:translate-x-1" />
              </motion.a>
              <motion.a href="/resume" className="btn-secondary rounded-xl px-5 py-3.5" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                <HiArrowDownTray /> View résumé
              </motion.a>
              <motion.a href="/contact" className="btn-secondary rounded-xl px-5 py-3.5" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                Start a conversation
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400"
            >
              <span className="flex items-center gap-2"><HiCheckCircle className="text-emerald-500" /> Product-minded</span>
              <span className="flex items-center gap-2"><HiCheckCircle className="text-emerald-500" /> Performance-focused</span>
              <span className="flex items-center gap-2"><HiCheckCircle className="text-emerald-500" /> Built to scale</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 35, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <BuildConsole />
          </motion.div>
        </div>

        <motion.a
          href="#highlights"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 hover:text-violet-500 md:inline-flex"
          whileHover={{ y: -3 }}
        >
          Scroll to explore
          <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}><HiArrowDown /></motion.span>
        </motion.a>
      </section>
      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="relative mx-auto mt-16 grid w-full max-w-[1200px] grid-cols-2 gap-6 border-t border-slate-200/10 dark:border-white/10 pt-8 sm:grid-cols-4 sm:gap-4"
      >
        {profileStats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center justify-center px-3 py-2 text-center"
          >
            <strong
              className="mb-3 block text-3xl font-black text-slate-800 dark:text-white sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <CountUp
                end={stat.value}
                enableScrollSpy
                scrollSpyOnce
                duration={2.4}
              />
              {stat.suffix}
            </strong>

            <div className="flex flex-col items-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-gray-400">
              {stat.label.split(" ").map((word) => (
                <span key={word} className="leading-5">
                  {word}
                </span>
              ))}
            </div>

            <motion.div
              className="mt-4 h-[2px] w-14 rounded-full bg-gradient-to-r from-purple-500 via-cyan-500 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Highlights Section */}
      <section id="highlights" className="px-5 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeader
            eyebrow="Highlights"
            title="What Makes My Work Stand Out"
            copy="Clean code architecture, polished user experiences, scalable backend systems, and AI integrations that actually work in production."
            align="center"
          />

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                icon: "⚡",
                title: "Performance First",
                desc: "Optimized code and lazy loading ensure lightning-fast experiences",
              },
              {
                icon: "🎨",
                title: "Pixel Perfect",
                desc: "Attention to detail in every component and interaction",
              },
              {
                icon: "🔧",
                title: "Scalable Architecture",
                desc: "Modular codebase designed for growth and maintainability",
              },
              {
                icon: "🤖",
                title: "AI Integration",
                desc: "Production-ready AI systems with proper error handling",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                whileHover={{ y: -5, scale: 1.01 }}
                className="glass-card rounded-xl border border-slate-200/10 dark:border-white/10 p-6 transition-colors hover:border-purple-500/30"
              >
                <motion.div
                  className="text-3xl mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="px-5 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeader
            eyebrow="Achievements"
            title="Numbers That Show Consistent Shipping"
            copy="A concise snapshot of delivered work, practice, certifications, and AI builds."
            align="center"
          />

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {achievements.map(([label, value, suffix]) => (
              <motion.div
                key={label}
                variants={staggerItem}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card rounded-xl border border-slate-200/10 dark:border-white/10 p-6 md:p-8 text-center transition-colors hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(118,89,233,0.15)]"
              >
                <motion.strong
                  className="block text-4xl md:text-5xl font-black text-gradient mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
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
                <span className="font-bold text-slate-600 dark:text-gray-400">{label}</span>
                <motion.div
                  className="mt-4 h-1 w-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="px-5 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">
                Building the Next Generation of{" "}
                <span className="text-gradient">Digital Experiences</span>
              </h2>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
                I specialize in creating full-stack applications that combine
                beautiful, responsive interfaces with robust backend systems.
                From concept to deployment, I ensure every project meets the
                highest standards of quality and performance.
              </p>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                With expertise in both frontend and backend development, I
                bridge the gap between design and functionality. My work focuses
                on delivering value through clean code, intuitive user
                experiences, and scalable architecture.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="relative"
            >
              <div className="glass-card rounded-xl border border-slate-200/10 dark:border-white/10 p-8">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
                  My Development Philosophy
                </h3>
                <motion.div
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                >
                  {[
                    {
                      color: "bg-purple-500",
                      text: "Code should be readable, maintainable, and efficient",
                    },
                    {
                      color: "bg-cyan-500",
                      text: "User experience should be intuitive and delightful",
                    },
                    {
                      color: "bg-orange-500",
                      text: "Systems should be scalable, secure, and reliable",
                    },
                    {
                      color: "bg-emerald-500",
                      text: "Continuous learning and improvement is essential",
                    },
                  ].map((principle) => (
                    <motion.div
                      key={principle.text}
                      variants={staggerItem}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-3"
                    >
                      <motion.div
                        className={`w-2 h-2 rounded-full ${principle.color} mt-2 flex-shrink-0`}
                        whileHover={{ scale: 1.2 }}
                      />
                      <p className="text-slate-600 dark:text-gray-300">{principle.text}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="px-5 py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">
              Let&apos;s Connect
            </h3>
            <div className="flex justify-center gap-3 md:gap-4">
              {socials.map(([name, Icon, href]) => (
                <motion.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-11 md:size-12 place-items-center rounded-xl border border-slate-200/10 dark:border-white/10 bg-white/80 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:bg-purple-500/10 hover:text-purple-500 dark:hover:text-purple-400 hover:border-purple-500/30 transition-colors"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-slate-600 dark:text-gray-400" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
