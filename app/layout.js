import { Inter } from 'next/font/google'
import { AuthProvider } from './context/AuthContext'
import { UserTokenProvider } from './context/UserTokenContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='h-full bg-gray-100'>
        <AuthProvider>
          <UserTokenProvider>
              {children}
          </UserTokenProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
