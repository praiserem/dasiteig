/** @type {import('tailwind').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F4EC',
        paper: '#FCFAF5',
        surface: '#FFFFFF',
        ink: '#1C1A16',
        'ink-soft': '#3A362E',
        muted: '#83786A',
        line: '#E8E1D1',
        'line-strong': '#D6CDB6',
        accent: '#D8552A',
        'accent-dark': '#B5451F',
        'accent-tint': '#FBE4D6',
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
        drawer: '-24px 0 48px -24px rgba(28,26,22,0.18)',
        card: '0 1px 2px rgba(28,26,22,0.04), 0 4px 16px -6px rgba(28,26,22,0.08)',
        'card-hover': '0 2px 4px rgba(28,26,22,0.05), 0 12px 28px -10px rgba(28,26,22,0.14)',
        header: '0 1px 0 rgba(28,26,22,0.06), 0 8px 24px -18px rgba(28,26,22,0.25)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
