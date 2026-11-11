import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import { initializeColorMode } from './color-mode'

// One font for the whole website — consistent across headings, body, and labels.
const sans = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Abdallah Zeine | AI Engineer',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="Claude"
      className={sans.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: initializeColorMode }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
