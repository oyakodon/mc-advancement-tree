import { M_PLUS_Rounded_1c } from 'next/font/google'

import { ThemeProvider } from '@/components/theme/theme-provider'

import './globals.css'

const mplus = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mplus',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={`${mplus.variable} font-sans`}>
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
