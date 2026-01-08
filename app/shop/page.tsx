import Header from '@components/Header'
import Footer from '@components/Footer'
import ShopGrid from '@components/ShopGrid'
import { prisma } from '@lib/db'
import Image from 'next/image'
import { Suspense } from 'react'

export default async function Shop() {
  const settings = await prisma.siteSetting.findFirst()
  const categories = await prisma.category.findMany({ include: { items: { where: { active: true } } } })
  return (
    <div>
      <Header name={settings?.businessName} logoUrl={settings?.logoUrl ?? undefined} />
      <section className="container py-8 md:py-12">
        <div className="relative rounded-2xl overflow-hidden h-48 md:h-64 flex flex-col items-center justify-center text-center">
          <Image
            src="https://images.pexels.com/photos/3756038/pexels-photo-3756038.jpeg"
            alt="Shop Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 text-white p-4">
            <h1 className="text-3xl md:text-5xl font-display font-bold">Shop</h1>
            <p className="mt-2 text-white/90 text-lg">Discover our premium collection of fabrics and accessories.</p>
          </div>
        </div>
        <Suspense fallback={<div className="text-center py-20">Loading shop...</div>}>
          <ShopGrid categories={categories} />
        </Suspense>
      </section>
      <Footer />
    </div>
  )
}
