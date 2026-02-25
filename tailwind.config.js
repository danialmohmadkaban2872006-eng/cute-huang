/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          bg: '#0B0B19',
          purple: '#1A0A2E',
          violet: '#2D1B69',
          rose: '#E7C1B1',
          roseDeep: '#C9967A',
          stardust: '#F5F0FF',
          neon: '#B980FF',
          gold: '#FFD700',
          nebula: '#6B21A8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'orbit': 'orbit 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(var(--orbit-radius)) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(var(--orbit-radius)) rotate(-360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px #B980FF, 0 0 20px #B980FF' },
          '50%': { boxShadow: '0 0 20px #B980FF, 0 0 40px #B980FF, 0 0 60px #B980FF' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.2 },
        }
      }
    },
  },
  plugins: [],
}
