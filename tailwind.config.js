import { type Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#070708',
        'bg-secondary': '#0b0b0e',
        'nav-bg': '#0b0b0e',
        surface: '#101014',
        elevated: '#15151a',
        modal: '#1a1a20',
        border: 'rgba(255,255,255,0.07)',
        'border-strong': 'rgba(255,255,255,0.12)',
        text: '#e6e6ec',
        'text-secondary': '#9ca0a7',
        'text-tertiary': '#6a6f76',
        accent: '#0ea5e9',
        'accent-hover': '#38bdf8',
        'accent-soft': '#0ea5e920',
        violet: '#8b5cf6',
        'violet-hover': '#a78bfa',
        success: '#22c58e',
        warning: '#f59e0b',
        error: '#ef4444',
        'error-soft': '#ef444420',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.03em',
        tightest: '-0.05em',
        wideish: '0.06em',
        widest: '0.14em',
      },
      maxWidth: {
        shell: '1400px',
      },
      boxShadow: {
        none: 'none',
        'elevated': '0 4px 24px 0 rgba(0,0,0,0.3)',
        'modal': '0 24px 64px 0 rgba(0,0,0,0.5)',
        'drawer': '0 0 48px 0 rgba(0,0,0,0.3)',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'fast': 'cubic-bezier(0.3, 0, 0.2, 1)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
