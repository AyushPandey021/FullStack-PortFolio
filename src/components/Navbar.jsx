import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import {
  HiArrowDownTray,
  HiBars3,
  HiMoon,
  HiSun,
  HiXMark,
  HiHome,
  HiUser,
  HiCodeBracket,
  HiBriefcase,
  HiEnvelope
} from 'react-icons/hi2';

const navItems = [
  { label: 'Home', href: '/', icon: HiHome },
  { label: 'About', href: '/about', icon: HiUser },
  { label: 'Skills', href: '/skills', icon: HiCodeBracket },
  { label: 'Projects', href: '/projects', icon: HiBriefcase },
  { label: 'Contact', href: '/contact', icon: HiEnvelope },
];

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
      className="grid size-11 place-items-center rounded-lg border border-dashed border-purple-500/30 bg-purple-500/10 text-purple-400 backdrop-blur-xl transition-transform duration-200 ease-out hover:bg-purple-500/20"
      style={style}
      onMouseMove={move}
      onMouseLeave={() => setStyle({ transform: 'translate(0,0)' })}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </button>
  );
}

function ResumeLink() {
  const [style, setStyle] = useState({});

  const move = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (event.clientY - (rect.top + rect.height / 2)) * 0.3;
    setStyle({ transform: `translate(${x}px, ${y}px)` });
  };

  return (
    <a
      href="/resume.pdf"
      download
      style={style}
      onMouseMove={move}
      onMouseLeave={() => setStyle({ transform: 'translate(0,0)' })}
      className="hidden items-center gap-2 rounded-lg border border-dashed border-purple-500/30 px-4 py-2.5 text-sm font-semibold text-purple-400 transition-transform duration-200 ease-out hover:bg-purple-500/10 xl:inline-flex"
    >
      <HiArrowDownTray />
      Resume
    </a>
  );
}

function NavItem({ item, isActive, onClick }) {
  const Icon = item.icon;
  
  return (
    <Link
      to={item.href}
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
        isActive 
          ? 'bg-purple-500/20 text-white border border-purple-500/40' 
          : 'text-gray-300 hover:bg-purple-500/10 hover:text-white'
      }`}
    >
      <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-gray-400'}`} />
      <span>{item.label}</span>
    </Link>
  );
}

function MobileNavItem({ item, onClick }) {
  const Icon = item.icon;
  
  return (
    <motion.a
      href={item.href}
      onClick={onClick}
      className="flex items-center justify-center gap-4 text-2xl font-bold text-white"
      whileHover={{ scale: 1.02, x: 10 }}
      whileTap={{ scale: 0.98 }}
      style={{ fontFamily: 'var(--font-display)' }}
    >
      <Icon className="w-6 h-6 text-purple-400" />
      {item.label}
    </motion.a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
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
        className={`fixed left-1/2 top-4 z-[90] flex w-[min(1200px,calc(100%-40px))] -translate-x-1/2 items-center justify-between gap-4 rounded-xl px-6 py-4 transition-all duration-300 ${
          scrolled
            ? 'min-h-[60px] border border-purple-500/15 bg-[#0a0f2c]/90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(10,15,44,0.3)]'
            : 'min-h-[68px] border border-transparent bg-[#0a0f2c]/80'
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="Ayush Pandey home"
        >
          <motion.div
            className="grid size-11 place-items-center rounded-lg border border-dashed border-purple-500/40 bg-gradient-to-br from-purple-500 to-cyan-500 text-white font-bold text-lg"
            style={{ fontFamily: 'var(--font-mono)' }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            AP
          </motion.div>
          <strong
            className="hidden text-white sm:block text-lg"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ayush Pandey
          </strong>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              isActive={activeSection === item.href}
              onClick={() => {}}
            />
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <MagneticIcon onClick={toggleTheme} label="Toggle color theme">
            {theme === 'dark' ? <HiSun /> : <HiMoon />}
          </MagneticIcon>
          <ResumeLink />
          <MagneticIcon onClick={() => setOpen(true)} label="Open menu">
            <span className="lg:hidden">
              <HiBars3 />
            </span>
          </MagneticIcon>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[120] grid place-items-center bg-[#0a0f2c]/98 text-white"
            initial={{ clipPath: 'circle(0% at 92% 7%)' }}
            animate={{ clipPath: 'circle(145% at 92% 7%)' }}
            exit={{ clipPath: 'circle(0% at 92% 7%)' }}
            transition={{ duration: 0.65, ease: [0.83, 0, 0.17, 1] }}
          >
            <button
              className="absolute right-6 top-6 grid size-11 place-items-center rounded-lg border border-dashed border-purple-500/30 bg-white/5"
              onClick={close}
              aria-label="Close menu"
            >
              <HiXMark />
            </button>
            
            <motion.nav
              className="grid gap-4 text-center"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.14 },
                },
              }}
            >
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.href}
                  item={item}
                  onClick={close}
                />
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}