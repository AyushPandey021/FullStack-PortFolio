import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion', 'gsap', 'split-type', 'lenis'],
          three: ['three'],
          vendor: ['react-icons', 'react-countup', '@emailjs/browser', 'lottie-react'],
        },
      },
    },
  },
})
