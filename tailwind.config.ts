import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-mplus)'],
        mono: ['var(--font-jetbrains)'],
      },
    },
  },
  plugins: [],
} satisfies Config
