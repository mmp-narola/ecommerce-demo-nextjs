import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/Components/Navbar'
import ToastProvider from '@/Helpers/ToastContainer'
import SessionProviders from '@/Helpers/SessionProvider'
import { Providers } from '@/ReduxStore/providers'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'E-Commerce App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <SessionProviders>
          <body className={inter.className}>
            <ToastProvider>
              <Navbar />
              {children}
            </ToastProvider>
          </body>
        </SessionProviders>
      </Providers>
    </html>
  )
}