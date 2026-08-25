/** @type {import('tailwind').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Monochrome palette — calm, paper-like neutrals
        cream: '#FAFAF9',
        paper: '#FFFFFF',
        surface: '#FFFFFF',
        ink: '#141414',
        'ink-soft': '#3F3F3F',
        muted: '#8A8A8A',
        line: '#EBEBEA',
        'line-strong': '#D4D4D4',
        accent: '#525252',
        'accent-dark': '#262626',
        'accent-tint': '#F0F0EF',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        wideish: '0.08em',
        widest: '0.16em',
      },
      maxWidth: {
        shell: '1360px',
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        lg: '14px',
        xl: '20px',
      },
      boxShadow: {
        // Softer, quieter shadows for a relaxed feel
        drawer: '-24px 0 48px -24px rgba(20,20,20,0.12)',
        card: '0 1px 2px rgba(20,20,20,0.03), 0 4px 16px -8px rgba(20,20,20,0.06)',
        'card-hover': '0 2px 4px rgba(20,20,20,0.04), 0 12px 28px -12px rgba(20,20,20,0.10)',
        header: '0 1px 0 rgba(20,20,20,0.05), 0 8px 24px -18px rgba(20,20,20,0.18)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
