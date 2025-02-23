import type { Config } from 'tailwindcss'

export default {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        MPlusRounded1c: ['var(--font-MPlusRounded1c)'],
      },
    },
  },
  plugins: [],
} satisfies Config
