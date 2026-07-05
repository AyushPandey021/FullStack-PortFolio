import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../Assets/logo.png";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => setLoading(false), 2500);

    const progressInterval = window.setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 8 + 2;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);

    return () => {
      window.clearTimeout(loadTimer);
      window.clearInterval(progressInterval);
    };
  }, []);

  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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

  const dotAnimation = {
    initial: { scale: 0.5, opacity: 0.3 },
    animate: {
      scale: [0.5, 1.2, 0.5],
      opacity: [0.3, 0.8, 0.3],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const orbitRadius = 48;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center bg-[var(--bg-primary)]"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          <motion.div
            className="relative flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Logo Animation */}
            <motion.div
              className="relative grid place-items-center"
              style={{ width: 120, height: 120 }}
              variants={logoVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Outer Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-500/20"
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
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
                    className="absolute size-3 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500"
                    style={{
                      left: "50%",
                      top: "50%",
                      marginLeft: x - 6,
                      marginTop: y - 6,
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

              {/* Logo Image */}
              <motion.div
                className="relative z-10 grid size-20 place-items-center overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 dark:shadow-[0_0_40px_rgba(108,89,231,0.3)] shadow-[0_0_40px_rgba(108,89,231,0.2)]"
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              >
                <img
                  src={Logo}
                  alt="Loading..."
                  className="h-full w-full object-contain p-3 dark:invert"
                />
              </motion.div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center gap-2"
            >
              <span
                className="text-xl font-bold text-slate-800 dark:text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Loading Portfolio
              </span>

              <motion.div
                className="flex gap-1"
                variants={dotAnimation}
                initial="initial"
                animate="animate"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="size-2 rounded-full bg-purple-500"
                    animate={{
                      scale: [0.5, 1.2, 0.5],
                      opacity: [0.4, 0.9, 0.4],
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="relative mt-2 h-[4px] w-[200px] overflow-hidden rounded-full bg-purple-500/10 dark:bg-white/10"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>

            {/* Percentage */}
            <motion.div
              className="text-lg font-bold text-purple-500"
              style={{ fontFamily: "var(--font-display)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {Math.round(progress)}%
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
