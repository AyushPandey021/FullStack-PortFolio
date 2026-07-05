import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const TransitionContext = createContext(null)

export function TransitionProvider({ children }) {
  const [direction, setDirection] = useState('forward')
  const [transitionKey, setTransitionKey] = useState(0)
  const location = useLocation()
  const navigationType = useNavigationType()
  const previousPathRef = useRef('/')

  useEffect(() => {
    const paths = ['/', '/skills', '/contact', '/projects', '/about']
    const previousPath = previousPathRef.current
    const newPath = location.pathname
    const currentIndex = paths.indexOf(previousPath)
    const newIndex = paths.indexOf(newPath)
    
    // Determine direction based on navigation
    if (navigationType === 'PUSH') {
      // Circular navigation: if going from last to first, it's forward
      if (currentIndex === paths.length - 1 && newIndex === 0) {
        setDirection('forward')
      } else if (currentIndex >= 0 && newIndex > currentIndex) {
        setDirection('forward')
      } else if (currentIndex >= 0 && newIndex < currentIndex) {
        setDirection('backward')
      } else {
        // Default to forward for unknown paths
        setDirection('forward')
      }
    } else if (navigationType === 'POP') {
      setDirection('backward')
    } else {
      // For REPLACE and initial load
      setDirection('forward')
    }
    
    // Only increment transition key when path actually changes
    if (previousPath !== newPath) {
      setTransitionKey(prev => prev + 1)
      previousPathRef.current = newPath
    }
  }, [location.pathname, navigationType])

  const getTransitionProps = () => {
    const transitions = {
      forward: {
        initial: { 
          opacity: 0, 
          x: 25,
          filter: 'blur(15px)',
          position: 'absolute',
          width: '100%',
          zIndex: 0
        },
        animate: { 
          opacity: 1, 
          x: 0, 
          filter: 'blur(0px)',
          position: 'relative',
          width: '100%',
          zIndex: 1
        },
        exit: { 
          opacity: 0, 
          x: -25, 
          filter: 'blur(15px)',
          position: 'absolute',
          width: '100%',
          zIndex: 0
        }
      },
      backward: {
        initial: { 
          opacity: 0, 
          x: -25,
          filter: 'blur(15px)',
          position: 'absolute',
          width: '100%',
          zIndex: 0
        },
        animate: { 
          opacity: 1, 
          x: 0, 
          filter: 'blur(0px)',
          position: 'relative',
          width: '100%',
          zIndex: 1
        },
        exit: { 
          opacity: 0, 
          x: 25, 
          filter: 'blur(15px)',
          position: 'absolute',
          width: '100%',
          zIndex: 0
        }
      }
    }
    
    return transitions[direction] || transitions.forward
  }

  return (
    <TransitionContext.Provider value={{ direction, getTransitionProps, transitionKey }}>
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransition() {
  const context = useContext(TransitionContext)
  if (!context) throw new Error('useTransition must be used within TransitionProvider')
  return context
}
