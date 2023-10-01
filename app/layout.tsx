import Navbar from '@/app/components/navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { cn } from '@/lib/utils'
import Modal from '@/app/components/modals/Modal'
import RegisterModal from '@/app/components/modals/RegisterModal'
import WelcomeModal from '@/app/components/modals/WelcomeModal'
import { ConfettiProvider } from '@/app/providers/ConfettiProvider'
import SuccessModal from '@/app/components/modals/SuccessModal'
import LoginModal from './components/modals/LoginModal'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'
import EmailModal from './components/modals/EmailModal'

const font = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Univibe',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={cn(
          font.className,
          "bg-white dark:bg-neutral-900"
      )}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem = {false}
          storageKey='univibe-key'
          
        >
          <ToasterProvider />
          <ConfettiProvider />
          <Navbar currentUser = {currentUser} />
          <EmailModal/>
          <WelcomeModal/>
          <SuccessModal/>
          <LoginModal/>
          <RegisterModal />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
