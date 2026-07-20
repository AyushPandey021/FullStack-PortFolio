import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function LoaderMark() {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      className="size-[74px] drop-shadow-[0_14px_34px_rgba(108,92,231,0.45)]"
      initial={{ scale: 0.72, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.12, type: "spring", stiffness: 260, damping: 18 }}
      aria-label="Ayush Pandey"
      role="img"
    >
      <rect width="64" height="64" rx="18" fill="#11132B" />
      <rect x="1" y="1" width="62" height="62" rx="17" stroke="url(#loaderBorder)" strokeWidth="2" />
      <path d="M10 44 25.2 16h6.3l9.1 17.2h-7.1l-5.2-10.4L22.5 34h9.3l3.1 6H19.4l-2.1 4H10Z" fill="url(#loaderFill)" />
      <path d="M39 17h7.1C52.7 17 57 20.6 57 26.4c0 5.9-4.3 9.6-10.9 9.6h-2.4v8H37V30h8.5c3.1 0 4.9-1.2 4.9-3.6 0-2.3-1.8-3.5-4.9-3.5H39V17Z" fill="#F7F8FF" />
      <motion.circle
        cx="53"
        cy="12"
        r="3"
        fill="#42E8E0"
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 1.25, repeat: Infinity }}
      />
      <defs>
        <linearGradient id="loaderFill" x1="11" y1="16" x2="41" y2="47"><stop stopColor="#A99DFF" /><stop offset="1" stopColor="#6C5CE7" /></linearGradient>
        <linearGradient id="loaderBorder" x1="3" y1="2" x2="61" y2="62"><stop stopColor="#A99DFF" /><stop offset="0.55" stopColor="#6C5CE7" /><stop offset="1" stopColor="#42E8E0" /></linearGradient>
      </defs>
    </motion.svg>
  );
}

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      setProgress(100);
      window.setTimeout(() => setLoading(false), 220);
    }, 1850);

    const progressInterval = window.setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (prev < 58 ? 7 : prev < 86 ? 4 : 2);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 90);

    return () => {
      window.clearTimeout(loadTimer);
      window.clearInterval(progressInterval);
    };
  }, []);

  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: 1.035,
      filter: "blur(10px)",
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.6, rotate: -10 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
        duration: 0.8,
      },
    },
    exit: { opacity: 0, scale: 0.8, rotate: 10, transition: { duration: 0.4 } },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const orbitRadius = 54;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-[#f7f7fb] dark:bg-[#090b20]"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(108,92,231,0.16),transparent_32%),radial-gradient(circle_at_64%_38%,rgba(34,211,238,0.08),transparent_24%)]" />
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(108,92,231,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(108,92,231,0.055)_1px,transparent_1px)] bg-[size:48px_48px]"
            animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-7 rounded-full border border-violet-500/15 bg-white/60 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-violet-600 shadow-sm backdrop-blur-xl dark:bg-white/5 dark:text-violet-300"
            >
              Initializing portfolio
            </motion.div>

            {/* Logo Animation */}
            <motion.div
              className="relative grid place-items-center"
              style={{ width: 132, height: 132 }}
              variants={logoVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Outer Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-violet-500/20"
                animate={{ scale: [0.94, 1.06, 0.94], opacity: [0.35, 0.85, 0.35], rotate: [0, 180, 360] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Rotating Orbit Dots */}
              {[0, 1, 2, 3, 4].map((i) => {
                const angle = (i * 72 * Math.PI) / 180;
                const x = Math.cos(angle) * orbitRadius;
                const y = Math.sin(angle) * orbitRadius;
                return (
                  <motion.div
                    key={i}
                    className={`absolute rounded-full ${i === 0 ? "size-3 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.7)]" : "size-2 bg-violet-500"}`}
                    style={{
                      left: "50%",
                      top: "50%",
                      marginLeft: x - (i === 0 ? 6 : 4),
                      marginTop: y - (i === 0 ? 6 : 4),
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0.6, 1, 0.6],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.15,
                    }}
                  />
                );
              })}

              {/* AP monogram */}
              <motion.div
                className="relative z-10 grid size-24 place-items-center"
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              >
                <LoaderMark />
              </motion.div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-7 text-center"
            >
              <span
                className="block text-xl font-black tracking-tight text-slate-900 dark:text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ayush Pandey<span className="text-violet-500">.</span>
              </span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Full-stack · AI · Product</span>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="relative mt-8 h-1 w-[240px] overflow-hidden rounded-full bg-violet-500/10 dark:bg-white/10"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 240 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>

            {/* Percentage */}
            <motion.div
              className="mt-3 flex w-[240px] items-center justify-between text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span>{progress < 45 ? "Loading interface" : progress < 85 ? "Connecting systems" : "Ready to launch"}</span>
              <span className="font-mono text-violet-500">{Math.round(progress)}%</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
