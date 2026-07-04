import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";
import { navItems } from "../data/portfolio.js";
import {
  HiBars3,
  HiMoon,
  HiSun,
  HiXMark,
  HiHome,
  HiUser,
  HiCodeBracket,
  HiBriefcase,
  HiEnvelope,
  HiDocumentText,
} from "react-icons/hi2";
import Logo from "../Assets/logo.png";
// Add icons to navItems
const navItemsWithIcons = navItems.map((item) => {
  const iconMap = {
    Home: HiHome,
    About: HiUser,
    Skills: HiCodeBracket,
    Projects: HiBriefcase,
    Resume: HiDocumentText,
    Contact: HiEnvelope,
  };
  return {
    ...item,
    icon: iconMap[item.label] || HiCodeBracket,
  };
});

function MagneticIcon({ children, onClick, label }) {
  const [style, setStyle] = useState({});

  const move = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * 0.3;
    const y = (event.clientY - (rect.top + rect.height / 2)) * 0.3;
    setStyle({ transform: `translate(${x}px, ${y}px)` });
  };

  return (
    <button
      className="grid size-11 flex-shrink-0 place-items-center rounded-lg border border-dashed border-purple-500/30 bg-purple-500/10 text-purple-400 backdrop-blur-xl transition-transform duration-200 ease-out hover:bg-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20"
      style={style}
      onMouseMove={move}
      onMouseLeave={() => setStyle({ transform: "translate(0,0)" })}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </button>
  );
}

function NavItem({ item, isActive, onClick }) {
  const Icon = item.icon;

  return (
    <Link
      to={item.href}
      onClick={onClick}
      className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-2 text-sm font-medium transition-colors duration-200 xl:px-3 ${
        isActive
          ? "bg-purple-500/20 text-slate-800 dark:text-white border border-purple-500/40 dark:border-purple-500/40"
          : "text-slate-600 dark:text-gray-300 hover:bg-purple-500/10 hover:text-slate-800 dark:hover:text-white"
      }`}
    >
      <Icon
        className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-purple-400" : "text-slate-500 dark:text-gray-400"}`}
      />
      <span>{item.label}</span>
    </Link>
  );
}

function MobileNavItem({ item, onClick }) {
  const Icon = item.icon;

  return (
    <Link
      to={item.href}
      onClick={onClick}
      className="flex items-center gap-4 text-lg font-medium text-slate-900 dark:text-white cursor-pointer px-4 py-4 w-full rounded-2xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 hover:bg-purple-500/10 transition-colors"
      style={{ fontFamily: "var(--font-display)" }}
    >
      <Icon className="w-6 h-6 text-purple-400 flex-shrink-0" />
      <span>{item.label}</span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setActiveSection(location.pathname);
  }, [location]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-gradient-to-r from-purple-500 to-cyan-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Floating Navbar */}
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-4 z-[90] px-4"
      >
        <div
          className={`mx-auto flex w-full max-w-[1200px] items-center justify-between gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
            scrolled
              ? "min-h-[60px] border border-purple-500/20 bg-white/95 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:bg-[#0a0f2c]/95 dark:shadow-[0_10px_40px_rgba(10,15,44,0.4)]"
              : "min-h-[64px] border border-purple-500/10 bg-white/80 backdrop-blur-xl dark:bg-[#0a0f2c]/80"
          }`}
        >
          {/* ================= Logo ================= */}
          <Link
            to="/"
            className="flex flex-shrink-0 items-center gap-3"
            aria-label="Ayush Pandey home"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="grid size-10 flex-shrink-0 place-items-center overflow-hidden rounded-lg border border-dashed border-purple-500/40 bg-gradient-to-br from-purple-500 to-cyan-500"
            >
              <img
                src={Logo}
                alt="Ayush Pandey Logo"
                className="h-full w-full object-cover dark:invert"
              />
            </motion.div>

            <strong
              className="hidden whitespace-nowrap text-lg font-bold text-slate-800 dark:text-white sm:block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Ayush Pandey
            </strong>
          </Link>

          {/* ================= Desktop Navigation ================= */}
          <nav className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-1 rounded-xl border border-purple-500/15 bg-white/5 p-1 backdrop-blur-xl">
              {navItemsWithIcons.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  isActive={activeSection === item.href}
                  onClick={() => {}}
                />
              ))}
            </div>
          </nav>

          {/* ================= Right Actions ================= */}
          <div className="flex flex-shrink-0 items-center gap-2">
            {/* Theme */}
            <MagneticIcon onClick={toggleTheme} label="Toggle color theme">
              {theme === "dark" ? (
                <HiSun className="h-5 w-5" />
              ) : (
                <HiMoon className="h-5 w-5" />
              )}
            </MagneticIcon>

            {/* Mobile Menu */}
            <button
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-lg border border-purple-500/20 bg-white/5 text-slate-800 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/10 lg:hidden dark:text-white dark:bg-white/5"
              aria-label="Open menu"
            >
              <HiBars3 className="h-6 w-6 text-slate-800 dark:text-white" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-start justify-start overflow-y-auto bg-white/95 text-slate-900 shadow-2xl backdrop-blur-lg dark:bg-[#020916]/95  dark:text-white"
            initial={{ clipPath: "circle(0% at 92% 7%)" }}
            animate={{ clipPath: "circle(145% at 92% 7%)" }}
            exit={{ clipPath: "circle(0% at 92% 7%)" }}
            transition={{ duration: 0.65, ease: [0.83, 0, 0.17, 1] }}
          >
            <button
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-lg border border-dashed border-purple-500/30 bg-white/5 dark:bg-white/5 hover:bg-purple-500/10 transition-colors"
              onClick={close}
              aria-label="Close menu"
            >
              <HiXMark className="text-slate-800 dark:text-white text-xl" />
            </button>

            <motion.nav
              className="flex flex-col items-start gap-1 px-6 pt-16 w-full max-w-sm"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.14 },
                },
              }}
            >
              {navItemsWithIcons.map((item) => (
                <MobileNavItem key={item.href} item={item} onClick={close} />
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
