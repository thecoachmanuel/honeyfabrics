import Header from '@components/Header'
import Footer from '@components/Footer'
import { prisma } from '@lib/db'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function About() {
  let settings = null
  try {
    settings = await prisma.siteSetting.findFirst()
  } catch (error) {
    console.error('Error loading about settings:', error)
  }
  return (
    <div>
      <Header name={settings?.businessName} logoUrl={settings?.logoUrl ?? undefined} />
      <section className="container py-8 md:py-12">
        <div className="relative rounded-2xl overflow-hidden h-48 md:h-64 flex flex-col items-center justify-center text-center mb-8">
          <Image
            src="https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg"
            alt="About Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-white p-4">
            <h1 className="text-3xl md:text-5xl font-display font-bold">About Us</h1>
            <p className="mt-2 text-white/90 text-lg">Our passion for fashion and elegance.</p>
          </div>
        </div>
        <p className="text-cocoa/80 max-w-3xl leading-relaxed mx-auto">
          At {settings?.businessName ?? 'Luxe Fabrics & Fashion'}, we&apos;ve spent the past {settings?.yearsExperience ?? 10} years
          redefining style in Lagos with our premium collection of fabrics, shoes, bags, and jewelry. Our mission is to
          empower you to express yourself through high-quality fashion. We believe in elegance, distinction, and making every outfit a statement.
          Whether it&apos;s for a special occasion or everyday glamour, we&apos;re here to provide the finest accessories and textiles. Thanks for choosing us!
        </p>
        <div className="mt-8 p-6 rounded-2xl bg-cream mx-auto max-w-3xl">
          <p className="font-medium text-cocoa text-center">“{settings?.tagline ?? 'Exquisite Fabrics, Shoes & Accessories'}”</p>
        </div>
      </section>
      <Footer />
    </div>
  )
}
