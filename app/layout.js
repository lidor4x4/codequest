
import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
require('dotenv').config();

dotenv.config()

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CodeQuest',
  description: 'CodeQuest is a platform for developers to find partners to work on projects with.',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
          <body className={inter.className}>{children}</body>

      </html>
    </ClerkProvider>
  )

}
