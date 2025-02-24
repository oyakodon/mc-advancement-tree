import type { Preview } from '@storybook/react'
import { M_PLUS_Rounded_1c } from 'next/font/google'
import React from 'react'

import { ThemeProvider } from '@/components/theme/theme-provider'

import '../src/app/globals.css'

export const MPlusRounded1c = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-MPlusRounded1c',
  display: 'swap',
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <div className={`${MPlusRounded1c.variable} --font-MPlusRounded1c font-sans`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Story />
        </ThemeProvider>
      </div>
    ),
  ],

  tags: ['autodocs', 'autodocs', 'autodocs'],
}

export default preview
