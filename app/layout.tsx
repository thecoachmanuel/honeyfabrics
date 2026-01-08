import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@components/CartProvider'
import { AuthProvider } from '@components/AuthProvider'
import { cookies } from 'next/headers'
import FloatingWhatsApp from '@components/FloatingWhatsApp'
import AINavigator from '@components/AINavigator'
import { Playfair_Display, Lato } from 'next/font/google'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Honey Fabrics — Exquisite Fabrics, Shoes & Accessories',
  description: 'Discover premium fabrics, stylish shoes, elegant bags, and timeless jewelry at Honey Fabrics. Shop online for quality and style.',
  keywords: ['fabrics', 'textiles', 'fashion', 'shoes', 'bags', 'jewelry', 'Lagos', 'online store'],
  openGraph: {
    title: 'Honey Fabrics',
    description: 'Elevate your style with our premium collection of fabrics and accessories.',
    url: 'https://honeyfabrics.com',
    type: 'website'
  },
  metadataBase: new URL('http://localhost:3000'),
  icons: {
    icon: '/logo.png',
  }
}

import { prisma } from '@lib/db'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = cookies().get('user_session')
  const isLoggedIn = !!session?.value
  let isAdmin = false

  if (isLoggedIn && session?.value) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(session.value) },
        select: { role: true }
      })
      if (user?.role === 'ADMIN') {
        isAdmin = true
      }
    } catch (error) {
      console.error('Error fetching user role:', error)
    }
  }

  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-body text-primary bg-background">
        <AuthProvider isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
          <CartProvider>
            {children}
            <FloatingWhatsApp />
            <AINavigator />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
