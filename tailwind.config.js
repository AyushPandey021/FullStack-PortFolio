/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111827',
        muted: '#6B7280',
        paper: '#FAFAFA',
        soft: '#F5F5F7',
        ember: '#FF6A00',
        night: '#09090B',
        panel: '#18181B',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
        display: ['Satoshi', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 24px 80px rgba(17, 24, 39, 0.12)',
        glow: '0 0 48px rgba(255, 106, 0, 0.28)',
      },
      backgroundImage: {
        grid:
          'linear-gradient(to right, rgba(107,114,128,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(107,114,128,0.12) 1px, transparent 1px)',
        scan:
          'linear-gradient(120deg, transparent, rgba(255,106,0,0.16), transparent)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.35)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        float: 'float 6s ease-in-out infinite',
        pulseRing: 'pulseRing 1.8s ease-out infinite',
      },
    },
  },
  plugins: [],
}
