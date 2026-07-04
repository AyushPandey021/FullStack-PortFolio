import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { useLenis } from "./hooks/useLenis.js";
import { useRevealAnimations } from "./hooks/useRevealAnimations.js";
import Navbar from "./components/Navbar.jsx";
import Loader from "./components/Loader.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import FloatingAssistant from "./components/FloatingAssistant.jsx";
import Home from "./pages/Home.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import SkillsPage from "./pages/SkillsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

function PageShell({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -16, filter: "blur(10px)" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

export default function App() {
  const location = useLocation();
  useLenis();
  useRevealAnimations(location.pathname);

  return (
    <ThemeProvider>
      <Loader />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <CommandPalette />
      <FloatingAssistant />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageShell>
                <Home />
              </PageShell>
            }
          />
          <Route
            path="/projects"
            element={
              <PageShell>
                <ProjectsPage />
              </PageShell>
            }
          />
          <Route
            path="/contact"
            element={
              <PageShell>
                <ContactPage />
              </PageShell>
            }
          />
          <Route
            path="/skills"
            element={
              <PageShell>
                <SkillsPage />
              </PageShell>
            }
          />
          <Route
            path="/about"
            element={
              <PageShell>
                <AboutPage />
              </PageShell>
            }
          />
          <Route
            path="*"
            element={
              <PageShell>
                <Home />
              </PageShell>
            }
          />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}
