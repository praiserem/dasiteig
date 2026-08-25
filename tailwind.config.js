/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F1E7',
        paper: '#FBF9F4',
        surface: '#FFFFFF',
        ink: '#1C1A16',
        'ink-soft': '#3A362E',
        muted: '#83786A',
        line: '#E3DCC9',
        'line-strong': '#CFC5AC',
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
        shell: '1400px',
      },
      boxShadow: {
        none: 'none',
        drawer: '-24px 0 48px -24px rgba(28,26,22,0.18)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
