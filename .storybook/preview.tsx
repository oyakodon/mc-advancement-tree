import type { Preview } from '@storybook/react'
import { JetBrains_Mono, M_PLUS_Rounded_1c } from 'next/font/google'
import React from 'react'

import { ThemeProvider } from '@/components/theme/theme-provider'

import '../src/app/globals.css'

const mplus = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mplus',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains',
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
      <div className={`${mplus.variable} ${jetbrains.variable} font-sans`}>
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
