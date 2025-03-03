import { M_PLUS_Rounded_1c } from 'next/font/google'

import { ThemeProvider } from '@/components/theme/theme-provider'

import './globals.css'

export const MPlusRounded1c = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-MPlusRounded1c',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={`${MPlusRounded1c.variable} --font-MPlusRounded1c font-sans`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
