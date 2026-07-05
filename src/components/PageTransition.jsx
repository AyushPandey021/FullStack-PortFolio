import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }) {
  const location = useLocation()
  
  // Enhanced transition with smoother easing and better visuals
  const transitionProps = {
    initial: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(20px)',
      scale: 0.98
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      scale: 1
    },
    exit: { 
      opacity: 0, 
      y: -20,
      filter: 'blur(20px)',
      scale: 0.98
    }
  }
  
  return (
    <motion.main
      key={location.pathname}
      initial={transitionProps.initial}
      animate={transitionProps.animate}
      exit={transitionProps.exit}
      transition={{ 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1]
      }}
      className="min-h-screen w-full origin-center relative overflow-hidden"
    >
      {children}
    </motion.main>
  )
}
