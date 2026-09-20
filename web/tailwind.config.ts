import type { Config } from 'tailwindcss'

/**
 * Design tokens — "Il Banco del Colore" (see DESIGN.md).
 * Palette is fixed by the brand and binding. Sage carries whole regions,
 * magenta is the single high-voltage voice, limewash is the luminous ground.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Token semantici (chiaro/scuro) guidati da variabili CSS in index.css.
        // ground = fondo pagina · raised = superfici/schede · sunken = pannelli
        // tinteggiati salvia · ink = testo · band = fasce scure di contrasto ·
        // sageInk = salvia leggibile su sunken/superfici in entrambi i temi.
        ground: 'rgb(var(--ground) / <alpha-value>)',
        raised: 'rgb(var(--raised) / <alpha-value>)',
        sunken: 'rgb(var(--sunken) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        band: 'rgb(var(--band) / <alpha-value>)',
        sageInk: 'rgb(var(--sage-ink) / <alpha-value>)',
        sage: {
          DEFAULT: '#9CAF88',
          50: '#F1F4EC',
          100: '#E2E9D8',
          200: '#CBD8B9',
          300: '#B4C79E',
          400: '#9CAF88',
          500: '#889C73',
          600: '#6F8159',
          700: '#586747',
          800: '#414C35',
          900: '#2E3626',
        },
        magenta: {
          DEFAULT: '#E6007E',
          soft: '#F04D9F',
          deep: '#B80065',
        },
        graphite: {
          DEFAULT: '#333333',
          soft: '#4A4A48',
          faint: '#6B6B67',
        },
        marble: '#E5E5E5',
        limewash: '#F9F9F6',
        pure: '#FFFFFF',
      },
      fontFamily: {
        sans: ['"Archivo Variable"', 'Archivo', 'system-ui', 'sans-serif'],
        mono: ['"Martian Mono Variable"', '"Martian Mono"', 'ui-monospace', 'monospace'],
        script: ['"Great Vibes"', 'cursive'],
        // Solo per la parola "Technology" del logotipo: display sottile con
        // proporzioni romane, il più vicino al lettering del logo originale.
        logotype: ['Italiana', 'Optima', 'Palatino', 'serif'],
      },
      letterSpacing: {
        notation: '0.14em',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        bench: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
      },
      keyframes: {
        'drift-x': {
          '0%,100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-2%)' },
        },
      },
      animation: {
        'drift-x': 'drift-x 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
