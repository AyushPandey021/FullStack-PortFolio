import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { TransitionProvider } from "./context/TransitionContext.jsx";
import { useLenis } from "./hooks/useLenis.js";
import { useRevealAnimations } from "./hooks/useRevealAnimations.js";
import Navbar from "./components/Navbar.jsx";
import Loader from "./components/Loader.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import FloatingAssistant from "./components/FloatingAssistant.jsx";
import PageTransition from "./components/PageTransition.jsx";
import Home from "./pages/Home.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import SkillsPage from "./pages/SkillsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ResumePage from "./pages/ResumePage.jsx";

export default function App() {
  const location = useLocation();
  useLenis();
  useRevealAnimations(location.pathname);

  return (
    <ThemeProvider>
      <TransitionProvider>
        <RoutesContent location={location} />
      </TransitionProvider>
    </ThemeProvider>
  );
}

function RoutesContent({ location }) {
  return (
    <>
      {/* Global Background - Always persists during transitions */}
      <div className="fixed inset-0 -z-50 bg-gradient-to-br from-[#fafafa] via-[#fafafa] to-[#f4f4f5] dark:bg-gradient-to-br dark:from-[#0a0f2c] dark:via-[#0a0f2c] dark:to-[#1a1f3a] transition-colors duration-500"></div>
      
      {/* Theme Background - Always persists */}
      <div className="fixed inset-0 -z-40 bg-[var(--bg-primary)] transition-colors duration-500"></div>
      
      <Loader />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <CommandPalette />
      <FloatingAssistant />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/projects"
            element={
              <PageTransition>
                <ProjectsPage />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <ContactPage />
              </PageTransition>
            }
          />
          <Route
            path="/skills"
            element={
              <PageTransition>
                <SkillsPage />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition>
                <AboutPage />
              </PageTransition>
            }
          />
          <Route
            path="/resume"
            element={
              <PageTransition>
                <ResumePage />
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}
